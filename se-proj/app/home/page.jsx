"use client";
import Image from "next/legacy/image";
import ArrowButton from "@/components/arrow-button";
import JoinButton from "@/components/join-button";
import NavigationBar from "@/components/navigation-bar";
import { Button } from "@/components/ui/button";
import KeyFeatures from "@/components/key-features";
import logo from "@/public/images/scad.png";
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
import ReviewsCarousel from "@/components/reviews-carousel";

export default function Homepage() {
  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white text-white mt-0 mb-0">
        <div className="flex items-center ">
          <Image
            src={logo} // put your logo in public/images/
            alt="GUC x SCAD logo"
            width={220} // tweak to fit
            height={50}
            priority
          />
        </div>
        <NavigationBar></NavigationBar>
      </header>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] py-70 text-center text-white shadow-2xl">
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

      <KeyFeatures />

      {/* Testimonials / Social Proof Section */}
      <ReviewsCarousel />
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
