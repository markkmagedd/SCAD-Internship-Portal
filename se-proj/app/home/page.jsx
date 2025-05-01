"use client";

import NavigationBar from "@/components/navigation-bar";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa"; // Social Icons

export default function Homepage() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black text-white">
        <div className="text-3xl font-bold">YourLogo</div>
        <NavigationBar></NavigationBar>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] py-20 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to [Your Platform Name]
        </h1>
        <p className="text-xl mb-8">
          Your one-stop platform for seamless connectivity and opportunities.
        </p>
        <Button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800">
          Get Started
        </Button>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 px-6 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-300 rounded-lg">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Simple Sign-Up</h3>
            <p>Quick and easy sign-up process for a smooth start.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Secure and Safe</h3>
            <p>Your data is encrypted and securely stored.</p>
          </div>
          <div className="p-6 border border-gray-300 rounded-lg">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Connectivity</h3>
            <p>Connect with people and resources instantly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-8">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg italic mb-4">
            "I've found amazing opportunities on this platform. It's
            user-friendly and fast!"
          </p>
          <p className="font-semibold">John D.</p>
        </div>
        <div className="mt-6 text-lg font-semibold">
          <p>Over 10,000 happy users</p>
        </div>
        <div className="flex justify-center mt-6 space-x-6">
          <div className="text-blue-600">Facebook</div>
          <div className="text-red-600">Google</div>
          <div className="text-gray-700">GitHub</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="text-center">
          <p>&copy; 2025 YourCompany. All Rights Reserved.</p>
          <div className="space-x-6">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="/about-us" className="hover:underline">
              About Us
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
