import React from 'react';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <header className="bg-white border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="font-bold text-2xl">
                Ai-Web Builder
              </a>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8">
          Build Websites with AI<br />
          in &lt; 1min
        </h1>
        {/* <button
          onClick={() => router.push('/login')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Login
        </button> */}
        <button
          onClick={() => router.push('/signup')}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Start generating now.
        </button>
      </main>

      <footer className="bg-white border-t border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            powered by Yash
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
