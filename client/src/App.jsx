import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      
      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-600 mb-6 drop-shadow-lg">
        Kalai Creative Studio
      </h1>
      
      {/* Caption / Description */}
      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
        Building a dynamic e-commerce and portfolio platform. <br className="hidden md:block" />
        <span className="text-yellow-400 font-semibold mt-2 inline-block animate-pulse">
          🚧 Something awesome is in the works... Stay tuned! 🚀
        </span>
      </p>

    </div>
  );
}

export default App;