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
  Info,
  Eye,
  Edit,
  Trash,
  Plus,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

export default function SCADInternshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [filterParams, setFilterParams] = useState({
    dateRange: "all",
    status: "all",
    industry: "all",
    duration: "all",
    isPaid: "all",
  });

  // Add state for internship cycle
  const [cycleStartDate, setCycleStartDate] = useState("2025-02-01");
  const [cycleEndDate, setCycleEndDate] = useState("2025-08-01");
  const [isEditingCycle, setIsEditingCycle] = useState(false);
  const [tempCycleStartDate, setTempCycleStartDate] = useState("");
  const [tempCycleEndDate, setTempCycleEndDate] = useState("");

  // Add state for info modal and management modals
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sample data for internships (same as student page)
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
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to handle cycle date changes
  const handleEditCycle = () => {
    setTempCycleStartDate(cycleStartDate);
    setTempCycleEndDate(cycleEndDate);
    setIsEditingCycle(true);
  };

  const handleSaveCycle = () => {
    // Validate dates
    const start = new Date(tempCycleStartDate);
    const end = new Date(tempCycleEndDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert("Please enter valid dates");
      return;
    }
    
    if (start >= end) {
      alert("End date must be after start date");
      return;
    }
    
    setCycleStartDate(tempCycleStartDate);
    setCycleEndDate(tempCycleEndDate);
    setIsEditingCycle(false);
  };

  const handleCancelCycleEdit = () => {
    setTempCycleStartDate(cycleStartDate);
    setTempCycleEndDate(cycleEndDate);
    setIsEditingCycle(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Internships</h1>
          <p className="text-gray-400">
            Create, edit, and manage SCAD-approved internship opportunities
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
            onClick={() => setIsInfoModalOpen(true)}
          >
            <Info className="h-4 w-4 mr-2" />
            Program Info
          </Button>
          <Button
            className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Internship
          </Button>
        </div>
      </div>

      {/* Current Internship Cycle Card */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white">Current Internship Cycle</h3>
              <p className="text-gray-400 text-sm mt-1">
                Active internship period for all listed opportunities
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#FF6F1B]/10 text-[#FF6F1B] px-4 py-2 rounded-md flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(cycleStartDate)} - {formatDate(cycleEndDate)}</span>
              </div>
              <Button
                variant="outline"
                className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                onClick={() => setIsInfoModalOpen(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Manage Cycle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-black border-gray-800 shadow-s">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by job title or organization name"
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
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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

                <div className="mt-8 border-t border-gray-800 pt-6">
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
                    <div className="flex gap-3">
                      <Button
                        className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                        onClick={() => setIsEditModalOpen(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Internship
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-black border-red-700 text-red-500 hover:bg-red-950 hover:text-red-400"
                        onClick={() => setIsDeleteModalOpen(true)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Info Modal */}
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="bg-black border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              SCAD Internship Program Information
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Information about the SCAD-approved internship program
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Current Cycle Section */}
            <div className="border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-white">Current Internship Cycle</h4>
                {!isEditingCycle ? (
                  <Button
                    variant="outline"
                    className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                    onClick={handleEditCycle}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Cycle Dates
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-black border-gray-700 text-white hover:bg-gray-800"
                      onClick={handleCancelCycleEdit}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                      onClick={handleSaveCycle}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Cycle
                    </Button>
                  </div>
                )}
              </div>
              
              {!isEditingCycle ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Start Date</p>
                    <p className="text-white font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#FF6F1B]" /> 
                      {formatDate(cycleStartDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">End Date</p>
                    <p className="text-white font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#FF6F1B]" /> 
                      {formatDate(cycleEndDate)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">Start Date</label>
                    <Input
                      type="date"
                      className="bg-black border-gray-700 text-white"
                      value={tempCycleStartDate}
                      onChange={(e) => setTempCycleStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-1">End Date</label>
                    <Input
                      type="date"
                      className="bg-black border-gray-700 text-white"
                      value={tempCycleEndDate}
                      onChange={(e) => setTempCycleEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-4 bg-[#FF6F1B]/10 p-3 rounded-md">
                <p className="text-sm text-[#FF6F1B]">
                  <Info className="h-4 w-4 inline-block mr-1" />
                  Setting the cycle dates helps organize internships and filters in the system. All internships should fall within the current cycle.
                </p>
              </div>
            </div>

            <p className="text-white">
              The SCAD Internship Program connects companies with qualified
              students for internship opportunities. As a SCAD administrator,
              you have full control over creating, editing, and managing these
              internships.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Program Benefits:</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Quality control of internship postings</li>
                <li>Pre-screening of student applicants</li>
                <li>Centralized management of internship process</li>
                <li>Reports and analytics on program effectiveness</li>
                <li>Direct liaison between companies and students</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
              onClick={() => {
                if (isEditingCycle) {
                  setIsEditingCycle(false);
                }
                setIsInfoModalOpen(false);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Internship Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-black border border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Create New Internship
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new SCAD-approved internship opportunity
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Modal content would go here */}
            <p className="text-gray-400">
              Internship creation form would go here
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white">
              Create Internship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Internship Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-black border border-gray-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Edit Internship
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Modify this internship's details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Modal content would go here */}
            <p className="text-gray-400">Internship edit form would go here</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-black border border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Delete Internship
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this internship?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-white">
            <p>
              This action cannot be undone. This will permanently delete the
              internship and remove it from the system.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Delete Internship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
