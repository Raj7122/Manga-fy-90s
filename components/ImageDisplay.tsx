
import React from 'react';
import Spinner from './Spinner';

interface ImageDisplayProps {
  generatedImage: string | null;
  isLoading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ generatedImage, isLoading }) => {
  return (
    <div className="w-full aspect-square bg-gray-800 border-2 border-gray-700 rounded-lg shadow-inner flex items-center justify-center p-2 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <Spinner />
          <p className="mt-4 text-lg text-gray-300">Drawing your vision...</p>
        </div>
      )}
      {!isLoading && !generatedImage && (
        <div className="text-center text-gray-500 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <h3 className="mt-4 text-xl font-semibold">Your Masterpiece Awaits</h3>
          <p className="mt-1 text-gray-400">Enter a prompt or upload an image and click "Manga-fy!" to begin.</p>
        </div>
      )}
      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated manga-style artwork"
          className="w-full h-full object-contain rounded-md"
        />
      )}
    </div>
  );
};

export default ImageDisplay;
