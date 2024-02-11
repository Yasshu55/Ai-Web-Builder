import React from 'react';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-[#dbf4ff] to-[#fff1f1] min-h-screen flex flex-col justify-between">
      <header className="bg-white border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/" className="font-bold text-2xl">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF' }}>AI Web Builder</h1>
              </a>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button
                onClick={() => router.push('/myprofile')}
                style={{ backgroundColor: '#1E40AF', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', border: 'none' }}
              >
                <a href="/login" style={{ color: 'white' }}>Login</a>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8">
          <div
            style={{
              backgroundImage: "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
              color: "transparent",
            }}
          >
            Build Websites with AI
          </div>
          <div
            style={{
              backgroundImage: "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
              backgroundClip: "text",
              "-webkit-background-clip": "text",
              color: "transparent",
            }}
          >
            in &lt; 1min
          </div>
        </h1>
        <button
          onClick={() => router.push('/signup')}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          Start generating now.
        </button>
      </main>

      <footer className="bg-white border-t border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center flex-wrap">
          <p className="text-gray-400 text-sm mr-4">&copy; 2024 Yashwanth Sai Ch</p>
          <a href="https://github.com/Yasshu55" className="mr-4"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/github.png" alt="github"/></a>
          <a href="https://www.linkedin.com/in/yasshu/" className="mr-4"><img width="24" height="24" src="https://img.icons8.com/ios-filled/50/linkedin.png" alt="linkedin"/></a>
          <a href="https://twitter.com/Yasshu55"><img width="24" height="24" src="https://img.icons8.com/ios/50/x.png" alt="x"/></a>
        </div>
      </footer>

    </div>
  );
}

export default Index;
