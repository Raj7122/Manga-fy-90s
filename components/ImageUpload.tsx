
import React, { useRef } from 'react';

interface ImageUploadProps {
  uploadedImage: { file: File; base64: string; mimeType: string } | null;
  setUploadedImage: (image: { file: File; base64: string; mimeType: string } | null) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ uploadedImage, setUploadedImage, prompt, setPrompt }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1];
        if (base64) {
          setUploadedImage({ file, base64, mimeType: file.type });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = () => {
    setUploadedImage(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {!uploadedImage ? (
        <button
          onClick={handleButtonClick}
          className="w-full border-2 border-dashed border-gray-600 hover:border-cyan-400 rounded-lg p-8 text-center cursor-pointer transition-colors duration-200"
        >
          <span className="text-gray-400">Click to upload image</span>
          <span className="block text-xs text-gray-500 mt-1">PNG, JPG, WEBP</span>
        </button>
      ) : (
        <div className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900">
          <div className="relative">
            <img src={URL.createObjectURL(uploadedImage.file)} alt="Preview" className="w-full h-auto max-h-48 object-contain rounded" />
            <button onClick={handleRemoveImage} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 leading-none hover:bg-red-500 transition-colors">
              &#x2715;
            </button>
          </div>
          <p className="text-xs text-gray-400 truncate mt-1 px-1">{uploadedImage.file.name}</p>
        </div>
      )}
      <div>
         <label htmlFor="image_prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Optional: Add style guidance
         </label>
         <input
            id="image_prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., more dramatic lighting"
            className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-200"
         />
      </div>
    </div>
  );
};

export default ImageUpload;
