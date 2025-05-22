"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  XCircle,
  Clock,
  Building,
  Calendar,
  FileText,
  Check,
  X,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterParams, setFilterParams] = useState({
    status: "all",
  });

  // Sample data for applications
  const applications = [
    {
      id: 1,
      position: "Frontend Developer Intern",
      company: "Tech Solutions Ltd",
      companyLogo: "/assets/company1.png",
      appliedDate: "2025-02-15",
      status: "pending",
      details: {
        jobDescription:
          "Join our team to build responsive and accessible user interfaces using React.",
        duration: "3 months",
        isPaid: true,
        salary: "$1000/month",
        startDate: "2025-04-01",
        location: "Dubai",
        submittedDocuments: ["Resume", "Cover Letter"],
      },
    },
    {
      id: 2,
      position: "Data Analyst Intern",
      company: "Global Analytics",
      companyLogo: "/assets/company2.png",
      appliedDate: "2025-02-10",
      status: "accepted",
      details: {
        jobDescription:
          "Work with our data team to analyze customer data and provide insights.",
        duration: "6 months",
        isPaid: true,
        salary: "$1200/month",
        startDate: "2025-04-01",
        location: "Abu Dhabi",
        submittedDocuments: ["Resume", "Academic Transcript", "Portfolio"],
        acceptanceDate: "2025-02-20",
        startInstructions:
          "Please come to our office at 9 AM on April 1st. Bring your laptop and ID.",
      },
    },
    {
      id: 3,
      position: "UX/UI Design Intern",
      company: "Future Systems",
      companyLogo: "/assets/company3.png",
      appliedDate: "2025-02-05",
      status: "rejected",
      details: {
        jobDescription:
          "Design user interfaces and experiences for web and mobile applications.",
        duration: "3 months",
        isPaid: false,
        startDate: "2025-03-15",
        location: "Dubai",
        submittedDocuments: ["Resume", "Portfolio"],
        rejectionDate: "2025-02-15",
        rejectionReason:
          "We had many qualified applicants and have selected candidates whose experience better matches our current needs.",
      },
    },
    {
      id: 4,
      position: "Marketing Assistant",
      company: "Creative Hub",
      companyLogo: "/assets/company4.png",
      appliedDate: "2025-01-28",
      status: "finalized",
      details: {
        jobDescription:
          "Assist in developing marketing campaigns and managing social media accounts.",
        duration: "4 months",
        isPaid: true,
        salary: "$800/month",
        startDate: "2025-03-15",
        location: "Sharjah",
        submittedDocuments: ["Resume", "Cover Letter", "Writing Samples"],
        finalizedDate: "2025-02-10",
        nextSteps:
          "Your application is among our top choices. We will make a final decision by February 25th.",
      },
    },
    {
      id: 5,
      position: "Software Engineering Intern",
      company: "ABC Corporation",
      companyLogo: "/assets/company5.png",
      appliedDate: "2025-01-20",
      status: "withdrawn",
      details: {
        jobDescription:
          "Join our engineering team to develop and maintain high-performance applications.",
        duration: "6 months",
        isPaid: true,
        salary: "$1500/month",
        startDate: "2025-03-01",
        location: "Dubai",
        submittedDocuments: ["Resume", "Academic Transcript", "Code Samples"],
        withdrawnDate: "2025-01-25",
        withdrawnReason: "Accepted another offer",
      },
    },
  ];

  // Filter the applications based on search term and filter parameters
  const filteredApplications = applications.filter((application) => {
    // Search term filter
    const matchesSearch =
      application.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus =
      filterParams.status === "all" ||
      application.status === filterParams.status;

    return matchesSearch && matchesStatus;
  });

  const handleSelectApplication = (application) => {
    setSelectedApplication(application);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
      case "withdrawn":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "accepted":
        return <Check className="h-4 w-4 mr-1" />;
      case "rejected":
        return <X className="h-4 w-4 mr-1" />;
      case "finalized":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case "withdrawn":
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Applications</h1>
          <p className="text-gray-400">
            Track the status of your internship applications
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black border-gray-800 shadow-s">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by job title or company name"
                className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <select
                className="w-full md:w-64 bg-black border-gray-700 rounded-md p-2 text-white"
                value={filterParams.status}
                onChange={(e) =>
                  setFilterParams({
                    ...filterParams,
                    status: e.target.value,
                  })
                }
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="finalized">Finalized</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Applications List - takes 1/3 on desktop, full on mobile */}
        <div className="md:col-span-1">
          <Card className="bg-black border-gray-800 shadow-s">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">
                  {filteredApplications.length} Applications
                </h3>
              </div>
              <div className="divide-y divide-gray-800 max-h-[700px] overflow-y-auto">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <div
                      key={application.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                        selectedApplication &&
                        selectedApplication.id === application.id
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => handleSelectApplication(application)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">
                            {application.position}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {application.company}
                          </p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(application.status)}
                            <span>
                              {application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)}
                            </span>
                          </div>
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Applied: {formatDate(application.appliedDate)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white">
                      No applications found
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Details - takes 2/3 on desktop, full on mobile */}
        <div className="md:col-span-2">
          {selectedApplication ? (
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedApplication.position}
                    </h2>
                    <div className="flex items-center text-gray-400 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{selectedApplication.company}</span>
                      <span className="px-2">•</span>
                      <span>{selectedApplication.details.location}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedApplication.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(selectedApplication.status)}
                      <span>
                        {selectedApplication.status.charAt(0).toUpperCase() +
                          selectedApplication.status.slice(1)}
                      </span>
                    </div>
                  </Badge>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-900/30 p-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Applied On</span>
                    <span className="text-white font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      {formatDate(selectedApplication.appliedDate)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Duration</span>
                    <span className="text-white font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      {selectedApplication.details.duration}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      {selectedApplication.details.isPaid
                        ? "Compensation"
                        : "Unpaid"}
                    </span>
                    <span className="text-white font-medium">
                      {selectedApplication.details.isPaid
                        ? selectedApplication.details.salary
                        : "Unpaid Internship"}
                    </span>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Job Description
                  </h3>
                  <p className="text-gray-400">
                    {selectedApplication.details.jobDescription}
                  </p>
                </div>

                {/* Submitted Documents */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Submitted Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedApplication.details.submittedDocuments.map(
                      (doc, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-900/30 p-3 rounded-lg"
                        >
                          <FileText className="h-5 w-5 mr-2 text-[#FF6F1B]" />
                          <span className="text-white">{doc}</span>
                          <Button
                            variant="ghost"
                            className="ml-auto h-8 w-8 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Status-specific information */}
                {selectedApplication.status === "accepted" && (
                  <div className="mb-6 bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <h3 className="text-lg font-medium text-green-400 flex items-center mb-2">
                      <Check className="h-5 w-5 mr-2" />
                      Accepted on{" "}
                      {formatDate(selectedApplication.details.acceptanceDate)}
                    </h3>
                    <p className="text-gray-300">
                      {selectedApplication.details.startInstructions}
                    </p>
                    <div className="mt-4">
                      <Button className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                          <Calendar className="h-5 w-5" />
                        </span>
                        <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          Add to Calendar
                        </span>
                        <span className="relative invisible">
                          Add to Calendar
                        </span>
                      </Button>
                    </div>
                  </div>
                )}

                {selectedApplication.status === "rejected" && (
                  <div className="mb-6 bg-red-500/10 p-4 rounded-lg border border-red-500/30">
                    <h3 className="text-lg font-medium text-red-400 flex items-center mb-2">
                      <X className="h-5 w-5 mr-2" />
                      Rejected on{" "}
                      {formatDate(selectedApplication.details.rejectionDate)}
                    </h3>
                    <p className="text-gray-300">
                      {selectedApplication.details.rejectionReason}
                    </p>
                  </div>
                )}

                {selectedApplication.status === "finalized" && (
                  <div className="mb-6 bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                    <h3 className="text-lg font-medium text-blue-400 flex items-center mb-2">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Finalized on{" "}
                      {formatDate(selectedApplication.details.finalizedDate)}
                    </h3>
                    <p className="text-gray-300">
                      {selectedApplication.details.nextSteps}
                    </p>
                  </div>
                )}

                {selectedApplication.status === "withdrawn" && (
                  <div className="mb-6 bg-gray-500/10 p-4 rounded-lg border border-gray-500/30">
                    <h3 className="text-lg font-medium text-gray-400 flex items-center mb-2">
                      <XCircle className="h-5 w-5 mr-2" />
                      Withdrawn on{" "}
                      {formatDate(selectedApplication.details.withdrawnDate)}
                    </h3>
                    <p className="text-gray-300">
                      Reason: {selectedApplication.details.withdrawnReason}
                    </p>
                  </div>
                )}

                {selectedApplication.status === "pending" && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="bg-black border-gray-800 hover:bg-red-900/20 text-red-400 hover:text-red-300 mr-3"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Withdraw Application
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black border-gray-800 shadow-s h-full flex items-center justify-center">
              <CardContent className="p-6 text-center">
                <div className="bg-gray-800/30 rounded-full p-6 inline-flex mx-auto mb-4">
                  <FileText className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  Select an application to view details
                </h3>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">
                  Click on any application from the list to view detailed
                  information about your submission and its current status.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
