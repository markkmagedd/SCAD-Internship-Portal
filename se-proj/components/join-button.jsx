import React from "react";

function JoinButton() {
  return (
    <div>
      <button class="group relative inline-flex px-6 py-2.5 items-center justify-center overflow-hidden rounded-md bg-black  text-white font-bold cursor-pointer transition hover:scale-110">
        <span>Join now</span>
        <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div class="relative h-full w-8 bg-white/20"></div>
        </div>
      </button>
    </div>
  );
}

export default JoinButton;
