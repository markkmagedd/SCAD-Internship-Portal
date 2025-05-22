"use client";

import { useState } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Award,
  BookOpen,
  AlertTriangle,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage({ onNavigate }) {
  // Sample data - in a real app, this would come from an API or context
  const statistics = {
    totalReports: 45,
    pendingReports: 12,
    approvedReports: 28,
    rejectedReports: 5,
    assignedStudents: 32,
    assignedCourses: 3,
  };

  const recentReports = [
    {
      id: 1,
      studentName: "Ahmed Mohamed",
      reportTitle: "Web Development Internship Final Report",
      company: "Tech Solutions Ltd",
      submissionDate: "2024-12-10",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Sara Ahmed",
      reportTitle: "Marketing Internship Report",
      company: "Global Marketing Agency",
      submissionDate: "2024-10-01",
      status: "pending",
    },
    {
      id: 3,
      studentName: "Mohamed Ali",
      reportTitle: "Data Analysis Internship Report",
      company: "Data Insights Inc",
      submissionDate: "2024-08-15",
      status: "flagged",
    },
    {
      id: 4,
      studentName: "Nour Ibrahim",
      reportTitle: "Software Engineering Internship Report",
      company: "Future Systems Egypt",
      submissionDate: "2024-09-10",
      status: "rejected",
    },
    {
      id: 5,
      studentName: "Yasmine Kamal",
      reportTitle: "UX/UI Design Internship Report",
      company: "Creative Studio Egypt",
      submissionDate: "2024-07-25",
      status: "flagged",
    },
  ];

  const assignedCourses = [
    {
      id: 1,
      code: "CSEN 401",
      name: "Web Development",
      students: 15,
      reportsThisSemester: 8,
    },
    {
      id: 2,
      code: "CSEN 503",
      name: "Software Engineering",
      students: 22,
      reportsThisSemester: 14,
    },
    {
      id: 3,
      code: "CSEN 601",
      name: "Data Analysis",
      students: 18,
      reportsThisSemester: 10,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "flagged":
        return "bg-orange-500/20 text-orange-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FileText className="h-4 w-4 mr-1" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      case "rejected":
        return <X className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Total Reports</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalReports}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {statistics.pendingReports} pending review
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
                <p className="text-gray-400 mb-1 text-sm">Assigned Students</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.assignedStudents}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Across {statistics.assignedCourses} courses
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
                <p className="text-gray-400 mb-1 text-sm">Approval Rate</p>
                <h2 className="text-3xl font-bold text-white">
                  {Math.round(
                    (statistics.approvedReports / statistics.totalReports) * 100
                  )}
                  %
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {statistics.approvedReports} approved reports
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Award className="text-[#FF6F1B]" />
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
                onClick={() => onNavigate("reports")}
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
                  View All Reports
                </span>
                <span className="relative invisible">View All Reports</span>
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
                      {report.studentName} · {report.company}
                    </p>
                  </div>
                  <Badge className={getStatusColor(report.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span>
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </span>
                    </div>
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Submitted: {report.submissionDate}
                  </span>
                  <Button
                    className="relative inline-flex items-center justify-center px-4 py-1 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                    onClick={() => onNavigate("reports")}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <FileText className="h-3.5 w-3.5" />
                    </span>
                    <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <FileText className="h-3.5 w-3.5 mr-1" /> Review
                    </span>
                    <span className="relative invisible">Review</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assigned Courses */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-0">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Assigned Courses</h3>
          </div>
          <div className="divide-y divide-gray-800">
            {assignedCourses.map((course) => (
              <div key={course.id} className="p-4 hover:bg-gray-800/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">
                      {course.code}: {course.name}
                    </h4>
                    <div className="flex space-x-4 mt-1">
                      <p className="text-sm text-gray-400">
                        <Users className="h-4 w-4 inline-block mr-1" />{" "}
                        {course.students} Students
                      </p>
                      <p className="text-sm text-gray-400">
                        <FileText className="h-4 w-4 inline-block mr-1" />{" "}
                        {course.reportsThisSemester} Reports
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                        <BookOpen className="h-5 w-5" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        View Details
                      </span>
                      <span className="relative invisible">View Details</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Faculty Responsibilities Card */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Faculty Responsibilities
          </h3>
          <div className="space-y-1">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                <span>Review and grade student internship reports</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                <span>Flag reports that need revisions or clarifications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5" />
                <span>Reject reports that do not meet requirements</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-orange-400 mr-2 mt-0.5" />
                <span>
                  SCAD Office will provide additional clarification for rejected
                  or flagged reports
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
