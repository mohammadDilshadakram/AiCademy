"use client"; // must be the very first line

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
          <h1 className="text-2xl font-bold text-indigo-600">AiCademy</h1>
          <div className="space-x-4">
            <a href="#features" className="text-gray-700 hover:text-indigo-600">
              Features
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() =>
                (window.location.href = "https://ai-cademy-sage.vercel.app/dashboard")
              }
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20 bg-gray-50">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to AiCademy</h2>
          <p className="text-lg text-gray-600 mb-6">
            A place to learn on your own
          </p>
          <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() =>
                (window.location.href = "https://ai-cademy-sage.vercel.app/dashboard")
              }
            >
              Dashboard
            </button>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-10">Why Choose Us?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-100 rounded shadow">
                <h4 className="font-bold text-xl mb-2">Tailored Course</h4>
                <p className="text-gray-600">Create course as per your need</p>
              </div>
              <div className="p-6 bg-gray-100 rounded shadow">
                <h4 className="font-bold text-xl mb-2">Modern Design</h4>
                <p className="text-gray-600">Clean and responsive design using Tailwind CSS.</p>
              </div>
              <div className="p-6 bg-gray-100 rounded shadow">
                <h4 className="font-bold text-xl mb-2">Different Features</h4>
                <p className="text-gray-600">Lot of features are available in this website</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
          <p>© 2025 AiCademy. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
