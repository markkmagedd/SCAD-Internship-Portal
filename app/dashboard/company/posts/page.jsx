"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  FileText,
  Eye,
  Edit,
  Trash2,
  Plus,
  AlertCircle,
  Calendar,
  Loader2,
  Check,
  Upload,
  Info,
  X as XIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PostsPage() {
  const router = useRouter();

  // Mock data initial state
  const defaultPosts = [
    {
      id: 1,
      title: "Backend Developer Intern",
      duration: "3 months",
      isPaid: true,
      salary: "$1000/month",
      skills: ["Node.js", "Express", "MongoDB"],
      description:
        "Join our backend team to develop and maintain API services.",
      datePosted: "2025-01-15",
      applications: 8,
      status: "active",
    },
    {
      id: 2,
      title: "Frontend Intern",
      duration: "6 months",
      isPaid: true,
      salary: "$1200/month",
      skills: ["React", "JavaScript", "CSS"],
      description: "Help us build responsive and accessible user interfaces.",
      datePosted: "2025-02-01",
      applications: 12,
      status: "active",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      duration: "4 months",
      isPaid: false,
      salary: "",
      skills: ["SQL", "Python", "Data Visualization"],
      description:
        "Analyze customer data and create reports for business insights.",
      datePosted: "2025-02-10",
      applications: 5,
      status: "active",
    },
    {
      id: 4,
      title: "Marketing Intern",
      duration: "3 months",
      isPaid: true,
      salary: "$800/month",
      skills: ["Social Media", "Content Creation", "SEO"],
      description: "Create engaging content for our social media channels.",
      datePosted: "2025-01-20",
      applications: 15,
      status: "filled",
    },
  ];

  const [internshipPosts, setInternshipPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [filterParams, setFilterParams] = useState({
    status: "all",
    duration: "all",
  });

  // Dialog states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // New state for create/edit dialogs
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form state
  const [internshipForm, setInternshipForm] = useState({
    title: "",
    description: "",
    duration: "",
    isPaid: false,
    salary: "",
    skills: "",
    startDate: "",
    requirements: "",
    status: "active",
  });

  // Load posts from localStorage on initial render
  useEffect(() => {
    const storedPosts = localStorage.getItem("internshipPosts");
    if (storedPosts) {
      try {
        setInternshipPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error("Error parsing stored posts:", error);
        // If there's an error, use default posts and save them
        setInternshipPosts(defaultPosts);
        localStorage.setItem("internshipPosts", JSON.stringify(defaultPosts));
      }
    } else {
      // If no stored posts, use default posts and save them
      setInternshipPosts(defaultPosts);
      localStorage.setItem("internshipPosts", JSON.stringify(defaultPosts));
    }
  }, []);

  // Helper Functions
  const handlePostSearch = () => {
    // Filter posts by title or description
    if (!searchTerm) return internshipPosts;
    return internshipPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "filled":
        return "bg-blue-500/20 text-blue-400";
      case "draft":
        return "bg-gray-500/20 text-gray-400";
      case "expired":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const handleDeleteClick = (e, postId) => {
    e.preventDefault();
    e.stopPropagation();
    const post = internshipPosts.find((p) => p.id === postId);
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;

    const updatedPosts = internshipPosts.filter(
      (post) => post.id !== postToDelete.id
    );
    setInternshipPosts(updatedPosts);

    // Update localStorage
    localStorage.setItem("internshipPosts", JSON.stringify(updatedPosts));

    // Close dialog and reset
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);

    if (selectedPost && selectedPost.id === postToDelete.id) {
      setSelectedPost(null);
    }
  };

  const handleViewClick = (e, post) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedPost(post);
  };

  // Create/Edit functions
  const handleCreateClick = () => {
    setInternshipForm({
      title: "",
      description: "",
      duration: "",
      isPaid: false,
      salary: "",
      skills: "",
      startDate: "",
      requirements: "",
      status: "active",
    });
    setIsEditing(false);
    setIsFormDialogOpen(true);
  };

  const handleEditClick = (e, post) => {
    e.preventDefault();
    e.stopPropagation();

    setInternshipForm({
      id: post.id,
      title: post.title || "",
      description: post.description || "",
      duration: post.duration || "",
      isPaid: post.isPaid || false,
      salary: post.salary || "",
      skills: Array.isArray(post.skills)
        ? post.skills.join(", ")
        : post.skills || "",
      startDate: post.startDate || "",
      requirements: post.requirements || "",
      status: post.status || "active",
    });

    setIsEditing(true);
    setIsFormDialogOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInternshipForm({ ...internshipForm, [name]: value });
  };

  const handleCheckboxChange = (checked) => {
    setInternshipForm({ ...internshipForm, isPaid: checked });
  };

  const handleStatusChange = (value) => {
    setInternshipForm({ ...internshipForm, status: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Process form data
    const formattedFormData = {
      ...internshipForm,
      skills: internshipForm.skills.split(",").map((skill) => skill.trim()),
      salary: internshipForm.isPaid ? internshipForm.salary : "",
    };

    setTimeout(() => {
      try {
        // Get current posts
        const storedPosts = localStorage.getItem("internshipPosts");
        const currentPosts = storedPosts ? JSON.parse(storedPosts) : [];

        let updatedPosts;

        if (isEditing) {
          // Update existing post
          const postIndex = currentPosts.findIndex(
            (p) => p.id.toString() === formattedFormData.id.toString()
          );

          if (postIndex !== -1) {
            // Create updated post object
            const updatedPost = {
              ...currentPosts[postIndex],
              title: formattedFormData.title,
              description: formattedFormData.description,
              duration: formattedFormData.duration,
              isPaid: formattedFormData.isPaid,
              salary: formattedFormData.salary,
              skills: formattedFormData.skills,
              startDate: formattedFormData.startDate,
              requirements: formattedFormData.requirements,
              status: formattedFormData.status,
              dateUpdated: new Date().toISOString().split("T")[0],
            };

            // Replace the post in the array
            updatedPosts = [...currentPosts];
            updatedPosts[postIndex] = updatedPost;

            setSuccessMessage("Internship updated successfully!");
          } else {
            throw new Error("Internship not found");
          }
        } else {
          // Create new post
          const newPost = {
            id: Date.now(), // Use timestamp as a simple unique ID
            title: formattedFormData.title,
            description: formattedFormData.description,
            duration: formattedFormData.duration,
            isPaid: formattedFormData.isPaid,
            salary: formattedFormData.salary,
            skills: formattedFormData.skills,
            datePosted: new Date().toISOString().split("T")[0],
            applications: 0,
            status: formattedFormData.status,
            startDate: formattedFormData.startDate,
            requirements: formattedFormData.requirements,
          };

          // Add new post to array
          updatedPosts = [...currentPosts, newPost];

          setSuccessMessage("New internship created successfully!");
        }

        // Save to localStorage
        localStorage.setItem("internshipPosts", JSON.stringify(updatedPosts));

        // Update state
        setInternshipPosts(updatedPosts);
        setIsSubmitting(false);
        setIsFormDialogOpen(false);
        setShowSuccess(true);

        // Reset form
        setInternshipForm({
          title: "",
          description: "",
          duration: "",
          isPaid: false,
          salary: "",
          skills: "",
          startDate: "",
          requirements: "",
          status: "active",
        });

        // Hide success message after delay
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Error saving internship:", error);
        setIsSubmitting(false);
        alert(
          `Failed to ${
            isEditing ? "update" : "create"
          } internship. Please try again.`
        );
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Success message toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-black border border-green-500 rounded-lg p-4 shadow-lg animate-in slide-in-from-top fade-in-20">
          <div className="flex items-start gap-3">
            <div className="bg-green-500/20 p-2 rounded-full">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium text-white">{successMessage}</h3>
              <p className="text-sm text-gray-400">
                The changes have been applied successfully.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full text-gray-400 hover:text-white"
              onClick={() => setShowSuccess(false)}
            >
              <span className="sr-only">Close</span>×
            </Button>
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
              placeholder="Search posts by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterParams.status}
            onValueChange={(value) =>
              setFilterParams({
                ...filterParams,
                status: value,
              })
            }
          >
            <SelectTrigger className="w-40 bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="filled">Filled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Button
            onClick={handleCreateClick}
            className="relative inline-flex items-center justify-center px-6 py-3 text-sm bg-transparent text-white bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
          >
            {/* Sliding icon overlay */}
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
              <Plus className="h-5 w-5" />
            </span>

            {/* Main text that fades upward */}
            <span className="absolute inset-0 flex items-center justify-center w-full h-full font-bold text-white transition-transform duration-300 transform group-hover:translate-x-full ease whitespace-nowrap">
              Create New Internship
            </span>

            {/* Placeholder to preserve layout */}
            <span className="relative invisible whitespace-nowrap">
              Create New Internship
            </span>
          </Button>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {handlePostSearch()
          .filter(
            (post) =>
              filterParams.status === "all" ||
              post.status === filterParams.status
          )
          .map((post) => (
            <Card
              key={post.id}
              className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:translate-y-[-4px]"
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {post.title}
                    </h3>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status.charAt(0).toUpperCase() +
                        post.status.slice(1)}
                    </Badge>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-black text-[#FF6F1B] border-[#FF6F1B]/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="text-white">{post.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Compensation</p>
                      <p className="text-white">
                        {post.isPaid ? post.salary : "Unpaid"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Posted</p>
                      <p className="text-white">{post.datePosted}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Applications</p>
                      <p className="text-white">{post.applications}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 p-4 flex justify-between">
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                    onClick={(e) => handleViewClick(e, post)}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Eye className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Eye className="h-4 w-4 mr-2" /> View
                    </span>
                    <span className="relative invisible">View</span>
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                    onClick={(e) => handleEditClick(e, post)}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Edit className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </span>
                    <span className="relative invisible">Edit</span>
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                    onClick={(e) => handleDeleteClick(e, post.id)}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Trash2 className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </span>
                    <span className="relative invisible">Delete</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Empty state */}
      {handlePostSearch().filter(
        (post) =>
          filterParams.status === "all" || post.status === filterParams.status
      ).length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <FileText className="h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            No internship posts found
          </h3>
          <p className="text-gray-400 text-center mb-6">
            {searchTerm
              ? "No results match your search criteria."
              : "You haven't created any internship posts yet."}
          </p>
          <Button
            onClick={handleCreateClick}
            className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
              <Plus className="h-5 w-5" />
            </span>
            <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Create New Internship
            </span>
            <span className="relative invisible">Create New Internship</span>
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this internship post? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {postToDelete && (
            <div className="py-4 border-t border-b border-gray-800 my-4">
              <h3 className="font-medium text-white mb-2">
                {postToDelete.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {postToDelete.description}
              </p>
              <div className="flex gap-2">
                <Badge className={getStatusColor(postToDelete.status)}>
                  {postToDelete.status.charAt(0).toUpperCase() +
                    postToDelete.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="bg-black border-gray-700">
                  {postToDelete.isPaid ? postToDelete.salary : "Unpaid"}
                </Badge>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              className="bg-black text-white border-gray-700 hover:bg-gray-900"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDeleteConfirm}
            >
              Delete Internship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {isEditing ? "Edit Internship" : "Create New Internship"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {isEditing
                ? "Update the information for this internship posting."
                : "Fill out the form below to create a new internship posting."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6 py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-400">
                    Internship Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={internshipForm.title}
                    onChange={handleFormChange}
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
                    value={internshipForm.duration}
                    onChange={handleFormChange}
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
                  value={internshipForm.description}
                  onChange={handleFormChange}
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
                      checked={internshipForm.isPaid}
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

                  {internshipForm.isPaid && (
                    <div className="space-y-2">
                      <Label htmlFor="salary" className="text-gray-400">
                        Expected Salary *
                      </Label>
                      <Input
                        id="salary"
                        name="salary"
                        value={internshipForm.salary}
                        onChange={handleFormChange}
                        placeholder="e.g. $1000/month"
                        className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                        required={internshipForm.isPaid}
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
                      value={internshipForm.startDate}
                      onChange={handleFormChange}
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-400">
                  Status
                </Label>
                <Select
                  value={internshipForm.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="filled">Filled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className="text-gray-400">
                  Required Skills *
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={internshipForm.skills}
                  onChange={handleFormChange}
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
                  value={internshipForm.requirements}
                  onChange={handleFormChange}
                  placeholder="Minimum qualifications, education requirements, etc."
                  className="h-24 bg-black border-gray-700 text-white focus:border-[#FF6F1B]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-black border border-gray-800 p-4 rounded-lg">
              <Info className="h-5 w-5 text-[#FF6F1B]" />
              <div className="text-sm text-gray-400">
                {isEditing
                  ? "Any changes made will be immediately visible to students."
                  : "Once published, this internship will be visible to all verified students on the platform."}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="bg-black text-white border-gray-700 hover:bg-gray-900"
                onClick={() => setIsFormDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Internship"
                ) : (
                  "Create Internship"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      >
        <DialogContent className="bg-black border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle className="text-white text-xl flex items-center">
                    {selectedPost.title}
                    <Badge
                      className={`ml-3 ${getStatusColor(selectedPost.status)}`}
                    >
                      {selectedPost.status.charAt(0).toUpperCase() +
                        selectedPost.status.slice(1)}
                    </Badge>
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-400">
                  Posted on {selectedPost.datePosted} •{" "}
                  {selectedPost.applications} applications
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Duration
                    </h3>
                    <p className="text-white">{selectedPost.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Compensation
                    </h3>
                    <p className="text-white">
                      {selectedPost.isPaid ? selectedPost.salary : "Unpaid"}
                    </p>
                  </div>

                  {selectedPost.startDate && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">
                        Expected Start Date
                      </h3>
                      <p className="text-white">{selectedPost.startDate}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Description
                  </h3>
                  <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                    <p className="text-white whitespace-pre-line">
                      {selectedPost.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-black text-[#FF6F1B] border-[#FF6F1B]/30"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedPost.requirements && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Requirements & Qualifications
                    </h3>
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                      <p className="text-white whitespace-pre-line">
                        {selectedPost.requirements}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-500/20">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        Application Details
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedPost.applications} applications received
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex gap-3">
                <Button
                  variant="outline"
                  className="bg-black text-white border-gray-700"
                  onClick={() => setSelectedPost(null)}
                >
                  Close
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                  onClick={(e) => {
                    setSelectedPost(null);
                    handleEditClick(e, selectedPost);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit Internship
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
