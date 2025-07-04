
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MANGA_STYLE_PROMPT_SUFFIX = `, in the style of 1990s black and white manga, high-contrast, monochrome, detailed ink line art, halftone shading, screentones, dramatic shadows, no color, no text, no speech bubbles.`;

/**
 * Generates a manga-style image from a text prompt.
 * @param userPrompt The user's description.
 * @returns A base64 encoded string of the generated JPEG image.
 */
export const generateImageFromPrompt = async (userPrompt: string): Promise<string> => {
    const finalPrompt = `${userPrompt}${MANGA_STYLE_PROMPT_SUFFIX}`;
    console.log("Final Imagen Prompt:", finalPrompt);

    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: finalPrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });
    
    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("API did not return any images.");
    }

    return response.generatedImages[0].image.imageBytes;
};

/**
 * Generates a manga-style image by first describing an uploaded image, then using that description.
 * @param imageBase64 The base64 encoded string of the user's uploaded image.
 * @param mimeType The MIME type of the uploaded image.
 * @param userPrompt An optional additional prompt from the user.
 * @returns A base64 encoded string of the generated JPEG image.
 */
export const generateImageFromUpload = async (imageBase64: string, mimeType: string, userPrompt: string): Promise<string> => {
    console.log("Generating description from uploaded image...");
    
    const imagePart = {
        inlineData: {
            mimeType: mimeType,
            data: imageBase64,
        },
    };

    const descriptionPrompt = `Describe this image in extreme detail for a manga artist to redraw it. Focus on character poses, expressions, clothing, hairstyle, background elements, and the overall mood. Be very descriptive. ${userPrompt ? `Incorporate this style: ${userPrompt}`: ''}`;

    const descriptionResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: { parts: [imagePart, { text: descriptionPrompt }] },
    });

    const description = descriptionResponse.text;
    if (!description) {
        throw new Error("Could not generate a description from the image.");
    }

    console.log("Generated Description:", description);

    // Now use this description to generate the final image
    return generateImageFromPrompt(description);
};
