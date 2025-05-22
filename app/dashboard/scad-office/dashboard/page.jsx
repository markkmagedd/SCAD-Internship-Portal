"use client";

import { useState } from "react";
import {
  Users,
  FileText,
  Clock,
  Briefcase,
  Mail,
  BarChart3,
  Calendar,
  Award,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  // Sample data - in a real app, this would come from an API or context
  const statistics = {
    totalStudents: 876,
    totalCompanies: 42,
    activeInternships: 156,
    completedInternships: 287,
    pendingReports: 23,
    pendingCompanyApprovals: 8,
    workshopsThisMonth: 5,
    appointmentsToday: 12,
  };

  const companies = [
    { id: 1, name: "ABC Corporation", status: "active" },
    { id: 2, name: "Tech Solutions Ltd", status: "pending" },
    { id: 3, name: "Global Innovations", status: "active" },
    { id: 4, name: "Future Systems", status: "active" },
    { id: 5, name: "Digital Experts", status: "pending" },
  ];

  const recentReports = [
    {
      id: 1,
      studentName: "John Doe",
      reportTitle: "Week 3 Progress Report",
      submissionDate: "2023-03-15",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Sarah Ahmed",
      reportTitle: "Final Internship Report",
      submissionDate: "2023-03-14",
      status: "graded",
    },
    {
      id: 3,
      studentName: "Mohammed Ali",
      reportTitle: "Month 1 Summary",
      submissionDate: "2023-03-13",
      status: "pending",
    },
  ];

  const upcomingWorkshops = [
    {
      id: 1,
      title: "Resume Building Workshop",
      date: "2023-03-20",
      registrations: 45,
      capacity: 50,
    },
    {
      id: 2,
      title: "Interview Skills",
      date: "2023-03-25",
      registrations: 38,
      capacity: 40,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "graded":
        return "bg-green-500/20 text-green-400";
      case "active":
        return "bg-green-500/20 text-green-400";
      case "inactive":
        return "bg-gray-500/20 text-gray-400";
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
                <p className="text-gray-400 mb-1 text-sm">Total Students</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalStudents}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Active system registrations
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
                  Registered Companies
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalCompanies}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {companies.filter((c) => c.status === "active").length}{" "}
                  currently active
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
                <p className="text-gray-400 mb-1 text-sm">Active Internships</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.activeInternships}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {statistics.completedInternships} completed total
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Clock className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Pending Reports</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.pendingReports}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Need review & grading
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <FileText className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Recent Reports</h3>
            <div>
              <a
                href="#"
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
                  View All
                </span>
                <span className="relative invisible">Button Text</span>
              </a>
            </div>
          </div>

          <div className="divide-y divide-gray-800">
            {recentReports.map((report) => (
              <div key={report.id} className="p-4 hover:bg-gray-800/20">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-white">
                      {report.reportTitle}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {report.studentName}
                    </p>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Submitted: {report.submissionDate}
                  </span>
                  <Button
                    variant="ghost"
                    className="h-8 text-white hover:bg-[#FF6F1B]/25 hover:text-white hover:cursor-pointer"
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Workshops */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Upcoming Workshops</h3>
            <div>
              <a
                href="#"
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
                  View All
                </span>
                <span className="relative invisible">Button Text</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {upcomingWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-black border border-gray-800 rounded-lg p-4 hover:border-[#FF6F1B]/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-white">{workshop.title}</h4>
                  <div className="bg-[#FF6F1B]/10 text-[#FF6F1B] text-xs px-2 py-1 rounded">
                    {workshop.date}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {workshop.registrations}/{workshop.capacity} registered
                  </span>
                  <Button
                    variant="outline"
                    className="text-white border-gray-700 hover:text-[#FF6F1B] hover:bg-black bg-black hover:cursor-pointer"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Company Approvals</h3>
              <div className="p-2 rounded-full bg-gradient-to-r from-[#EC1024]/10 to-[#FF6F1B]/10">
                <Briefcase className="h-5 w-5 text-[#FF6F1B]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">
                  {statistics.pendingCompanyApprovals}
                </p>
                <p className="text-sm text-gray-400">Pending approvals</p>
              </div>
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Review
                </span>
                <span className="relative invisible">Review</span>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Workshops This Month</h3>
              <div className="p-2 rounded-full bg-gradient-to-r from-[#EC1024]/10 to-[#FF6F1B]/10">
                <Award className="h-5 w-5 text-[#FF6F1B]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">
                  {statistics.workshopsThisMonth}
                </p>
                <p className="text-sm text-gray-400">Scheduled workshops</p>
              </div>
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Schedule
                </span>
                <span className="relative invisible">Schedule</span>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Today's Appointments</h3>
              <div className="p-2 rounded-full bg-gradient-to-r from-[#EC1024]/10 to-[#FF6F1B]/10">
                <Calendar className="h-5 w-5 text-[#FF6F1B]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-white">
                  {statistics.appointmentsToday}
                </p>
                <p className="text-sm text-gray-400">Student consultations</p>
              </div>
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  View
                </span>
                <span className="relative invisible">View</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
