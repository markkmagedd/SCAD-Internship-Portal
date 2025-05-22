"use client";

import { useState } from "react";
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

// Dummy user data
const dummyUsers = [
  { email: "student@gmail.com", password: "password", type: "student" },
  { email: "prostudent@gmail.com", password: "password", type: "pro-student" },
  { email: "scadoffice@gmail.com", password: "password", type: "scad-office" },
  { email: "company@gmail.com", password: "password", type: "company" },
  { email: "faculty@gmail.com", password: "password", type: "faculty-member" },
];

export default function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // Reset error
    setError("");
    setIsLoading(true);

    // Simulate a network request
    setTimeout(() => {
      // Find user with matching email
      const user = dummyUsers.find((user) => user.email === email);

      if (!user) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Redirect based on user type
      switch (user.type) {
        case "student":
          router.push("/dashboard/student");
          break;
        case "pro-student":
          router.push("/dashboard/pro-student");
          break;
        case "scad-office":
          router.push("/dashboard/scad-office");
          break;
        case "company":
          router.push("/dashboard/company");
          break;
        case "faculty-member":
          router.push("/dashboard/faculty-member");
          break;
        default:
          router.push("/dashboard");
      }
      // Note: setIsLoading will not be called after redirect
    }, 1000); // Simulate 1 second loading time
  };

  return (
    <Card className="shadow-2xl scale-110 w-full max-w-md bg-white text-black">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label className="font-bold">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className="p-5 mb-2 mt-2 bg-gray-100 border border-gray-300 focus:border-[#FF6F1B]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </CardContent>

      <CardFooter className="justify-center">
        <Button
          onClick={handleLogin}
          className="scale-120 bg-gradient-to-tl text-white from-[#EC1024] to-[#FF6F1B] hover:scale-110 cursor-pointer w-40 shadow-xl relative"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Login</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </>
          ) : (
            "Login"
          )}
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
