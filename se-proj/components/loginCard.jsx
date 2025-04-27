import { Button } from "@/components/ui/button";
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

export default function LoginCard() {
  return (
    <>
      <Card className="p-12 ">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold mb-8 ">
            Login
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-9">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-,">
              Email
            </Label>
            <Input id="email" placeholder="someone@123" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Password</Label>
            <Input id="password" placeholder="@peduarte" />
          </div>
        </CardContent>
        <CardFooter className="justify-center flex place-items-center justify-items">
          <Button className="bg-[#FE7743] mt-9">Login</Button>
        </CardFooter>
      </Card>
    </>
  );
}
