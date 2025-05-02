"use client";
import ArrowButton from "@/components/arrow-button";
import JoinButton from "@/components/join-button";
import NavigationBar from "@/components/navigation-bar";
import { Button } from "@/components/ui/button";
import KeyFeatures from "@/components/keyfeatures";
import {
  Sparkles,
  Activity,
  FolderKey,
  BarChart3,
  Video,
  Medal,
  Timer,
} from "lucide-react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa"; // Social Icons

export default function Homepage() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-black text-white">
        <div className="text-3xl font-bold">SCAD</div>
        <NavigationBar></NavigationBar>
      </header>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] py-50 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to SCAD Internships Portal
        </h1>
        <p className="text-xl mb-8">
          Your one-stop platform for seamless connectivity and opportunities.
        </p>

        <div className="flex justify-center items-center gap-4">
          <JoinButton />
          <ArrowButton />
        </div>
      </section>
      {/* Key Features Section */}

      <section id="features" className="py-16 bg-white text-center">
        <KeyFeatures />
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
          <p>&copy; 2025 SCAD. All Rights Reserved.</p>
          <div className="space-x-6 mt-4">
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
