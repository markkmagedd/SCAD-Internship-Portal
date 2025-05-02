import React from "react";
import Link from "next/link"; // remove if not using Next.js

export default function JoinButton() {
  return (
    <Link href="/registration">
      <span
        className="group relative inline-flex items-center justify-center overflow-hidden
                   px-6 py-2.5 rounded-md bg-black text-white font-bold
                   transition-transform hover:scale-110"
      >
        <span>Join&nbsp;now</span>

        {/* moving shine */}
        <div
          className="absolute inset-0 flex h-full w-full justify-center
                     [transform:skew(-12deg)_translateX(-100%)]
                     group-hover:duration-1000
                     group-hover:[transform:skew(-12deg)_translateX(100%)]"
        >
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </span>
    </Link>
  );
}
