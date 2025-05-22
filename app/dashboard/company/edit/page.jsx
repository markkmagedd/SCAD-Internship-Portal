"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, Calendar, Info, Check, ArrowLeft, Loader2 } from "lucide-react";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

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

  const [isLoading, setIsLoading] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch the post data when the component loads
  useEffect(() => {
    if (!postId) {
      router.push("/dashboard/company/posts");
      return;
    }

    // In a real app, this would be an API call
    // For now, we'll simulate loading data from localStorage
    const fetchPost = () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        setTimeout(() => {
          // Get posts from localStorage or use default posts
          const storedPosts = localStorage.getItem("internshipPosts");
          const posts = storedPosts ? JSON.parse(storedPosts) : [];
          
          const post = posts.find(p => p.id.toString() === postId);
          
          if (post) {
            setInternshipData({
              title: post.title || "",
              description: post.description || "",
              duration: post.duration || "",
              isPaid: post.isPaid || false,
              salary: post.salary || "",
              skills: Array.isArray(post.skills) ? post.skills.join(", ") : post.skills || "",
              startDate: post.startDate || "",
              requirements: post.requirements || "",
            });
          } else {
            // Post not found
            alert("Internship not found");
            router.push("/dashboard/company/posts");
          }
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching post:", error);
        setIsLoading(false);
        router.push("/dashboard/company/posts");
      }
    };

    fetchPost();
  }, [postId, router]);

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

    // In a real app, this would be an API call
    // For now, we'll update the post in localStorage
    setTimeout(() => {
      try {
        // Get current posts
        const storedPosts = localStorage.getItem("internshipPosts");
        const posts = storedPosts ? JSON.parse(storedPosts) : [];
        
        // Find post index
        const postIndex = posts.findIndex(p => p.id.toString() === postId);
        
        if (postIndex !== -1) {
          // Update the post with new data
          const updatedPost = {
            ...posts[postIndex],
            title: internshipData.title,
            description: internshipData.description,
            duration: internshipData.duration,
            isPaid: internshipData.isPaid,
            salary: internshipData.isPaid ? internshipData.salary : "",
            skills: internshipData.skills.split(",").map(skill => skill.trim()),
            startDate: internshipData.startDate,
            requirements: internshipData.requirements,
            dateUpdated: new Date().toISOString().split("T")[0]
          };
          
          posts[postIndex] = updatedPost;
          
          // Save back to localStorage
          localStorage.setItem("internshipPosts", JSON.stringify(posts));
          
          setIsSubmitting(false);
          setShowSuccess(true);
        } else {
          alert("Internship not found");
          router.push("/dashboard/company/posts");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        setIsSubmitting(false);
        alert("Failed to update internship post");
      }
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-[#FF6F1B] animate-spin mb-4" />
          <p className="text-white">Loading internship data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="bg-black border-gray-700 hover:bg-black text-white hover:text-[#FF6F1B]"
            onClick={() => router.push("/dashboard/company/posts")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Posts
          </Button>
          <h1 className="text-2xl font-bold text-white">Edit Internship</h1>
        </div>
      </div>

      {showSuccess ? (
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-[#FF6F1B]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Internship Updated Successfully!
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Your internship has been updated and the changes are now visible to students.
            </p>
            <div className="flex gap-4">
              <Button
                className="bg-black border border-gray-700 text-white hover:bg-gray-800 hover:cursor-pointer"
                onClick={() => router.push("/dashboard/company/posts")}
              >
                Back to Posts
              </Button>
              <Button
                className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                onClick={() => setShowSuccess(false)}
              >
                Continue Editing
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

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline" 
              className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:text-red-300"
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
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Updating...
                </>
              ) : (
                "Update Internship"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
} 