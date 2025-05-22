"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-neutral-800 shrink-0 mx-auto data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-80 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px dark:bg-neutral-800",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
