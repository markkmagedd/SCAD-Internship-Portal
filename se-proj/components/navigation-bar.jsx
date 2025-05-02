"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white">
      {/* Logo Section */}
      <div className="text-3xl font-bold">
        <Link href="/" className="text-white hover:text-orange-500">
          Logo
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="space-x-6"></nav>
    </header>
  );
}
