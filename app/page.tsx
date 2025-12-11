'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IIITNRLogo from '../assets/IIITNR_Logo.png'; // Adjust path if necessary

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const themeBlue = "#0070C0";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call/Network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Navigate to certificate generator with email carried forward
    router.push(`/certificate?email=${encodeURIComponent(formData.email)}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#eef3f8] px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section with Logo */}
        <div className="bg-white pt-8 pb-6 flex flex-col items-center border-b border-gray-100">
          <div className="w-24 h-24 relative mb-4">
            <Image 
              src={IIITNRLogo} 
              alt="IIITNR Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center px-6">
            Certificate Portal
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            IIIT Naya Raipur
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0070C0] focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50"
                placeholder="student@iiitnr.edu.in"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0070C0] focus:border-transparent outline-none transition-all text-gray-900 bg-gray-50"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#0070C0] focus:ring-[#0070C0]" />
                Remember me
              </label>
              <a href="#" className="font-medium text-[#0070C0] hover:text-blue-800 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              style={{ backgroundColor: themeBlue }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Dr. SPM IIIT Naya Raipur. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}