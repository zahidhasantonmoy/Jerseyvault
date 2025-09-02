"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-7xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            404
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </div>
          <div className="text-gray-300 mb-8 text-lg max-w-md mx-auto">
            Sorry, the page you are looking for does not exist.
          </div>
          <a 
            href="/" 
            className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}