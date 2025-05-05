"use client";

import { useState } from "react";
import {
  BarChart3,
  Users,
  FileText,
  PlusCircle,
  Search,
  Calendar,
  ChevronRight,
  Briefcase,
  Clock,
  Home,
  LayoutDashboard,
  FileEdit,
  UserCircle,
  LogOut,
  Menu,
  ChevronDown,
  Filter,
  Eye,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Upload,
  UserCheck,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CompanySidebar from "@/components/company-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function CompanyDashboard() {
  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    name: "ABC Corporation",
    industry: "Technology",
    size: "medium",
    email: "hr@abccorp.com",
    logo: "/placeholder-logo.png",
    verified: true,
  });

  // Posts State (Requirement 3-8)
  const [internshipPosts, setInternshipPosts] = useState([
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
  ]);

  // Applications State (Requirement 9-12)
  const [applications, setApplications] = useState([
    {
      id: 1,
      postId: 1,
      postTitle: "Backend Developer Intern",
      studentName: "John Doe",
      studentId: "28-12345",
      university: "GUC",
      faculty: "MET",
      gpa: 3.7,
      resumeUrl: "/resumes/johndoe.pdf",
      appliedDate: "2025-02-20",
      status: "pending", // pending, interviewing, accepted, rejected, finalized
    },
    {
      id: 2,
      postId: 1,
      postTitle: "Backend Developer Intern",
      studentName: "Sarah Ahmed",
      studentId: "28-67890",
      university: "GUC",
      faculty: "MET",
      gpa: 3.9,
      resumeUrl: "/resumes/sarah.pdf",
      appliedDate: "2025-02-21",
      status: "interviewing",
    },
    {
      id: 3,
      postId: 2,
      postTitle: "Frontend Intern",
      studentName: "Amal S.",
      studentId: "29-54321",
      university: "GUC",
      faculty: "MET",
      gpa: 3.5,
      resumeUrl: "/resumes/amal.pdf",
      appliedDate: "2025-02-05",
      status: "accepted",
    },
    {
      id: 4,
      postId: 3,
      postTitle: "Data Analyst Intern",
      studentName: "Kareem M.",
      studentId: "27-13579",
      university: "GUC",
      faculty: "IET",
      gpa: 3.8,
      resumeUrl: "/resumes/kareem.pdf",
      appliedDate: "2025-02-15",
      status: "finalized",
    },
    {
      id: 5,
      postId: 4,
      postTitle: "Marketing Intern",
      studentName: "Layla F.",
      studentId: "30-24680",
      university: "AUC",
      faculty: "Business",
      gpa: 3.6,
      resumeUrl: "/resumes/layla.pdf",
      appliedDate: "2025-01-25",
      status: "rejected",
    },
  ]);

  // Current Interns State (Requirement 13-18)
  const [interns, setInterns] = useState([
    {
      id: 1,
      name: "Amal S.",
      studentId: "29-54321",
      role: "Frontend Intern",
      startDate: "2025-03-01",
      endDate: "2025-09-01",
      daysLeft: 145,
      progress: 25,
      status: "current", // current, complete
      evaluation: null,
    },
    {
      id: 2,
      name: "Kareem M.",
      studentId: "27-13579",
      role: "Data Analyst Intern",
      startDate: "2025-03-15",
      endDate: "2025-07-15",
      daysLeft: 98,
      progress: 33,
      status: "current",
      evaluation: null,
    },
    {
      id: 3,
      name: "Mohammed H.",
      studentId: "28-97531",
      role: "UX Design Intern",
      startDate: "2025-01-10",
      endDate: "2025-02-10",
      daysLeft: 0,
      progress: 100,
      status: "complete",
      evaluation: {
        performance: 4, // 1-5 rating
        punctuality: 5,
        teamwork: 4,
        skills: 4,
        comments:
          "Mohammed showed excellent design skills and was a valuable team member. Always on time and professional.",
      },
    },
    {
      id: 4,
      name: "Fatima Z.",
      studentId: "29-86420",
      role: "Content Writer Intern",
      startDate: "2025-01-15",
      endDate: "2025-02-15",
      daysLeft: 0,
      progress: 100,
      status: "complete",
      evaluation: {
        performance: 3,
        punctuality: 3,
        teamwork: 4,
        skills: 4,
        comments:
          "Fatima produced good quality content but sometimes missed deadlines. Collaborated well with the marketing team.",
      },
    },
  ]);

  // Documents State (Requirement 1)
  const [companyDocuments, setCompanyDocuments] = useState([
    {
      id: 1,
      name: "Business Registration",
      fileUrl: "/documents/business-reg.pdf",
      uploadDate: "2025-01-05",
      status: "verified",
    },
    {
      id: 2,
      name: "Tax Certificate",
      fileUrl: "/documents/tax-cert.pdf",
      uploadDate: "2025-01-05",
      status: "verified",
    },
  ]);

  // Notifications State (Requirement 2, 4)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      message: "New application from John Doe for Backend Developer Intern",
      date: "2025-02-20",
      read: false,
    },
    {
      id: 2,
      type: "verification",
      message: "Your company profile has been verified by SCAD office",
      date: "2025-01-10",
      read: true,
    },
    {
      id: 3,
      type: "application",
      message: "New application from Sarah Ahmed for Backend Developer Intern",
      date: "2025-02-21",
      read: false,
    },
  ]);

  // UI State
  const [activeItem, setActiveItem] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [filterParams, setFilterParams] = useState({
    posts: {
      status: "all",
      duration: "all",
    },
    applications: {
      postId: "all",
      status: "all",
    },
    interns: {
      status: "all",
    },
  });

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

  const handleApplicationFilter = () => {
    let filtered = [...applications];

    // Filter by post
    if (filterParams.applications.postId !== "all") {
      filtered = filtered.filter(
        (app) => app.postId === parseInt(filterParams.applications.postId)
      );
    }

    // Filter by status
    if (filterParams.applications.status !== "all") {
      filtered = filtered.filter(
        (app) => app.status === filterParams.applications.status
      );
    }

    return filtered;
  };

  const handleInternSearch = () => {
    // Filter interns by name or job title
    if (!searchTerm) {
      let filtered = [...interns];
      if (filterParams.interns.status !== "all") {
        filtered = filtered.filter(
          (intern) => intern.status === filterParams.interns.status
        );
      }
      return filtered;
    }

    return interns.filter(
      (intern) =>
        (intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          intern.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterParams.interns.status === "all" ||
          intern.status === filterParams.interns.status)
    );
  };

  const updateApplicationStatus = (appId, newStatus) => {
    // Update application status
    const updatedApplications = applications.map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);

    // If status is finalized or accepted, check if we need to add to interns
    const app = applications.find((app) => app.id === appId);
    if (
      newStatus === "finalized" &&
      !interns.some((intern) => intern.studentId === app.studentId)
    ) {
      // Add to interns
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3); // Default 3 month internship

      const newIntern = {
        id: interns.length + 1,
        name: app.studentName,
        studentId: app.studentId,
        role: app.postTitle,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        daysLeft: 90,
        progress: 0,
        status: "current",
        evaluation: null,
      };
      setInterns([...interns, newIntern]);
    }
  };

  const updateInternStatus = (internId, newStatus) => {
    // Update intern status
    const updatedInterns = interns.map((intern) =>
      intern.id === internId ? { ...intern, status: newStatus } : intern
    );
    setInterns(updatedInterns);
  };

  const saveEvaluation = (internId, evaluation) => {
    // Save intern evaluation
    const updatedInterns = interns.map((intern) =>
      intern.id === internId ? { ...intern, evaluation } : intern
    );
    setInterns(updatedInterns);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "interviewing":
        return "bg-blue-500/20 text-blue-400";
      case "accepted":
        return "bg-green-500/20 text-green-400";
      case "finalized":
        return "bg-purple-500/20 text-purple-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      case "active":
        return "bg-green-500/20 text-green-400";
      case "filled":
        return "bg-blue-500/20 text-blue-400";
      case "current":
        return "bg-green-500/20 text-green-400";
      case "complete":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex">
      <CompanySidebar
        activeItem={activeItem}
        onNavigate={(item) => setActiveItem(item)}
      />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-black">
        {/* Header */}
        {/* <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">
              {activeItem === "dashboard" && "Dashboard"}
              {activeItem === "create" && "Create Internship"}
              {activeItem === "posts" && "Manage Posts"}
              {activeItem === "applications" && "Applications"}
              {activeItem === "profile" && "Company Profile"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 bg-gray-900 border-gray-700 text-white rounded-lg w-64 focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                placeholder="Search..."
              />
            </div>

            <Button className="bg-gray-900 border border-gray-700 text-white hover:bg-gray-800">
              <Calendar className="mr-2 h-4 w-4" /> Today
            </Button>

            <div className="flex items-center ml-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white font-bold mr-2">
                A
              </div>
              <span className="text-white mr-1">ABC Corp</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </header> */}

        {/* Dashboard content */}
        <main className="p-6">
          {/* Dashboard View */}
          {activeItem === "dashboard" && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 mb-1 text-sm">
                          Active Posts
                        </p>
                        <h2 className="text-3xl font-bold text-white">
                          {
                            internshipPosts.filter(
                              (post) => post.status === "active"
                            ).length
                          }
                        </h2>
                        <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                          {internshipPosts.length} total posts
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                        <FileText className="text-[#FF6F1B]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 mb-1 text-sm">
                          New Applications
                        </p>
                        <h2 className="text-3xl font-bold text-white">
                          {
                            applications.filter(
                              (app) => app.status === "pending"
                            ).length
                          }
                        </h2>
                        <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                          {applications.length} total applications
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                        <Users className="text-[#FF6F1B]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 mb-1 text-sm">
                          Current Interns
                        </p>
                        <h2 className="text-3xl font-bold text-white">
                          {
                            interns.filter(
                              (intern) => intern.status === "current"
                            ).length
                          }
                        </h2>
                        <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                          {
                            interns.filter(
                              (intern) => intern.status === "complete"
                            ).length
                          }{" "}
                          completed
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                        <Briefcase className="text-[#FF6F1B]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 mb-1 text-sm">
                          Notifications
                        </p>
                        <h2 className="text-3xl font-bold text-white">
                          {notifications.filter((n) => !n.read).length}
                        </h2>
                        <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                          {notifications.length} total
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                        <Mail className="text-[#FF6F1B]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Applications */}
              <Card className="bg-black border-gray-800 shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                      Recent Applications
                    </h3>
                    <Button
                      variant="outline"
                      className="border-gray-700 bg-[#FF6F1B] text-white hover:text-white cursor-pointer hover:bg-black"
                      onClick={() => setActiveItem("applications")}
                    >
                      View all
                      <ChevronRight className=" h-4 w-4" />
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-black">
                          <th className="py-4 px-6 font-medium text-[#FF6F1B]">
                            Name
                          </th>
                          <th className="py-4 px-6 font-medium text-[#FF6F1B]">
                            Position
                          </th>
                          <th className="py-4 px-6 font-medium text-[#FF6F1B]">
                            Status
                          </th>
                          <th className="py-4 px-6 font-medium text-[#FF6F1B]">
                            Applied Date
                          </th>
                          <th className="py-4 px-6 font-medium text-[#FF6F1B]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.slice(0, 5).map((app) => (
                          <tr
                            key={app.id}
                            className="border-t  border-gray-800  transition-colors"
                          >
                            <td className="py-4 px-6 text-white">
                              {app.studentName}
                            </td>
                            <td className="py-4 px-6 text-white">
                              {app.postTitle}
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  app.status
                                )}`}
                              >
                                {app.status.charAt(0).toUpperCase() +
                                  app.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-gray-400">
                              {app.appliedDate}
                            </td>
                            <td className="py-4 px-6">
                              <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 text-white bg-[#FF6F1B]/25 hover:cursor-pointer border border-gray-800 hover:text-white hover:bg-black rounded-full"
                                onClick={() => {
                                  setSelectedApplication(app);
                                  setActiveItem("applications");
                                }}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Current Interns */}
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">
                      Current Interns
                    </h3>
                    <Button
                      variant="outline"
                      className="border-gray-700 bg-[#FF6F1B] text-white hover:text-white cursor-pointer hover:bg-black"
                      onClick={() => setActiveItem("interns")}
                    >
                      View all <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {interns
                      .filter((intern) => intern.status === "current")
                      .slice(0, 2)
                      .map((intern) => (
                        <div
                          key={intern.id}
                          className="border border-gray-800 bg-black p-6 rounded-lg hover:border-gray-700 hover:shadow-[#FF6F1B]/10 transition-all"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-white">
                                {intern.name}
                              </h4>
                              <div className="flex items-center mt-1">
                                <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                                <p className="text-sm text-gray-400">
                                  {intern.role}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`flex items-center ${
                                intern.daysLeft < 20
                                  ? "text-[#EC1024]"
                                  : "text-[#FF6F1B]"
                              }`}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="text-sm font-medium">
                                {intern.daysLeft} days left
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">
                                Progress
                              </span>
                              <span className="text-sm font-medium text-white">
                                {intern.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"
                                style={{ width: `${intern.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-gray-800">
                    <h3 className="text-xl font-bold text-white">
                      Recent Notifications
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 ${
                          !notification.read ? "bg-gray-800/20" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`p-2 rounded-full ${
                              notification.type === "application"
                                ? "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                                : notification.type === "verification"
                                ? "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                                : "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                            } mr-4`}
                          >
                            {notification.type === "application" ? (
                              <Users className="h-5 w-5" />
                            ) : notification.type === "verification" ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <AlertCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-white">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.date}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Posts Management View */}
          {activeItem === "posts" && (
            <div className="space-y-6">
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
                    value={filterParams.posts.status}
                    onValueChange={(value) =>
                      setFilterParams({
                        ...filterParams,
                        posts: { ...filterParams.posts, status: value },
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
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90 shadow-lg hover:shadow-[#FF6F1B]/20 transition-all">
                  <PlusCircle className="mr-2 h-5 w-5" /> Create New Internship
                </Button>
              </div>

              {/* Posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {handlePostSearch()
                  .filter(
                    (post) =>
                      filterParams.posts.status === "all" ||
                      post.status === filterParams.posts.status
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
                              {post.status}
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
                          <Button
                            variant="ghost"
                            className="text-white bg-[#FF6F1B]/25 hover:bg-black border border-gray-800 hover:cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-2" /> View
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-white bg-[#FF6F1B]/25 hover:bg-black border border-gray-800 hover:cursor-pointer"
                          >
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-white bg-[#FF6F1B]/25 hover:bg-black border border-gray-800 hover:cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Create/Edit Post Form - Toggle visibility based on state */}
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-10 hidden">
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-3xl">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Create New Internship
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">
                        Title
                      </label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="e.g. Frontend Developer Intern"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">
                        Description
                      </label>
                      <Textarea
                        className="bg-gray-800 border-gray-700 text-white h-32"
                        placeholder="Describe the internship role, responsibilities, and requirements..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-400 block mb-2">
                          Duration
                        </label>
                        <Input
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="e.g. 3 months"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-400 block mb-2">
                          Compensation
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="isPaid"
                              className="rounded text-[#FF6F1B] bg-gray-800 border-gray-700"
                            />
                            <label htmlFor="isPaid" className="text-white">
                              Paid Internship
                            </label>
                          </div>

                          <Input
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="e.g. $1000/month"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">
                        Required Skills (comma separated)
                      </label>
                      <Input
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="e.g. JavaScript, React, CSS"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white">
                        Save Internship
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Management View */}
          {activeItem === "applications" && (
            <div className="space-y-6">
              {/* Filter controls */}
              <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="flex-1">
                  <label className="text-sm text-gray-400 block mb-1">
                    Filter by Position
                  </label>
                  <Select
                    value={filterParams.applications.postId}
                    onValueChange={(value) =>
                      setFilterParams({
                        ...filterParams,
                        applications: {
                          ...filterParams.applications,
                          postId: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all">All Positions</SelectItem>
                      {internshipPosts.map((post) => (
                        <SelectItem key={post.id} value={post.id.toString()}>
                          {post.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-gray-400 block mb-1">
                    Filter by Status
                  </label>
                  <Select
                    value={filterParams.applications.status}
                    onValueChange={(value) =>
                      setFilterParams({
                        ...filterParams,
                        applications: {
                          ...filterParams.applications,
                          status: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="interviewing">Interviewing</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="finalized">Finalized</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-gray-400 block mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10 bg-gray-800 border-gray-700 text-white rounded-lg"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Applications list and detail view */}
              <div className="flex gap-6">
                {/* List view */}
                <div
                  className={`${
                    selectedApplication ? "hidden md:block md:w-1/2" : "w-full"
                  }`}
                >
                  <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-gray-800">
                        <h3 className="text-lg font-semibold text-white">
                          Applications
                        </h3>
                        <p className="text-sm text-gray-400">
                          {handleApplicationFilter().length} applications found
                        </p>
                      </div>

                      <div className="divide-y divide-gray-800 max-h-[700px] overflow-y-auto">
                        {searchTerm
                          ? handleApplicationFilter()
                              .filter((app) =>
                                app.studentName
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              )
                              .map((app) => (
                                <ApplicationItem
                                  key={app.id}
                                  application={app}
                                  isSelected={
                                    selectedApplication?.id === app.id
                                  }
                                  onClick={() => setSelectedApplication(app)}
                                  getStatusColor={getStatusColor}
                                />
                              ))
                          : handleApplicationFilter().map((app) => (
                              <ApplicationItem
                                key={app.id}
                                application={app}
                                isSelected={selectedApplication?.id === app.id}
                                onClick={() => setSelectedApplication(app)}
                                getStatusColor={getStatusColor}
                              />
                            ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detail view */}
                {selectedApplication && (
                  <div className="w-full md:w-1/2">
                    <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h2 className="text-xl font-bold text-white">
                              {selectedApplication.studentName}
                            </h2>
                            <p className="text-gray-400">
                              {selectedApplication.postTitle}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            className="text-white bg-[#FF6F1B]/25 hover:bg-black border border-gray-800 hover:cursor-pointer rounded-full"
                            onClick={() => setSelectedApplication(null)}
                          >
                            <XCircle className="h-5 w-5" />
                          </Button>
                        </div>

                        {/* Status badges */}
                        <div className="flex items-center gap-3 mb-6">
                          <Badge
                            className={getStatusColor(
                              selectedApplication.status
                            )}
                          >
                            {selectedApplication.status
                              .charAt(0)
                              .toUpperCase() +
                              selectedApplication.status.slice(1)}
                          </Badge>
                          <div className="text-sm text-gray-400">
                            Applied on: {selectedApplication.appliedDate}
                          </div>
                        </div>

                        {/* Student details */}
                        <div className="grid grid-cols-2 gap-4 bg-black p-4 rounded-lg border border-gray-800 mb-6">
                          <div>
                            <p className="text-sm text-gray-500">Student ID</p>
                            <p className="text-white">
                              {selectedApplication.studentId}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">University</p>
                            <p className="text-white">
                              {selectedApplication.university}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Faculty</p>
                            <p className="text-white">
                              {selectedApplication.faculty}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">GPA</p>
                            <p className="text-white">
                              {selectedApplication.gpa}
                            </p>
                          </div>
                        </div>

                        {/* Resume */}
                        <div className="mb-6">
                          <h3 className="font-medium text-white mb-2">
                            Resume
                          </h3>
                          <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
                            <div className="flex items-center">
                              <FileText className="text-[#FF6F1B] mr-3 h-5 w-5" />
                              <span className="text-white">
                                {selectedApplication.studentName} - Resume.pdf
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              className="border-gray-700 text-white hover:bg-black bg-[#FF6F1B]/25 hover:cursor-pointer"
                            >
                              View
                            </Button>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-gray-800 pt-6 flex justify-between items-center">
                          <h3 className="font-medium text-white">
                            Update Status
                          </h3>

                          {selectedApplication.status === "pending" && (
                            <div className="flex gap-3">
                              <Button
                                className="bg-black text-white hover:bg-black border border-gray-800 hover:text-[#FF6F1B]"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "interviewing"
                                  )
                                }
                              >
                                Interview
                              </Button>
                              <Button
                                className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "accepted"
                                  )
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                className="bg-black text-[#EC1024] hover:bg-black border border-gray-800"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          )}

                          {selectedApplication.status === "interviewing" && (
                            <div className="flex gap-3">
                              <Button
                                className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "accepted"
                                  )
                                }
                              >
                                Accept
                              </Button>
                              <Button
                                className="bg-black text-[#EC1024] hover:bg-black border border-gray-800"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          )}

                          {selectedApplication.status === "accepted" && (
                            <div className="flex gap-3">
                              <Button
                                className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "finalized"
                                  )
                                }
                              >
                                Finalize
                              </Button>
                              <Button
                                className="bg-black text-[#EC1024] hover:bg-black border border-gray-800"
                                onClick={() =>
                                  updateApplicationStatus(
                                    selectedApplication.id,
                                    "rejected"
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </div>
                          )}

                          {(selectedApplication.status === "finalized" ||
                            selectedApplication.status === "rejected") && (
                            <div>
                              <Badge
                                className={getStatusColor(
                                  selectedApplication.status
                                )}
                              >
                                {selectedApplication.status === "finalized"
                                  ? "Finalized"
                                  : "Rejected"}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interns Management View */}
          {activeItem === "interns" && (
            <div className="space-y-6">
              {/* Tabs and filters */}
              <div className="bg-black rounded-lg border border-gray-800 p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <Tabs
                    defaultValue="all"
                    className="w-full md:w-auto"
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="bg-black border border-gray-800 text-gray-400">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-[#FF6F1B] data-[state=active]:text-white"
                      >
                        All Interns
                      </TabsTrigger>
                      <TabsTrigger
                        value="current"
                        className="data-[state=active]:bg-[#FF6F1B] data-[state=active]:text-white"
                      >
                        Current
                      </TabsTrigger>
                      <TabsTrigger
                        value="completed"
                        className="data-[state=active]:bg-[#FF6F1B] data-[state=active]:text-white"
                      >
                        Completed
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                        placeholder="Search by name or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Interns list and detail view */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* List of interns */}
                <Card
                  className={`bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] ${
                    selectedIntern ? "w-full md:w-1/3" : "w-full"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-800">
                      <h3 className="font-semibold text-white">
                        {activeTab === "current"
                          ? "Current Interns"
                          : activeTab === "completed"
                          ? "Completed Internships"
                          : "All Interns"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {
                          handleInternSearch().filter(
                            (intern) =>
                              activeTab === "all" ||
                              (activeTab === "current" &&
                                intern.status === "current") ||
                              (activeTab === "completed" &&
                                intern.status === "complete")
                          ).length
                        }{" "}
                        interns found
                      </p>
                    </div>

                    <div className="divide-y divide-gray-800 max-h-[700px] overflow-y-auto">
                      {handleInternSearch()
                        .filter(
                          (intern) =>
                            activeTab === "all" ||
                            (activeTab === "current" &&
                              intern.status === "current") ||
                            (activeTab === "completed" &&
                              intern.status === "complete")
                        )
                        .map((intern) => (
                          <div
                            key={intern.id}
                            className={`p-4 cursor-pointer hover:bg-gray-800/50 ${
                              selectedIntern?.id === intern.id
                                ? "bg-gray-800/80 border-l-4 border-l-[#FF6F1B]"
                                : ""
                            }`}
                            onClick={() => setSelectedIntern(intern)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-white">
                                {intern.name}
                              </h4>
                              <Badge className={getStatusColor(intern.status)}>
                                {intern.status === "current"
                                  ? "Active"
                                  : "Completed"}
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">
                              {intern.role}
                            </p>

                            {intern.status === "current" ? (
                              <div className="mt-2">
                                <div className="flex justify-between items-center mb-1 text-xs">
                                  <span className="text-gray-400">
                                    Progress
                                  </span>
                                  <span className="text-white">
                                    {intern.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5">
                                  <div
                                    className="h-1.5 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"
                                    style={{ width: `${intern.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center text-xs mt-2">
                                <Star
                                  className={`h-3 w-3 mr-1 ${
                                    intern.evaluation
                                      ? "text-[#FF6F1B]"
                                      : "text-gray-600"
                                  }`}
                                />
                                <span
                                  className={
                                    intern.evaluation
                                      ? "text-gray-300"
                                      : "text-gray-600"
                                  }
                                >
                                  {intern.evaluation
                                    ? "Evaluation completed"
                                    : "No evaluation"}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Intern details */}
                {selectedIntern && (
                  <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] w-full md:w-2/3">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-white">
                            {selectedIntern.name}
                          </h2>
                          <p className="text-gray-400">{selectedIntern.role}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            className="text-white bg-[#FF6F1B]/25 hover:bg-black border border-gray-800 hover:cursor-pointer rounded-full"
                            onClick={() => setSelectedIntern(null)}
                          >
                            <XCircle className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      {/* Status badge and controls */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={getStatusColor(selectedIntern.status)}
                          >
                            {selectedIntern.status === "current"
                              ? "Active"
                              : "Completed"}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {selectedIntern.startDate} to{" "}
                            {selectedIntern.endDate}
                          </span>
                        </div>

                        {selectedIntern.status === "current" && (
                          <Button
                            className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90"
                            onClick={() =>
                              updateInternStatus(selectedIntern.id, "complete")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Mark as
                            Completed
                          </Button>
                        )}
                      </div>

                      {/* Intern details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black border border-gray-800 p-4 rounded-lg mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Student ID</p>
                          <p className="text-white">
                            {selectedIntern.studentId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Role</p>
                          <p className="text-white">{selectedIntern.role}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="text-white">
                            {selectedIntern.startDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">End Date</p>
                          <p className="text-white">{selectedIntern.endDate}</p>
                        </div>
                      </div>

                      {/* Progress for current interns */}
                      {selectedIntern.status === "current" && (
                        <div className="mb-6">
                          <h3 className="font-medium text-white mb-2">
                            Internship Progress
                          </h3>

                          <div className="bg-black border border-gray-800 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                                <span className="text-gray-400">
                                  {selectedIntern.daysLeft} days remaining
                                </span>
                              </div>
                              <span className="text-white font-medium">
                                {selectedIntern.progress}% complete
                              </span>
                            </div>

                            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
                              <div
                                className="h-2.5 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"
                                style={{ width: `${selectedIntern.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Evaluation section */}
                      {selectedIntern.status === "complete" && (
                        <div className="mb-6">
                          <h3 className="font-medium text-white mb-4">
                            Performance Evaluation
                          </h3>

                          {selectedIntern.evaluation ? (
                            <div className="bg-black border border-gray-800 p-4 rounded-lg">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Performance
                                  </p>
                                  <div className="flex mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-5 w-5 ${
                                          star <=
                                          selectedIntern.evaluation.performance
                                            ? "text-[#FF6F1B]"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Punctuality
                                  </p>
                                  <div className="flex mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-5 w-5 ${
                                          star <=
                                          selectedIntern.evaluation.punctuality
                                            ? "text-[#FF6F1B]"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Teamwork
                                  </p>
                                  <div className="flex mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-5 w-5 ${
                                          star <=
                                          selectedIntern.evaluation.teamwork
                                            ? "text-[#FF6F1B]"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Skills
                                  </p>
                                  <div className="flex mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-5 w-5 ${
                                          star <=
                                          selectedIntern.evaluation.skills
                                            ? "text-[#FF6F1B]"
                                            : "text-gray-600"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4">
                                <p className="text-sm text-gray-500 mb-1">
                                  Comments
                                </p>
                                <p className="text-white bg-gray-800 p-3 rounded">
                                  {selectedIntern.evaluation.comments}
                                </p>
                              </div>

                              <div className="flex justify-end mt-4">
                                <Button
                                  variant="outline"
                                  className="border-gray-700 text-white bg-[#FF6F1B]/25 hover:bg-black"
                                >
                                  <Edit className="h-4 w-4 mr-2" /> Edit
                                  Evaluation
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-black border border-gray-800 p-6 rounded-lg">
                              <div className="text-center mb-4">
                                <Star className="h-12 w-12 mx-auto text-[#FF6F1B]/50 mb-2" />
                                <h4 className="text-white font-medium">
                                  No Evaluation Yet
                                </h4>
                                <p className="text-gray-400 text-sm">
                                  Create an evaluation for this intern.
                                </p>
                              </div>

                              <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm text-gray-400 block mb-1">
                                      Performance
                                    </label>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className="h-6 w-6 cursor-pointer text-gray-600 hover:text-[#FF6F1B]"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400 block mb-1">
                                      Punctuality
                                    </label>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className="h-6 w-6 cursor-pointer text-gray-600 hover:text-[#FF6F1B]"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400 block mb-1">
                                      Teamwork
                                    </label>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className="h-6 w-6 cursor-pointer text-gray-600 hover:text-[#FF6F1B]"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm text-gray-400 block mb-1">
                                      Skills
                                    </label>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className="h-6 w-6 cursor-pointer text-gray-600 hover:text-[#FF6F1B]"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm text-gray-400 block mb-1">
                                    Comments
                                  </label>
                                  <Textarea
                                    className="bg-gray-800 border-gray-700 text-white h-24"
                                    placeholder="Write detailed feedback about the intern's performance..."
                                  />
                                </div>

                                <div className="flex justify-end pt-2">
                                  <Button
                                    className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      // In a real implementation, you'd gather the form data
                                      saveEvaluation(selectedIntern.id, {
                                        performance: 4,
                                        punctuality: 5,
                                        teamwork: 4,
                                        skills: 4,
                                        comments:
                                          "Excellent performance. The intern was dedicated and showed great skills.",
                                      });
                                    }}
                                  >
                                    Save Evaluation
                                  </Button>
                                </div>
                              </form>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Company Profile View */}
          {activeItem === "profile" && (
            <div className="space-y-8">
              {/* Company Information */}
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Company Information
                    </h3>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-white bg-[#FF6F1B]/25 hover:bg-black hover:cursor-pointer"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Logo */}
                    <div className="md:w-1/3">
                      <div className="aspect-square w-full max-w-[200px] mx-auto md:mx-0 bg-black rounded-xl flex items-center justify-center border border-gray-700 overflow-hidden relative">
                        {companyProfile.logo ? (
                          <div className="relative w-full h-full">
                            {/* This would be an actual image in production */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                              {companyProfile.name.charAt(0)}
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-500 flex flex-col items-center">
                            <Upload className="h-8 w-8 mb-2" />
                            <span>Upload Logo</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-center md:justify-start">
                        <Button className="bg-black text-white hover:bg-black hover:text-[#FF6F1B] w-full max-w-[200px] border border-gray-800">
                          <Upload className="h-4 w-4 mr-2" /> Change Logo
                        </Button>
                      </div>

                      <div className="mt-6">
                        {companyProfile.verified ? (
                          <div className="flex items-center bg-[#FF6F1B]/10 text-[#FF6F1B] p-3 rounded-lg">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span>Verified Company</span>
                          </div>
                        ) : (
                          <div className="flex items-center bg-[#EC1024]/10 text-[#EC1024] p-3 rounded-lg">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span>Verification Pending</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Company details */}
                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            Company Name
                          </label>
                          <Input
                            className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                            value={companyProfile.name}
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            Industry
                          </label>
                          <Input
                            className="bg-gray-800 border-gray-700 text-white"
                            value={companyProfile.industry}
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            Company Size
                          </label>
                          <Select defaultValue={companyProfile.size} disabled>
                            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="small">
                                Small (50 employees or less)
                              </SelectItem>
                              <SelectItem value="medium">
                                Medium (51-100 employees)
                              </SelectItem>
                              <SelectItem value="large">
                                Large (101-500 employees)
                              </SelectItem>
                              <SelectItem value="corporate">
                                Corporate (500+ employees)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            Company Email
                          </label>
                          <Input
                            className="bg-gray-800 border-gray-700 text-white"
                            value={companyProfile.email}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="text-sm text-gray-400 block mb-1">
                          Company Description
                        </label>
                        <Textarea
                          className="bg-gray-800 border-gray-700 text-white h-24"
                          placeholder="No company description provided."
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Documents */}
              <Card className="bg-gray-900 border-gray-800 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">
                      Company Documents
                    </h3>
                    <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white">
                      <Upload className="h-4 w-4 mr-2" /> Upload Document
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {companyDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="flex items-center">
                          <FileText className="text-gray-400 mr-3 h-5 w-5" />
                          <div>
                            <p className="text-white">{doc.name}</p>
                            <p className="text-xs text-gray-400">
                              Uploaded on {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.status === "verified" && (
                            <Badge className="bg-green-500/20 text-green-400">
                              Verified
                            </Badge>
                          )}
                          {doc.status === "pending" && (
                            <Badge className="bg-yellow-500/20 text-yellow-400">
                              Pending
                            </Badge>
                          )}
                          <Button
                            variant="outline"
                            className="border-gray-700 text-white hover:bg-gray-700 h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            className="border-gray-700 text-red-400 hover:bg-gray-700 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {companyDocuments.length === 0 && (
                      <div className="text-center py-10 bg-gray-800/30 rounded-lg">
                        <FileText className="h-10 w-10 mx-auto text-gray-600 mb-2" />
                        <h4 className="text-white text-lg font-medium mb-1">
                          No Documents Uploaded
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Upload your business registration and tax documents
                          for verification.
                        </p>
                        <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white mt-4">
                          <Upload className="h-4 w-4 mr-2" /> Upload Document
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upload Document Modal - Toggle visibility */}
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-10 hidden">
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Upload Document
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">
                        Document Type
                      </label>
                      <Select>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="business">
                            Business Registration
                          </SelectItem>
                          <SelectItem value="tax">Tax Certificate</SelectItem>
                          <SelectItem value="other">Other Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">
                        Upload File
                      </label>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-800/50">
                        <Upload className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                        <p className="text-sm text-gray-400 mb-2">
                          Drag & drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports PDF, JPG, PNG (Max. 5MB)
                        </p>
                        <Button className="bg-gray-700 text-white hover:bg-gray-600 mt-4">
                          Browse Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        Cancel
                      </Button>
                      <Button className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white">
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Application Item Component
function ApplicationItem({ application, isSelected, onClick, getStatusColor }) {
  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-800/50 ${
        isSelected ? "bg-gray-800/80 border-l-4 border-l-[#FF6F1B]" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-white">{application.studentName}</h4>
        <Badge className={getStatusColor(application.status)}>
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </Badge>
      </div>
      <p className="text-gray-400 text-sm mb-1">{application.postTitle}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {application.university} - {application.faculty}
        </span>
        <span className="text-xs text-gray-500">{application.appliedDate}</span>
      </div>
    </div>
  );
}
