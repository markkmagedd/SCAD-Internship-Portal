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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function CompanyRegistration() {
  const router = useRouter();

  /* ---------- STATE ---------- */
  const [form, setForm] = useState({
    name: "",
    industry: "",
    size: "",
    docs: null, // <-- new field
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });

  /* ---------- HANDLERS ---------- */
  const set = (field) => (val) => setForm((f) => ({ ...f, [field]: val }));
  const handleInput = (field) => (e) => set(field)(e.target.value);

  const passwordsMatch = form.password && form.password === form.confirm;

  const complete = Object.values({
    name: form.name,
    industry: form.industry,
    size: form.size,
    docs: form.docs,
    email: form.email,
    pass: passwordsMatch,
    terms: form.terms,
  }).every(Boolean);

  const handleSubmit = () => {
    if (!complete) return;
    console.log("Payload:", form);
    router.push("/dashboard");
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center p-4 scale-110">
      <Card
        className="w-full max-w-5xl rounded-2xl bg-white text-black
                       shadow-2xl border border-black/30 px-12 py-10"
      >
        {/* -------- HEADER -------- */}
        <CardHeader className="p-0 mb-8">
          <CardTitle className="text-3xl font-bold text-center">
            Company details
          </CardTitle>
        </CardHeader>

        {/* -------- FORM -------- */}
        <CardContent className="grid gap-6">
          {/* name + industry */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="font-medium" htmlFor="name">
                Company name
              </Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                value={form.name}
                onChange={handleInput("name")}
                className="mt-2 bg-gray-100 border border-gray-300 focus:border-[#FF6F1B]"
              />
            </div>
            <div>
              <Label className="font-medium" htmlFor="industry">
                Industry
              </Label>
              <Input
                id="industry"
                placeholder="Technology"
                value={form.industry}
                onChange={handleInput("industry")}
                className="mt-2 bg-gray-100 border border-gray-300 focus:border-[#FF6F1B]"
              />
            </div>
          </div>

          {/* size */}
          <div>
            <Label className="font-medium">Company size</Label>
            <Select value={form.size} onValueChange={set("size")}>
              <SelectTrigger className="mt-2 w-full bg-gray-100 border border-gray-300 py-3 px-4">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                <SelectItem value="small">Small (≤ 50)</SelectItem>
                <SelectItem value="medium">Medium (51‑100)</SelectItem>
                <SelectItem value="large">Large (101‑500)</SelectItem>
                <SelectItem value="corporate">Corporate (&gt; 500)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* document upload */}
          <div>
            <Label className="font-medium">
              Legitimacy document (PDF, ZIP, image)
            </Label>
            <Input
              type="file"
              accept=".pdf,.zip,.jpg,.png"
              onChange={(e) => set("docs")(e.target.files?.[0] || null)}
              className="mt-2 w-full bg-gray-100 border border-gray-300 px-4 file:text-black"
            />
            {form.docs && (
              <span className="text-sm text-gray-600">{form.docs.name}</span>
            )}
          </div>

          {/* email + password */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="font-medium" htmlFor="email">
                Official email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="hr@acme.com"
                value={form.email}
                onChange={handleInput("email")}
                className="mt-2 bg-gray-100 border border-gray-300 px-4"
              />
            </div>
            <div>
              <Label className="font-medium" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleInput("password")}
                className="mt-2 bg-gray-100 border border-gray-300 px-4"
              />
            </div>
          </div>

          {/* confirm password */}
          <div>
            <Label className="font-medium" htmlFor="confirm">
              Confirm password
            </Label>
            <Input
              id="confirm"
              type="password"
              placeholder="********"
              value={form.confirm}
              onChange={handleInput("confirm")}
              className={`mt-2 bg-gray-100 border py-3 px-4 ${
                passwordsMatch ? "border-gray-300" : "border-red-500"
              }`}
            />
            {!passwordsMatch && form.confirm && (
              <span className="text-xs text-red-600">
                Passwords do not match
              </span>
            )}
          </div>

          {/* terms */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={form.terms}
              onCheckedChange={(v) => set("terms")(!!v)}
              className="border-gray-400 data-[state=checked]:bg-black"
            />
            <Label className="text-sm leading-snug">
              I agree to the
              <a
                href="/terms"
                className="underline font-medium"
                target="_blank"
              >
                Terms &amp; Conditions
              </a>
            </Label>
          </div>
        </CardContent>

        {/* -------- SUBMIT -------- */}
        <CardFooter className="mt-8 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!complete}
            className="w-full md:w-48 h-12 rounded-md
                       bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]
                       font-semibold text-white transition-transform
                       hover:scale-105 disabled:opacity-40"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
