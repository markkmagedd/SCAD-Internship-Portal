"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function UserTypeLogin() {
  const [type, setType] = useState("");
  const router = useRouter();

  const handleContinue = () => type && router.push(`/login/${type}`);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card
        className="w-[90vw] max-w-[40rem] rounded-2xl bg-white shadow-2xl
                       border border-black/30 px-10 py-10 text-black"
      >
        {/* ---------- HEADER ---------- */}
        <CardHeader className="p-0">
          <CardTitle
            className="whitespace-nowrap text-center font-bold
                                text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Choose your user type
          </CardTitle>
        </CardHeader>

        {/* ---------- SELECT ---------- */}
        <CardContent className="mt-12">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger
              id="user-type"
              className="w-full py-4 px-5 rounded-md  bg-gray-100 border border-gray-300
                         text-base sm:text-lg
                         placeholder:text-black/60 focus:outline-none
                         focus:ring-2 focus:ring-[#FF6F1B]"
            >
              <SelectValue placeholder="Select a role…" />
            </SelectTrigger>

            <SelectContent
              position="popper"
              className="rounded-md border border-black bg-white text-black shadow-lg"
            >
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="scad">SCAD Office</SelectItem>
              <SelectItem value="faculty">Faculty Member</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        {/* ---------- BUTTON ---------- */}
        <CardFooter className="flex justify-center mt-12">
          <Button
            onClick={handleContinue}
            disabled={!type}
            className="w-44 sm:w-52 h-12 rounded-md
                       bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]
                       text-base sm:text-lg font-semibold text-white
                       transition-transform hover:scale-105
                       disabled:opacity-40 disabled:pointer-events-none enabled:cursor-pointer"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
