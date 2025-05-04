"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginCard() {
  const router = useRouter();
  const handleLogin = () => router.push("/dashboard");

  return (
    <Card className="shadow-2xl scale-110 w-full max-w-md bg-white text-black   ">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-extrabold mb-4 mt-6">
          Login To Your Account
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-9 p-10">
        <div className="space-y-1">
          <Label className="font-bold">Email</Label>
          <Input
            id="email"
            placeholder="john.doe@example.com"
            className="p-5 mt-2 bg-gray-100 border border-gray-300 focus:border-[#FF6F1B]"
          />
        </div>

        <div className="space-y-1">
          <Label className="font-bold">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className="p-5 mb-2 mt-2 bg-gray-100 border border-gray-300 focus:border-[#FF6F1B]"
          />
          <p className="text-xs">
            Don’t have an account?{" "}
            <Link
              href="/registration"
              className="text-orange-600 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Button
          onClick={handleLogin}
          className="scale-120 bg-gradient-to-tl text-white from-[#EC1024] to-[#FF6F1B] hover:scale-110 cursor-pointer w-40 shadow-xl"
        >
          Login
        </Button>
      </CardFooter>

      {/* separator */}
      <div className="flex items-center gap-4 px-10 pt-6">
        <Separator className="flex-1 bg-black" />
        <span className="">or</span>
        <Separator className="flex-1 bg-black" />
      </div>

      {/* social buttons */}
      <div className="flex justify-center space-x-6 mt-6 pb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:scale-110 cursor-pointer">
          <FaFacebookF className="text-2xl" />
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white hover:scale-110 cursor-pointer">
          <FaGoogle className="text-2xl" />
        </div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:scale-110 cursor-pointer">
          <FaGithub className="text-2xl" />
        </div>
      </div>
    </Card>
  );
}
