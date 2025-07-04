
import React, { useState, useCallback } from 'react';
import { InputMode } from './types';
import { PROMPT_TAGS } from './constants';
import { generateImageFromPrompt, generateImageFromUpload } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import PromptInput from './components/PromptInput';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';

const App: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.TEXT);
  const [prompt, setPrompt] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<{ file: File; base64: string; mimeType: string; } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let imageB64: string | null = null;
      if (inputMode === InputMode.TEXT) {
        if (!prompt.trim()) {
          setError('Please enter a prompt.');
          return;
        }
        imageB64 = await generateImageFromPrompt(prompt);
      } else {
        if (!uploadedImage) {
          setError('Please upload an image.');
          return;
        }
        imageB64 = await generateImageFromUpload(uploadedImage.base64, uploadedImage.mimeType, prompt);
      }

      if (imageB64) {
        setGeneratedImage(`data:image/jpeg;base64,${imageB64}`);
      } else {
        throw new Error('Image generation failed to produce an image.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, inputMode, prompt, uploadedImage]);
  
  const handleAddTag = (tagValue: string) => {
    setPrompt(prev => prev ? `${prev}, ${tagValue}` : tagValue);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Controls */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <div className="flex border-b border-gray-600 mb-4">
              <button
                onClick={() => setInputMode(InputMode.TEXT)}
                className={`flex-1 py-2 text-center text-lg font-medium transition-colors duration-200 ${inputMode === InputMode.TEXT ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                Text Prompt
              </button>
              <button
                onClick={() => setInputMode(InputMode.IMAGE)}
                className={`flex-1 py-2 text-center text-lg font-medium transition-colors duration-200 ${inputMode === InputMode.IMAGE ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                Image Style
              </button>
            </div>
            
            {inputMode === InputMode.TEXT ? (
              <PromptInput prompt={prompt} setPrompt={setPrompt} />
            ) : (
              <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} prompt={prompt} setPrompt={setPrompt} />
            )}

            <div className="mt-4">
              <h3 className="font-semibold mb-2 text-gray-300">Style Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {PROMPT_TAGS.map(tag => (
                   <button key={tag.label} onClick={() => handleAddTag(tag.value)} className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium py-1 px-3 rounded-full transition-colors duration-200">
                     {tag.label}
                   </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-bold text-xl py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Generating...' : 'Manga-fy!'}
          </button>

          {error && <div className="bg-red-900 border border-red-700 text-red-200 p-3 rounded-lg text-center">{error}</div>}
        </div>

        {/* Right Column: Display */}
        <div className="lg:w-2/3">
          <ImageDisplay generatedImage={generatedImage} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
