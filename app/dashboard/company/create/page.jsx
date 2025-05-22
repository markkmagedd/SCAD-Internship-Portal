"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, Calendar, Info, Check, Loader2 } from "lucide-react";

export default function CreatePage() {
  const router = useRouter();

  const [internshipData, setInternshipData] = useState({
    title: "",
    description: "",
    duration: "",
    isPaid: false,
    salary: "",
    skills: "",
    startDate: "",
    requirements: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternshipData({ ...internshipData, [name]: value });
  };

  const handleCheckboxChange = (checked) => {
    setInternshipData({ ...internshipData, isPaid: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Generate the new internship post object
    const newPost = {
      id: Date.now(), // Use timestamp as a simple unique ID
      title: internshipData.title,
      description: internshipData.description,
      duration: internshipData.duration,
      isPaid: internshipData.isPaid,
      salary: internshipData.isPaid ? internshipData.salary : "",
      skills: internshipData.skills.split(",").map((skill) => skill.trim()),
      description: internshipData.description,
      datePosted: new Date().toISOString().split("T")[0],
      applications: 0,
      status: "active",
      startDate: internshipData.startDate,
      requirements: internshipData.requirements,
    };

    // Simulate API call with a delay
    setTimeout(() => {
      try {
        // Get current posts from localStorage or use empty array
        const storedPosts = localStorage.getItem("internshipPosts");
        const currentPosts = storedPosts ? JSON.parse(storedPosts) : [];

        // Add new post
        const updatedPosts = [...currentPosts, newPost];

        // Save back to localStorage
        localStorage.setItem("internshipPosts", JSON.stringify(updatedPosts));

        setIsSubmitting(false);
        setShowSuccess(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setInternshipData({
            title: "",
            description: "",
            duration: "",
            isPaid: false,
            salary: "",
            skills: "",
            startDate: "",
            requirements: "",
          });
          setAttachments([]);
        }, 3000);
      } catch (error) {
        console.error("Error saving internship:", error);
        setIsSubmitting(false);
        alert("Failed to create internship. Please try again.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Create Internship</h1>
      </div>

      {showSuccess ? (
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-[#FF6F1B]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Internship Posted Successfully!
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Your internship has been created and is now visible to students.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-black border border-gray-700 text-white hover:bg-gray-800 hover:cursor-pointer"
                onClick={() => setShowSuccess(false)}
              >
                Create Another
              </Button>
              <Button
                onClick={() => router.push("/dashboard/company/posts")}
                className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  View All Internships
                </span>
                <span className="relative invisible">View All Internships</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Internship Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-400">
                      Internship Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={internshipData.title}
                      onChange={handleChange}
                      placeholder="e.g. Frontend Developer Intern"
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-gray-400">
                      Duration *
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={internshipData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 3 months"
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-400">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={internshipData.description}
                    onChange={handleChange}
                    placeholder="Describe the internship role, responsibilities, and expectations..."
                    className="h-32 bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPaid"
                        checked={internshipData.isPaid}
                        onCheckedChange={handleCheckboxChange}
                        className="data-[state=checked]:bg-[#FF6F1B] data-[state=checked]:text-primary-foreground"
                      />
                      <Label
                        htmlFor="isPaid"
                        className="text-white cursor-pointer"
                      >
                        Paid Internship
                      </Label>
                    </div>

                    {internshipData.isPaid && (
                      <div className="space-y-2">
                        <Label htmlFor="salary" className="text-gray-400">
                          Expected Salary *
                        </Label>
                        <Input
                          id="salary"
                          name="salary"
                          value={internshipData.salary}
                          onChange={handleChange}
                          placeholder="e.g. $1000/month"
                          className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                          required={internshipData.isPaid}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-gray-400">
                      Expected Start Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={internshipData.startDate}
                        onChange={handleChange}
                        className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-gray-400">
                    Required Skills *
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={internshipData.skills}
                    onChange={handleChange}
                    placeholder="e.g. JavaScript, React, CSS (comma separated)"
                    className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-gray-400">
                    Requirements & Qualifications
                  </Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    value={internshipData.requirements}
                    onChange={handleChange}
                    placeholder="Minimum qualifications, education requirements, etc."
                    className="h-24 bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Attachments (Optional)
              </h2>

              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-black relative">
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setAttachments(Array.from(e.target.files))}
                />
                <Upload className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                <p className="text-sm text-gray-400 mb-2">
                  Drag & drop files here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports PDF, DOC, DOCX (Max. 5MB each)
                </p>
              </div>

              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label className="text-gray-400">Selected Files:</Label>
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800/20 p-2 rounded"
                      >
                        <span className="text-white text-sm">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-transparent"
                          onClick={() =>
                            setAttachments(
                              attachments.filter((_, i) => i !== index)
                            )
                          }
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center space-x-4 bg-black border border-gray-800 p-4 rounded-lg mb-6">
            <Info className="h-5 w-5 text-[#FF6F1B]" />
            <div className="text-sm text-gray-400">
              Once published, this internship will be visible to all verified
              students on the platform. You can edit or delete it at any time.
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="bg-black border border-gray-700 hover:bg-black text-white hover:text-[#FF6F1B] hover:cursor-pointer"
              onClick={() => router.push("/dashboard/company/posts")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Posting...
                </>
              ) : (
                "Publish Internship"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
