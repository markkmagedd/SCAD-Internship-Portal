"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  XCircle,
  Clock,
  DollarSign,
  Briefcase,
  Building,
  Calendar,
  MapPin,
  Tag,
  Download,
  Star,
  StarHalf,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash,
  Plus,
  Save,
  X,
  Upload,
  FileText,
  Paperclip,
  VideoIcon,
  Info,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogTrigger,
} from "@/components/ui/dialog";

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [filterParams, setFilterParams] = useState({
    dateRange: "all",
    status: "all",
    industry: "all",
    duration: "all",
    isPaid: "all",
  });

  // Company evaluation state variables
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [evaluationForm, setEvaluationForm] = useState({
    rating: 5,
    comment: "",
    recommended: true,
  });
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userReviews, setUserReviews] = useState([
    {
      id: 101,
      companyId: 3, // Creative Hub company
      internshipId: 3,
      studentName: "You",
      rating: 4.5,
      comment:
        "I had a great experience working at Creative Hub. The team was supportive and I learned a lot about digital marketing.",
      date: "2024-07-20",
      recommended: true,
      isUserReview: true,
    },
  ]);

  // Add state for video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // New state for application documents
  const [applicationDocs, setApplicationDocs] = useState({
    cv: null,
    coverLetter: null,
    transcript: null,
    additional: null,
  });
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  // Sample data for internships
  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions Egypt",
      industry: "Software Development",
      location: "Cairo",
      duration: "3 months",
      isPaid: true,
      salary: "$1000/month",
      description:
        "Join our team to build responsive and accessible user interfaces using React. You'll work closely with our senior developers to implement new features and improve existing ones.",
      skills: ["React", "JavaScript", "CSS", "HTML"],
      postedDate: "2025-02-10",
      applicationDeadline: "2025-03-15",
      startDate: "2025-04-01",
      endDate: "2025-07-01",
      isCurrentIntern: true,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "Global Analytics Egypt",
      industry: "Data Science",
      location: "Smart Village, Cairo",
      duration: "6 months",
      isPaid: true,
      salary: "$1200/month",
      description:
        "Work with our data team to analyze customer data, create reports and visualizations, and provide insights to help drive business decisions.",
      skills: ["SQL", "Python", "Excel", "Data Visualization"],
      postedDate: "2025-02-05",
      applicationDeadline: "2025-03-10",
      startDate: "2025-04-01",
      endDate: "2025-10-01",
      isCurrentIntern: true,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Marketing Assistant",
      company: "Creative Hub Egypt",
      industry: "Marketing",
      location: "New Cairo",
      duration: "4 months",
      isPaid: true,
      salary: "$800/month",
      description:
        "Assist in developing marketing campaigns, managing social media accounts, and creating content for our clients.",
      skills: ["Social Media", "Content Creation", "Copywriting"],
      postedDate: "2025-02-01",
      applicationDeadline: "2025-03-01",
      startDate: "2025-03-15",
      endDate: "2025-07-15",
      isCurrentIntern: false,
      isCompleted: true,
    },
    {
      id: 4,
      title: "UX/UI Design Intern",
      company: "Future Systems Egypt",
      industry: "Design",
      location: "Maadi, Cairo",
      duration: "3 months",
      isPaid: false,
      salary: "",
      description:
        "Design user interfaces and experiences for web and mobile applications. You'll work with our design team to create wireframes, prototypes, and final designs.",
      skills: ["Figma", "Sketch", "UI/UX", "Prototyping"],
      postedDate: "2025-01-25",
      applicationDeadline: "2025-02-25",
      startDate: "2025-03-15",
      endDate: "2025-06-15",
      isCurrentIntern: false,
      isCompleted: true,
    },
    {
      id: 5,
      title: "Software Engineering Intern",
      company: "ABC Corporation Egypt",
      industry: "Software Development",
      location: "6th of October City",
      duration: "6 months",
      isPaid: true,
      salary: "$1500/month",
      description:
        "Join our engineering team to develop and maintain high-performance applications. Work on real-world projects using the latest technologies.",
      skills: ["Java", "Spring Boot", "Microservices", "REST APIs"],
      postedDate: "2025-02-08",
      applicationDeadline: "2025-03-08",
      startDate: "2025-04-01",
      endDate: "2025-10-01",
      isCurrentIntern: true,
      isCompleted: false,
    },
    {
      id: 6,
      title: "Finance Intern",
      company: "Global Banking Group Egypt",
      industry: "Finance",
      location: "Alexandria",
      duration: "3 months",
      isPaid: true,
      salary: "$1200/month",
      description:
        "Work with our finance team on financial analysis, reporting, and planning. Learn about financial operations in a global banking environment.",
      skills: ["Financial Analysis", "Excel", "Financial Modeling"],
      postedDate: "2025-01-20",
      applicationDeadline: "2025-02-20",
      startDate: "2025-03-10",
      endDate: "2025-06-10",
      isCurrentIntern: false,
      isCompleted: true,
    },
    {
      id: 7,
      title: "Graphic Design Intern",
      company: "Creative Studio Egypt",
      industry: "Design",
      location: "Heliopolis, Cairo",
      duration: "4 months",
      isPaid: false,
      salary: "",
      description:
        "Create visual assets for various projects including branding, social media, and print materials. Work with our design team to develop your skills.",
      skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Typography",
        "Branding",
      ],
      postedDate: "2025-02-03",
      applicationDeadline: "2025-03-03",
      startDate: "2025-03-20",
      endDate: "2025-07-20",
      isCurrentIntern: true,
      isCompleted: false,
    },
  ];

  // Filter the internships based on search term and filter parameters
  const filteredInternships = internships.filter((internship) => {
    // Search term filter
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());

    // Date range filter
    const today = new Date();
    const internshipStartDate = new Date(internship.startDate);
    const internshipEndDate = new Date(internship.endDate);

    const matchesDateRange =
      filterParams.dateRange === "all" ||
      (filterParams.dateRange === "last30days" &&
        (today - internshipStartDate) / (1000 * 60 * 60 * 24) <= 30) ||
      (filterParams.dateRange === "last3months" &&
        (today - internshipStartDate) / (1000 * 60 * 60 * 24) <= 90) ||
      (filterParams.dateRange === "last6months" &&
        (today - internshipStartDate) / (1000 * 60 * 60 * 24) <= 180);

    // Status filter (current intern or completed)
    const matchesStatus =
      filterParams.status === "all" ||
      (filterParams.status === "current" && internship.isCurrentIntern) ||
      (filterParams.status === "completed" && internship.isCompleted);

    // Industry filter
    const matchesIndustry =
      filterParams.industry === "all" ||
      internship.industry === filterParams.industry;

    // Duration filter
    const matchesDuration =
      filterParams.duration === "all" ||
      (filterParams.duration === "short" &&
        internship.duration.includes("3 months")) ||
      (filterParams.duration === "medium" &&
        internship.duration.includes("4 months")) ||
      (filterParams.duration === "long" &&
        internship.duration.includes("6 months"));

    // Paid status filter
    const matchesPaidStatus =
      filterParams.isPaid === "all" ||
      (filterParams.isPaid === "paid" && internship.isPaid) ||
      (filterParams.isPaid === "unpaid" && !internship.isPaid);

    return (
      matchesSearch &&
      matchesDateRange &&
      matchesStatus &&
      matchesIndustry &&
      matchesDuration &&
      matchesPaidStatus
    );
  });

  // Date ranges for filter dropdown
  const dateRanges = [
    { value: "all", label: "All Dates" },
    { value: "last30days", label: "Last 30 Days" },
    { value: "last3months", label: "Last 3 Months" },
    { value: "last6months", label: "Last 6 Months" },
  ];

  // Get unique industries for filter dropdown
  const industries = [
    ...new Set(internships.map((internship) => internship.industry)),
  ];

  // Duration options for filter dropdown
  const durations = [
    { value: "all", label: "All Durations" },
    { value: "short", label: "3 Months" },
    { value: "medium", label: "4 Months" },
    { value: "long", label: "6 Months" },
  ];

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);

    // Check if the user has already reviewed this internship's company
    if (internship) {
      const existingReview = userReviews.find(
        (review) => review.internshipId === internship.id
      );
      if (existingReview) {
        setCurrentEvaluation(existingReview);
      } else {
        setCurrentEvaluation(null);
      }
    }
  };

  const handleApply = () => {
    // Open application modal instead of alert
    setIsApplyModalOpen(true);
  };

  const handleFileChange = (e, docType) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationDocs({
        ...applicationDocs,
        [docType]: e.target.files[0],
      });
    }
  };

  const handleRemoveFile = (docType) => {
    setApplicationDocs({
      ...applicationDocs,
      [docType]: null,
    });
  };

  const handleSubmitApplication = () => {
    // In a real app, this would send an application request to the backend with the documents
    // For demo purposes, we'll simulate a successful application
    setApplicationStatus("success");

    // Reset after 3 seconds and close modal
    setTimeout(() => {
      setApplicationStatus(null);
      setIsApplyModalOpen(false);
      setApplicationDocs({
        cv: null,
        coverLetter: null,
        transcript: null,
        additional: null,
      });
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-600" />);
    }

    return stars;
  };

  // Get user's evaluation for the selected internship
  const getUserEvaluationForSelectedInternship = () => {
    if (!selectedInternship) return null;
    return userReviews.find(
      (review) => review.internshipId === selectedInternship.id
    );
  };

  // Handle creating or updating evaluation
  const handleEvaluationSubmit = () => {
    const today = new Date().toISOString().split("T")[0];

    if (currentEvaluation) {
      // Update existing evaluation
      const updatedReviews = userReviews.map((review) =>
        review.id === currentEvaluation.id
          ? {
              ...review,
              rating: parseFloat(evaluationForm.rating),
              comment: evaluationForm.comment,
              recommended: evaluationForm.recommended,
              date: today,
            }
          : review
      );
      setUserReviews(updatedReviews);
    } else {
      // Create new evaluation
      const newEvaluation = {
        id: Date.now(),
        companyId: selectedInternship.id, // Using internship ID for company ID in this example
        internshipId: selectedInternship.id,
        studentName: "You",
        rating: parseFloat(evaluationForm.rating),
        comment: evaluationForm.comment,
        date: today,
        recommended: evaluationForm.recommended,
        isUserReview: true,
      };

      setUserReviews([...userReviews, newEvaluation]);
    }

    setIsEvaluationModalOpen(false);
    setCurrentEvaluation(currentEvaluation || newEvaluation);
  };

  // Handle deleting evaluation
  const handleDeleteEvaluation = () => {
    if (!currentEvaluation) return;

    // Remove from user reviews
    const updatedUserReviews = userReviews.filter(
      (review) => review.id !== currentEvaluation.id
    );
    setUserReviews(updatedUserReviews);

    setShowDeleteConfirm(false);
    setCurrentEvaluation(null);
  };

  // Open evaluation modal for creating or editing
  const openEvaluationModal = (evaluation = null) => {
    if (evaluation) {
      setEvaluationForm({
        rating: evaluation.rating,
        comment: evaluation.comment,
        recommended: evaluation.recommended,
      });
      setCurrentEvaluation(evaluation);
    } else {
      setEvaluationForm({
        rating: 5,
        comment: "",
        recommended: true,
      });
      setCurrentEvaluation(null);
    }
    setIsEvaluationModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Available Internships
          </h1>
          <p className="text-gray-400">
            Browse and apply for internship opportunities
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <VideoIcon className="h-4 w-4 mr-2" />
            Internship Requirements
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black border-gray-800 shadow-s">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by job title or company name"
                className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Select
                value={filterParams.dateRange}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    dateRange: value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-black border-gray-700 text-white">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700 text-white">
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filterParams.status}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    status: value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-black border-gray-700 text-white">
                  <SelectValue placeholder="Internship status" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700 text-white">
                  <SelectItem value="all">All Internships</SelectItem>
                  <SelectItem value="current">Current Intern</SelectItem>
                  <SelectItem value="completed">
                    Internship Completed
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filterParams.industry}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    industry: value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-black border-gray-700 text-white">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700 text-white">
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filterParams.duration}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    duration: value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-black border-gray-700 text-white">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700 text-white">
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filterParams.isPaid}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    isPaid: value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-black border-gray-700 text-white">
                  <SelectValue placeholder="Payment status" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700 text-white">
                  <SelectItem value="all">Paid & Unpaid</SelectItem>
                  <SelectItem value="paid">Paid Only</SelectItem>
                  <SelectItem value="unpaid">Unpaid Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div
        className={`grid grid-cols-1 ${
          selectedInternship ? "md:grid-cols-12" : ""
        } gap-6`}
      >
        {/* Listings */}
        <div
          className={
            selectedInternship ? "md:col-span-5 lg:col-span-4" : "w-full"
          }
        >
          <div
            className={`grid ${
              selectedInternship ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            } gap-4`}
          >
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <Card
                  key={internship.id}
                  className={`bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:translate-y-[-4px] ${
                    selectedInternship &&
                    selectedInternship.id === internship.id
                      ? "border-[#FF6F1B]"
                      : ""
                  }`}
                  onClick={() => handleSelectInternship(internship)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {internship.title}
                      </h3>
                      <Badge
                        className={
                          internship.isCompleted
                            ? "bg-blue-500/20 text-blue-400"
                            : internship.isCurrentIntern
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {internship.isCompleted
                          ? "Completed"
                          : internship.isCurrentIntern
                          ? "Current"
                          : "Upcoming"}
                      </Badge>
                    </div>

                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{internship.company}</span>
                      <span className="px-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {formatDate(internship.startDate)} -{" "}
                        {formatDate(internship.endDate)}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {internship.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-black text-[#FF6F1B] border-[#FF6F1B]/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {internship.skills.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-black text-gray-400 border-gray-700"
                        >
                          +{internship.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{internship.duration}</span>
                      </div>
                      <div>
                        {internship.isCompleted
                          ? "Completed"
                          : `Deadline: ${formatDate(
                              internship.applicationDeadline
                            )}`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div
                className={`${
                  selectedInternship ? "" : "col-span-2"
                } p-8 text-center bg-black border border-gray-800 rounded-lg`}
              >
                <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-white">
                  No internships found
                </h3>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filters to find more
                  opportunities.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Internship Details */}
        {selectedInternship && (
          <div className="md:col-span-7 lg:col-span-8">
            <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] sticky top-4">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedInternship.title}
                    </h2>
                    <div className="flex items-center text-gray-400 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{selectedInternship.company}</span>
                      <span className="px-2">•</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {formatDate(selectedInternship.startDate)} -{" "}
                        {formatDate(selectedInternship.endDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      className={
                        selectedInternship.isPaid
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {selectedInternship.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                    <Badge
                      className={
                        selectedInternship.isCompleted
                          ? "bg-blue-500/20 text-blue-400"
                          : selectedInternship.isCurrentIntern
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {selectedInternship.isCompleted
                        ? "Completed"
                        : selectedInternship.isCurrentIntern
                        ? "Current"
                        : "Upcoming"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-900/30 p-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Duration</span>
                    <span className="text-white font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      {selectedInternship.duration}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Start Date</span>
                    <span className="text-white font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      {formatDate(selectedInternship.startDate)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      {selectedInternship.isPaid ? "Expected Salary" : "Unpaid"}
                    </span>
                    <span className="text-white font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      {selectedInternship.isPaid
                        ? selectedInternship.salary
                        : "Unpaid Internship"}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Description
                  </h3>
                  <p className="text-gray-400">
                    {selectedInternship.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.skills.map((skill, index) => (
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

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    <span className="block">
                      Posted on: {formatDate(selectedInternship.postedDate)}
                    </span>
                    <span className="block text-orange-400 font-medium">
                      Application Deadline:{" "}
                      {formatDate(selectedInternship.applicationDeadline)}
                    </span>
                  </div>
                  {!selectedInternship.isCompleted && (
                    <Button
                      onClick={handleApply}
                      className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Apply Now
                      </span>
                      <span className="relative invisible">Apply Now</span>
                    </Button>
                  )}
                  {selectedInternship.isCompleted && (
                    <Badge className="bg-blue-500/20 text-blue-400 px-4 py-2">
                      Internship Completed
                    </Badge>
                  )}
                </div>

                {/* Company Evaluation Section - Only for completed internships */}
                {selectedInternship.isCompleted && (
                  <div className="mt-8 border-t border-gray-800 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-white">
                        Company Evaluation
                      </h3>
                      <Button
                        onClick={() =>
                          openEvaluationModal(
                            getUserEvaluationForSelectedInternship()
                          )
                        }
                        variant="outline"
                        className="bg-black border-gray-700 text-white hover:bg-black hover:cursor-pointer hover:text-[#FF6F1B]"
                      >
                        {getUserEvaluationForSelectedInternship() ? (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit My Evaluation
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Evaluation
                          </>
                        )}
                      </Button>
                    </div>

                    {/* User's evaluation (if exists) */}
                    {getUserEvaluationForSelectedInternship() ? (
                      <div className="border border-[#FF6F1B]/30 bg-[#FF6F1B]/5 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-white flex items-center">
                            <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B] mr-2">
                              Your Evaluation
                            </Badge>
                            {
                              getUserEvaluationForSelectedInternship()
                                .studentName
                            }
                          </h4>
                          <div className="flex space-x-2">
                            <Badge
                              className={
                                getUserEvaluationForSelectedInternship()
                                  .recommended
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }
                            >
                              {getUserEvaluationForSelectedInternship()
                                .recommended ? (
                                <ThumbsUp className="h-3 w-3 mr-1" />
                              ) : (
                                <ThumbsDown className="h-3 w-3 mr-1" />
                              )}
                              {getUserEvaluationForSelectedInternship()
                                .recommended
                                ? "Recommended"
                                : "Not Recommended"}
                            </Badge>
                            <div className="flex">
                              <Button
                                variant="ghost"
                                className="h-6 w-6 p-0 text-gray-400 hover:text-[#FF6F1B] hover:bg-transparent"
                                onClick={() =>
                                  openEvaluationModal(
                                    getUserEvaluationForSelectedInternship()
                                  )
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-transparent"
                                onClick={() => {
                                  setCurrentEvaluation(
                                    getUserEvaluationForSelectedInternship()
                                  );
                                  setShowDeleteConfirm(true);
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {renderStars(
                            getUserEvaluationForSelectedInternship().rating
                          )}
                        </div>
                        <p className="text-gray-300">
                          {getUserEvaluationForSelectedInternship().comment}
                        </p>
                        <div className="text-xs text-gray-500 mt-2">
                          Posted on:{" "}
                          {new Date(
                            getUserEvaluationForSelectedInternship().date
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center bg-gray-900/30 p-6 rounded-lg">
                        <p className="text-gray-300">
                          You haven't evaluated this company yet. Share your
                          experience to help other students.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Application Documents Upload Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Apply for {selectedInternship?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Upload your documents to apply for this internship at{" "}
              {selectedInternship?.company}.
            </DialogDescription>
          </DialogHeader>

          {!applicationStatus ? (
            <div className="space-y-4 py-4">
              {/* CV Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center">
                  CV/Resume <span className="text-red-500 ml-1">*</span>
                </label>
                {!applicationDocs.cv ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FF6F1B] transition-all cursor-pointer">
                    <input
                      type="file"
                      id="cv-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, "cv")}
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Click to upload your CV or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC or DOCX (max. 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-[#FF6F1B]/10 border border-[#FF6F1B]/30 rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#FF6F1B] mr-2" />
                      <span className="text-white">
                        {applicationDocs.cv.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={() => handleRemoveFile("cv")}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Cover Letter Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Cover Letter (Optional)
                </label>
                {!applicationDocs.coverLetter ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FF6F1B] transition-all cursor-pointer">
                    <input
                      type="file"
                      id="cover-letter-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, "coverLetter")}
                    />
                    <label
                      htmlFor="cover-letter-upload"
                      className="cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Click to upload your Cover Letter
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC or DOCX (max. 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-[#FF6F1B]/10 border border-[#FF6F1B]/30 rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#FF6F1B] mr-2" />
                      <span className="text-white">
                        {applicationDocs.coverLetter.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={() => handleRemoveFile("coverLetter")}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Transcript Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Academic Transcript (Optional)
                </label>
                {!applicationDocs.transcript ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FF6F1B] transition-all cursor-pointer">
                    <input
                      type="file"
                      id="transcript-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "transcript")}
                    />
                    <label
                      htmlFor="transcript-upload"
                      className="cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Click to upload your Academic Transcript
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, JPG or PNG (max. 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-[#FF6F1B]/10 border border-[#FF6F1B]/30 rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#FF6F1B] mr-2" />
                      <span className="text-white">
                        {applicationDocs.transcript.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={() => handleRemoveFile("transcript")}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Additional Files */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Additional Documents (Optional)
                </label>
                {!applicationDocs.additional ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FF6F1B] transition-all cursor-pointer">
                    <input
                      type="file"
                      id="additional-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                      onChange={(e) => handleFileChange(e, "additional")}
                    />
                    <label
                      htmlFor="additional-upload"
                      className="cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Click to upload Additional Documents
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX, JPG, PNG or ZIP (max. 10MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-[#FF6F1B]/10 border border-[#FF6F1B]/30 rounded-lg p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#FF6F1B] mr-2" />
                      <span className="text-white">
                        {applicationDocs.additional.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={() => handleRemoveFile("additional")}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-start">
                <Paperclip className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-gray-400">
                  By submitting your application, you agree to our terms and
                  conditions. Your personal information will be processed
                  according to our privacy policy.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              {applicationStatus === "success" && (
                <>
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500/20 mb-4">
                    <Briefcase className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-400">
                    Your application for {selectedInternship?.title} at{" "}
                    {selectedInternship?.company} has been successfully
                    submitted.
                  </p>
                </>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {!applicationStatus ? (
              <>
                <Button
                  onClick={() => setIsApplyModalOpen(false)}
                  variant="outline"
                  className="bg-black border-gray-700 hover:bg-gray-800 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                  disabled={!applicationDocs.cv}
                >
                  Submit Application
                </Button>
              </>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Evaluation Modal */}
      <Dialog
        open={isEvaluationModalOpen}
        onOpenChange={setIsEvaluationModalOpen}
      >
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {currentEvaluation
                ? "Edit Your Evaluation"
                : "Add Company Evaluation"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Share your experience interning at {selectedInternship?.company}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Rating</label>
              <div className="flex items-center space-x-2">
                <Select
                  value={evaluationForm.rating.toString()}
                  onValueChange={(value) =>
                    setEvaluationForm({
                      ...evaluationForm,
                      rating: parseFloat(value),
                    })
                  }
                >
                  <SelectTrigger className="w-[120px] bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4.5">4.5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3.5">3.5 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2.5">2.5 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1.5">1.5 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex">{renderStars(evaluationForm.rating)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Would you recommend this company?
              </label>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() =>
                    setEvaluationForm({ ...evaluationForm, recommended: true })
                  }
                  variant={evaluationForm.recommended ? "default" : "outline"}
                  className={
                    evaluationForm.recommended
                      ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20"
                      : "bg-black border-gray-700 text-white"
                  }
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    setEvaluationForm({ ...evaluationForm, recommended: false })
                  }
                  variant={!evaluationForm.recommended ? "default" : "outline"}
                  className={
                    !evaluationForm.recommended
                      ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
                      : "bg-black border-gray-700 text-white"
                  }
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Your Evaluation
              </label>
              <Textarea
                value={evaluationForm.comment}
                onChange={(e) =>
                  setEvaluationForm({
                    ...evaluationForm,
                    comment: e.target.value,
                  })
                }
                placeholder="Share your experience, what you learned, and what you liked or didn't like about this company..."
                className="h-32 bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              onClick={() => setIsEvaluationModalOpen(false)}
              variant="outline"
              className="bg-black border-gray-700 hover:bg-gray-800 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEvaluationSubmit}
              className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
              disabled={!evaluationForm.comment.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              {currentEvaluation ? "Update" : "Submit"} Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Evaluation</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete your evaluation for{" "}
              {selectedInternship?.company}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between mt-4">
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              variant="outline"
              className="bg-black border-gray-700 hover:bg-gray-800 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteEvaluation}
              variant="destructive"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Internship Requirements Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Internship Requirements for Your Major
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Learn about the types of internships that count toward your degree
              requirements.
            </DialogDescription>
          </DialogHeader>

          <div className="aspect-video w-full bg-gray-900/70 rounded-md overflow-hidden">
            <div className="w-full h-full flex items-center justify-center relative">
              {/* This would be a real video player in production */}
              <div className="absolute inset-0 bg-[url('/assets/video-placeholder.jpg')] bg-cover bg-center opacity-50"></div>
              <div className="z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6F1B]/90 flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <h3 className="text-white font-medium">
                  Internship Requirements Video
                </h3>
                <p className="text-gray-300 text-sm mt-2">6:24</p>
                <p className="mt-4 text-sm text-gray-400 max-w-md mx-auto">
                  This video explains the specific internship requirements for
                  Computer Science, Engineering, Business and other majors at
                  GUC.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/30 p-4 rounded-lg mt-2">
            <h4 className="text-white font-medium flex items-center mb-2">
              <Info className="h-4 w-4 mr-2 text-[#FF6F1B]" />
              Key Requirements Summary
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Minimum 8 weeks (320 hours) professional experience</li>
              <li>
                • Must be with a registered company in your field of study
              </li>
              <li>
                • Remote internships are accepted with proper documentation
              </li>
              <li>
                • Requires supervisor evaluation and final report submission
              </li>
              <li>• Must be completed before your final semester</li>
            </ul>
            <p className="text-xs text-gray-400 mt-3">
              For specific requirements related to your major and semester,
              please consult with your academic advisor or the SCAD office.
            </p>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setIsVideoModalOpen(false)}
              variant="outline"
              className="bg-black border-gray-700 hover:bg-gray-800 text-white"
            >
              Close
            </Button>
            <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white">
              <Download className="h-4 w-4 mr-2" />
              Download Requirements PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
