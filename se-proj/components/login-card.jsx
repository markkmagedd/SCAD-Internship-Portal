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

export default function LoginCard() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <Card className="shadow-2xl scale-110 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold mb-2 mt-20">
            Login To Your Account
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-9 scale-120 p-20">
          <div className="space-y-1">
            <Label className="font-bold">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              className=" p-5"
            />
          </div>
          <div className="space-y-1">
            <Label className="font-bold">Password</Label>
            <Input id="password" placeholder="********" className="p-5" />
            <p className="text-xs">
              Don't Have An Account ?{" "}
              <Link
                href="/#"
                className="text-blue-500 hover:underline cursor-pointer"
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
      </Card>
    </>
  );
}
