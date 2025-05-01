"use client";

import { Button } from "@/components/ui/button";
import { Link } from "next/link";

export default function NavigationBar() {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white">
      {/* Logo Section */}
      <div className="text-3xl font-bold">
        <Link href="/" className="text-white hover:text-orange-500">
          YourLogo
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="space-x-6">
        <Link href="#features">
          <Button variant="link" className="text-white hover:text-orange-500">
            Features
          </Button>
        </Link>
        <Link href="#pricing">
          <Button variant="link" className="text-white hover:text-orange-500">
            Pricing
          </Button>
        </Link>
        <Link href="#contact">
          <Button variant="link" className="text-white hover:text-orange-500">
            Contact Us
          </Button>
        </Link>
        <Link href="/login">
          <Button className="text-white bg-gradient-to-tl from-[#EC1024] to-[#FF6F1B] hover:bg-gradient-to-r">
            Login
          </Button>
        </Link>
      </nav>
    </header>
  );
}
