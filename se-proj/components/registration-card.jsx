"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa"; // Import icons

export default function RegisterCard() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <Card className="shadow-2xl scale-110 w-full max-w-sm sm:max-w-md md:max-w-lg bg-black border-black">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold mb-4 mt-6 text-white">
            Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-9 p-10">
          <div className="space-y-1">
            <Label className="font-bold text-white">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              className="p-5 border-2 border-white focus:border-orange-500 text-white"
            />
          </div>
          <div className="space-y-1">
            <Label className="font-bold text-white">Password</Label>
            <Input
              id="password"
              placeholder="********"
              className="p-5 border-2 border-white focus:border-orange-500 text-white"
            />
            <p className="text-xs text-white">
              Don't Have An Account?{" "}
              <Link
                href="/auth/registration"
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Create An Account
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-center flex place-items-center justify-items">
          <Button
            onClick={handleLogin}
            className="scale-120 bg-gradient-to-tl text-white from-[#EC1024] to-[#FF6F1B] hover:scale-110 cursor-pointer w-40 shadow-xl"
          >
            Login
          </Button>
        </CardFooter>

        {/* Split Separator with OR in the middle */}

        <div className="flex items-center gap-4">
          <Separator className="flex-1 bg-white" />
          <span className="text-white">or</span>
          <Separator className="flex-1 bg-white " />
        </div>

        {/* Social Media Login Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:scale-110 cursor-pointer">
            {/* Facebook Icon */}
            <FaFacebookF className="text-2xl" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white hover:scale-110 cursor-pointer">
            {/* Google Icon */}
            <FaGoogle className="text-2xl" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 text-white hover:scale-110 cursor-pointer">
            {/* GitHub Icon */}
            <FaGithub className="text-2xl" />
          </div>
        </div>
      </Card>
    </>
  );
}
