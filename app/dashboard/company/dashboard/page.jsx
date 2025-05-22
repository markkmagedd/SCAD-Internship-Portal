"use client";

import { useState } from "react";
import {
  BarChart3,
  Users,
  FileText,
  Calendar,
  ChevronRight,
  Briefcase,
  Clock,
  Mail,
  CheckCircle,
  Eye,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CompanyDashboardPage({ onNavigate }) {
  // Mock data - In a real app, this would come from a database
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
    {
      id: 4,
      type: "email",
      message:
        "Email sent: Application for Frontend Intern position has been accepted",
      date: "2025-02-18",
      read: false,
    },
    {
      id: 5,
      type: "email",
      message:
        "Email sent: Application for Marketing Intern position has been rejected",
      date: "2025-02-15",
      read: false,
    },
    {
      id: 6,
      type: "email",
      message:
        "Email sent: Interview invitation for Data Analyst Intern position",
      date: "2025-02-22",
      read: false,
    },
  ]);

  // Helper functions
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
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Active Posts</p>
                <h2 className="text-3xl font-bold text-white">
                  {
                    internshipPosts.filter((post) => post.status === "active")
                      .length
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
                <p className="text-gray-400 mb-1 text-sm">New Applications</p>
                <h2 className="text-3xl font-bold text-white">
                  {
                    applications.filter((app) => app.status === "pending")
                      .length
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
                <p className="text-gray-400 mb-1 text-sm">Current Interns</p>
                <h2 className="text-3xl font-bold text-white">
                  {
                    interns.filter((intern) => intern.status === "current")
                      .length
                  }
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {
                    interns.filter((intern) => intern.status === "complete")
                      .length
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
                <p className="text-gray-400 mb-1 text-sm">Notifications</p>
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
      <Card className="bg-black border-gray-800 rounded-xl overflow-hidden hover:shadow-[#FF6F1B] shadow-s">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">
              Recent Applications
            </h3>
            <div>
              <Button
                className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                onClick={() => onNavigate("applications")}
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
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
                  View All
                </span>
                <span className="relative invisible">View All</span>
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-black">
                  <th className="py-4 px-6 font-medium text-[#FF6F1B]">Name</th>
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
                    className="border-t border-gray-800 transition-colors"
                  >
                    <td className="py-4 px-6 text-white">{app.studentName}</td>
                    <td className="py-4 px-6 text-white">{app.postTitle}</td>
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
                        className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                        onClick={() => {}}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                          <Eye className="h-5 w-5" />
                        </span>
                        <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          View Details
                        </span>
                        <span className="relative invisible">View Details</span>
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
            <h3 className="text-xl font-bold text-white">Current Interns</h3>

            <div>
              <Button
                className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                onClick={() => onNavigate("interns")}
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
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
                  View All
                </span>
                <span className="relative invisible">View All</span>
              </Button>
            </div>
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
                        <p className="text-sm text-gray-400">{intern.role}</p>
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
                      <span className="text-sm text-gray-400">Progress</span>
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
            {notifications.slice(0, 4).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${!notification.read ? "bg-gray-800/20" : ""}`}
              >
                <div className="flex items-start">
                  <div
                    className={`p-2 rounded-full ${
                      notification.type === "application"
                        ? "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                        : notification.type === "verification"
                        ? "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                        : notification.type === "email"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                    } mr-4`}
                  >
                    {notification.type === "application" ? (
                      <Users className="h-5 w-5" />
                    ) : notification.type === "verification" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : notification.type === "email" ? (
                      <Mail className="h-5 w-5" />
                    ) : (
                      <Mail className="h-5 w-5" />
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
  );
}
