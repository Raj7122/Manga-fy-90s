
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 text-center">
        <h1 className="font-display text-5xl text-cyan-400">
          Manga-fy '90s
        </h1>
        <p className="text-gray-400 text-sm mt-1">Your ideas, drawn in the golden age of manga.</p>
      </div>
    </header>
  );
};

export default Header;
