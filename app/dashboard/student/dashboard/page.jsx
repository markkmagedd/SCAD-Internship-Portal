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
  Star,
  Building,
  Bell,
  GraduationCap,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage({ onNavigate }) {
  // Mock data - In a real app, this would come from an API
  const statistics = {
    totalApplications: 12,
    acceptedApplications: 3,
    pendingApplications: 5,
    rejectedApplications: 4,
    completedInternships: 2,
    upcomingReportDeadlines: 1,
    recommendedCompanies: 8,
  };

  const upcomingCycles = {
    nextCycle: "Summer 2025",
    startDate: "May 15, 2025",
    registrationDeadline: "April 1, 2025",
    daysRemaining: 45,
  };

  const recentApplications = [
    {
      id: 1,
      companyName: "Tech Solutions Egypt",
      position: "Frontend Developer",
      appliedDate: "Feb 15, 2025",
      status: "pending",
    },
    {
      id: 2,
      companyName: "Global Innovations Egypt",
      position: "Data Analyst",
      appliedDate: "Feb 10, 2025",
      status: "accepted",
    },
    {
      id: 3,
      companyName: "Digital Experts Egypt",
      position: "UX/UI Designer",
      appliedDate: "Feb 5, 2025",
      status: "rejected",
    },
    {
      id: 4,
      companyName: "Future Systems Egypt",
      position: "Backend Developer",
      appliedDate: "Jan 28, 2025",
      status: "finalized",
    },
  ];

  const suggestedCompanies = [
    {
      id: 1,
      name: "ABC Corporation Egypt",
      industry: "Software Development",
      openPositions: 3,
      match: 95,
    },
    {
      id: 2,
      name: "Innovative Tech Egypt",
      industry: "Artificial Intelligence",
      openPositions: 2,
      match: 90,
    },
    {
      id: 3,
      name: "Future Finance Egypt",
      industry: "FinTech",
      openPositions: 1,
      match: 85,
    },
  ];

  const notifications = [
    {
      id: 1,
      title: "Application Status Update",
      message:
        "Your application at Global Innovations Egypt has been accepted!",
      date: "Feb 12, 2025",
      read: false,
    },
    {
      id: 2,
      title: "Report Deadline Reminder",
      message: "Your internship report is due in 3 days.",
      date: "Feb 10, 2025",
      read: true,
    },
    {
      id: 3,
      title: "New Internship Opportunity",
      message:
        "A new position matching your profile is available at ABC Corp Egypt.",
      date: "Feb 8, 2025",
      read: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "accepted":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      case "finalized":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back to your student portal</p>
        </div>
        <Button
          onClick={() => onNavigate && onNavigate("notifications")}
          variant="outline"
          className="relative bg-black border-gray-800 hover:text-[#FF6F1B] hover:bg-black hover:cursor-pointer text-white"
        >
          <Bell className="mr-2" />
          <span>Notifications</span>
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FF6F1B] text-xs flex items-center justify-center">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Applications</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalApplications}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {statistics.acceptedApplications} accepted
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
                <p className="text-gray-400 mb-1 text-sm">Internships</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.completedInternships}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Completed
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
                <p className="text-gray-400 mb-1 text-sm">Reports Due</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.upcomingReportDeadlines}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Upcoming deadlines
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Calendar className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Recommended</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.recommendedCompanies}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Companies for you
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Building className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Internship Cycle */}
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Clock className="mr-2 text-[#FF6F1B]" />
                Upcoming Internship Cycle
              </h3>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {upcomingCycles.nextCycle}
                  </h4>
                  <p className="text-gray-400">
                    Starting: {upcomingCycles.startDate}
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white border-none">
                  {upcomingCycles.daysRemaining} days left
                </Badge>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400">Registration Deadline</p>
                <p className="text-white">
                  {upcomingCycles.registrationDeadline}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => onNavigate && onNavigate("internships")}
                  className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    View Opportunities
                  </span>
                  <span className="relative invisible">View Opportunities</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                Recent Applications
              </h3>

              <div>
                <button
                  onClick={() => onNavigate && onNavigate("applications")}
                  className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    View All
                  </span>
                  <span className="relative invisible">View All</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {recentApplications.map((application) => (
                <div key={application.id} className="p-4 hover:bg-gray-800/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-white">
                        {application.position}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {application.companyName}
                      </p>
                    </div>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Applied: {application.appliedDate}
                    </span>
                    <Button
                      className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                      onClick={() => onNavigate && onNavigate("applications")}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                        <FileText className="h-5 w-5" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        View Application
                      </span>
                      <span className="relative invisible">
                        View Application
                      </span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Companies */}
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                Suggested Companies
              </h3>

              <div>
                <button
                  onClick={() => onNavigate && onNavigate("companies")}
                  className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    View All
                  </span>
                  <span className="relative invisible">View All</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {suggestedCompanies.map((company) => (
                <div key={company.id} className="p-4 hover:bg-gray-800/20">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-white">{company.name}</h4>
                      <p className="text-sm text-gray-400">
                        {company.industry}
                      </p>
                    </div>
                    <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                      {company.match}% Match
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {company.openPositions} open positions
                    </span>
                    <Button
                      className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                      onClick={() => onNavigate && onNavigate("companies")}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                        <FileText className="h-5 w-5" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        View Details
                      </span>
                      <span className="relative invisible">View Details</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                Recent Notifications
              </h3>

              <div>
                <button
                  onClick={() => onNavigate && onNavigate("notifications")}
                  className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    View All
                  </span>
                  <span className="relative invisible">View All</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-800">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-800/20 ${
                    !notification.read ? "bg-gray-900/30" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          !notification.read
                            ? "bg-[#FF6F1B]/20"
                            : "bg-gray-800/50"
                        }`}
                      >
                        <Bell
                          className={
                            !notification.read
                              ? "h-4 w-4 text-[#FF6F1B]"
                              : "h-4 w-4 text-gray-400"
                          }
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center ml-10">
                    <span className="text-xs text-gray-500">
                      {notification.date}
                    </span>
                    {!notification.read && (
                      <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
