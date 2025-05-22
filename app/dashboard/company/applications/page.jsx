"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Users,
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ApplicationsPage() {
  // Mock data - In a real app, this would come from a database
  const [internshipPosts, setInternshipPosts] = useState([
    {
      id: 1,
      title: "Backend Developer Intern",
    },
    {
      id: 2,
      title: "Frontend Intern",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
    },
    {
      id: 4,
      title: "Marketing Intern",
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterParams, setFilterParams] = useState({
    postId: "all",
    status: "all",
  });

  // Helper Functions
  const handleApplicationFilter = () => {
    let filtered = [...applications];

    // Filter by post
    if (filterParams.postId !== "all") {
      filtered = filtered.filter(
        (app) => app.postId === parseInt(filterParams.postId)
      );
    }

    // Filter by status
    if (filterParams.status !== "all") {
      filtered = filtered.filter((app) => app.status === filterParams.status);
    }

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((app) =>
        app.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const updateApplicationStatus = (appId, newStatus) => {
    // Update application status
    const updatedApplications = applications.map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);

    if (selectedApplication && selectedApplication.id === appId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
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
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Application Item Component
  function ApplicationItem({ application, isSelected, onClick }) {
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
          <span className="text-xs text-gray-500">
            {application.appliedDate}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-black p-4 rounded-lg border border-gray-800">
        <div className="flex-1">
          <label className="text-sm text-gray-400 block mb-1">
            Filter by Position
          </label>
          <Select
            value={filterParams.postId}
            onValueChange={(value) =>
              setFilterParams({
                ...filterParams,
                postId: value,
              })
            }
          >
            <SelectTrigger className="w-full bg-black border-gray-700 text-white">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
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
            value={filterParams.status}
            onValueChange={(value) =>
              setFilterParams({
                ...filterParams,
                status: value,
              })
            }
          >
            <SelectTrigger className="w-full bg-black border-gray-700 text-white">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
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
          <label className="text-sm text-gray-400 block mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-black border-gray-700 text-white rounded-lg"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Applications list and detail view */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* List view */}
        <div
          className={`${selectedApplication ? "w-full md:w-1/2" : "w-full"}`}
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
                {handleApplicationFilter().length > 0 ? (
                  handleApplicationFilter().map((app) => (
                    <ApplicationItem
                      key={app.id}
                      application={app}
                      isSelected={selectedApplication?.id === app.id}
                      onClick={() => setSelectedApplication(app)}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Users className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                    <h4 className="text-lg font-medium text-white mb-1">
                      No applications found
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {searchTerm
                        ? "Try adjusting your search or filters"
                        : "There are no applications matching your filters"}
                    </p>
                  </div>
                )}
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
                    className="bg-black text-white border border-gray-800 hover:bg-[#FF6F1B]/25 hover:cursor-pointer rounded-full"
                    onClick={() => setSelectedApplication(null)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge className={getStatusColor(selectedApplication.status)}>
                    {selectedApplication.status.charAt(0).toUpperCase() +
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
                    <p className="text-white">{selectedApplication.faculty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GPA</p>
                    <p className="text-white">{selectedApplication.gpa}</p>
                  </div>
                </div>

                {/* Resume */}
                <div className="mb-6">
                  <h3 className="font-medium text-white mb-2">Resume</h3>
                  <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
                    <div className="flex items-center">
                      <FileText className="text-[#FF6F1B] mr-3 h-5 w-5" />
                      <span className="text-white">
                        {selectedApplication.studentName} - Resume.pdf
                      </span>
                    </div>
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                        <Eye className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </span>
                      <span className="relative invisible">View</span>
                    </a>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-800 pt-6 flex justify-between items-center">
                  <h3 className="font-medium text-white">Update Status</h3>

                  {selectedApplication.status === "pending" && (
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "interviewing"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                          <Users className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Interview
                        </span>
                        <span className="relative invisible">Interview</span>
                      </a>

                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "accepted"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                          <CheckCircle className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Accept
                        </span>
                        <span className="relative invisible">Accept</span>
                      </a>

                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "rejected"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                          <XCircle className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Reject
                        </span>
                        <span className="relative invisible">Reject</span>
                      </a>
                    </div>
                  )}

                  {selectedApplication.status === "interviewing" && (
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "accepted"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                          <CheckCircle className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Accept
                        </span>
                        <span className="relative invisible">Accept</span>
                      </a>

                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "rejected"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                          <XCircle className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Reject
                        </span>
                        <span className="relative invisible">Reject</span>
                      </a>
                    </div>
                  )}

                  {selectedApplication.status === "accepted" && (
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "finalized"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                          <CheckCircle className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Finalize
                        </span>
                        <span className="relative invisible">Finalize</span>
                      </a>

                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        onClick={(e) => {
                          e.preventDefault();
                          updateApplicationStatus(
                            selectedApplication.id,
                            "rejected"
                          );
                        }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                          <XCircle className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Reject
                        </span>
                        <span className="relative invisible">Reject</span>
                      </a>
                    </div>
                  )}

                  {(selectedApplication.status === "finalized" ||
                    selectedApplication.status === "rejected") && (
                    <div>
                      <Badge
                        className={getStatusColor(selectedApplication.status)}
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
  );
}
