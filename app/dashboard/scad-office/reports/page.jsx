"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  FileText,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  User,
  Calendar,
  MessageSquare,
  Star,
  ChevronDown,
  ChevronUp,
  Flag,
  AlertTriangle,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ReportsPage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Week 3 Progress Report",
      studentName: "Ahmed Mohamed",
      studentId: "28-12345",
      company: "Tech Solutions Inc.",
      position: "Frontend Developer Intern",
      submissionDate: "2023-03-15",
      dueDate: "2023-03-10",
      fileUrl: "/reports/ahmed-week3.pdf",
      status: "pending", // pending, graded, rejected
      grade: null,
      feedback: "",
      internshipDuration: "3 months",
      summary:
        "Implementation of new user interface components and integration with backend APIs.",
      learningOutcomes: [
        "Learned React component architecture",
        "Improved CSS Grid and Flexbox skills",
        "Gained experience with REST API integration",
      ],
      isLate: true,
      major: "Computer Science",
      reportStatus: "pending", // pending, flagged, rejected, accepted
      supervisorName: "Dr. Mahmoud Ibrahim",
    },
    {
      id: 2,
      title: "Final Internship Report",
      studentName: "Sarah Ahmed",
      studentId: "27-54321",
      company: "Digital Media Group",
      position: "Marketing Intern",
      submissionDate: "2023-03-14",
      dueDate: "2023-03-14",
      fileUrl: "/reports/sarah-final.pdf",
      status: "graded",
      grade: "A",
      feedback:
        "Excellent report that demonstrates deep understanding of marketing strategies and their application. Great analysis of campaign results and thoughtful recommendations.",
      internshipDuration: "6 months",
      summary:
        "Comprehensive overview of the social media campaigns conducted and their impact on brand engagement metrics.",
      learningOutcomes: [
        "Developed social media strategy skills",
        "Learned analytics and data interpretation",
        "Improved content creation capabilities",
      ],
      isLate: false,
      major: "Marketing",
      reportStatus: "accepted",
      supervisorName: "Dr. Amira Hassanein",
    },
    {
      id: 3,
      title: "Month 1 Summary",
      studentName: "Omar Khaled",
      studentId: "29-98765",
      company: "Future Systems",
      position: "Engineering Intern",
      submissionDate: "2023-03-13",
      dueDate: "2023-03-15",
      fileUrl: "/reports/omar-month1.pdf",
      status: "pending",
      grade: null,
      feedback: "",
      internshipDuration: "4 months",
      summary:
        "Overview of the initial training phase and introduction to the company's engineering processes and projects.",
      learningOutcomes: [
        "Learned project management methodologies",
        "Gained knowledge of engineering standards",
        "Improved technical documentation skills",
      ],
      isLate: false,
      major: "Engineering",
      reportStatus: "flagged",
      supervisorName: "Dr. Ahmed Fouad",
    },
    {
      id: 4,
      title: "Mid-Term Evaluation",
      studentName: "Youssef Mohamed",
      studentId: "28-24680",
      company: "Future Systems",
      position: "Backend Developer Intern",
      submissionDate: "2023-02-20",
      dueDate: "2023-02-15",
      fileUrl: "/reports/youssef-midterm.pdf",
      status: "graded",
      grade: "B+",
      feedback:
        "Good report that shows a solid understanding of backend development concepts. Could improve on explaining the technical challenges faced and how they were overcome.",
      internshipDuration: "3 months",
      summary:
        "Detailed analysis of work on the company's API infrastructure and database optimization efforts.",
      learningOutcomes: [
        "Advanced database query optimization",
        "API design principles and practices",
        "Server infrastructure management",
      ],
      isLate: true,
      major: "Computer Science",
      reportStatus: "accepted",
      supervisorName: "Dr. Mahmoud Ibrahim",
    },
    {
      id: 5,
      title: "Weekly Progress Report 5",
      studentName: "Sara Ahmed",
      studentId: "27-54321",
      company: "Digital Media Group",
      position: "Marketing Intern",
      submissionDate: "2023-02-28",
      dueDate: "2023-02-28",
      fileUrl: "/reports/sara-week5.pdf",
      status: "rejected",
      grade: null,
      feedback:
        "The report lacks sufficient detail about the tasks performed and does not meet the required length. Please revise and resubmit with more specific information about your contributions and learnings.",
      internshipDuration: "6 months",
      summary:
        "Brief overview of the week's activities related to content creation and campaign monitoring.",
      learningOutcomes: [
        "Content scheduling techniques",
        "Audience engagement analysis",
        "A/B testing methods",
      ],
      isLate: false,
      major: "Marketing",
      reportStatus: "rejected",
      supervisorName: "Dr. Amira Hassanein",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [evaluationType, setEvaluationType] = useState("clarify");
  const [clarificationText, setClarificationText] = useState("");
  const [filterParams, setFilterParams] = useState({
    status: "all",
    isLate: "all",
    major: "all",
    reportStatus: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "submissionDate",
    direction: "desc",
  });

  // Statistics
  const [statistics, setStatistics] = useState({
    totalReports: reports.length,
    pendingReports: reports.filter((r) => r.status === "pending").length,
    flaggedReports: reports.filter((r) => r.reportStatus === "flagged").length,
    rejectedReports: reports.filter((r) => r.reportStatus === "rejected")
      .length,
    approvedReports: reports.filter((r) => r.reportStatus === "accepted")
      .length,
  });

  // Available majors for filter
  const majors = [...new Set(reports.map((report) => report.major))];

  // Report status options
  const reportStatuses = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending Review" },
    { value: "flagged", label: "Flagged" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ];

  // Sort and filter functions
  const sortReports = (reports, config) => {
    return [...reports].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === "asc" ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSortChange = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleReportSearch = () => {
    let filtered = [...reports];

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((report) => report.status === activeTab);
    }

    // Filter by status
    if (filterParams.status !== "all") {
      filtered = filtered.filter(
        (report) => report.status === filterParams.status
      );
    }

    // Filter by late status
    if (filterParams.isLate !== "all") {
      const isLate = filterParams.isLate === "late";
      filtered = filtered.filter((report) => report.isLate === isLate);
    }

    // Filter by major
    if (filterParams.major !== "all") {
      filtered = filtered.filter(
        (report) => report.major === filterParams.major
      );
    }

    // Filter by report status
    if (filterParams.reportStatus !== "all") {
      filtered = filtered.filter(
        (report) => report.reportStatus === filterParams.reportStatus
      );
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    return sortReports(filtered, sortConfig);
  };

  const addClarification = (id, clarification) => {
    if (!clarification.trim()) return;

    const updatedReports = reports.map((report) =>
      report.id === id
        ? {
            ...report,
            feedback: report.feedback
              ? `${report.feedback}\n\nSCAD Office Clarification: ${clarification}`
              : `SCAD Office Clarification: ${clarification}`,
          }
        : report
    );
    setReports(updatedReports);

    if (selectedReport && selectedReport.id === id) {
      setSelectedReport({
        ...selectedReport,
        feedback: selectedReport.feedback
          ? `${selectedReport.feedback}\n\nSCAD Office Clarification: ${clarification}`
          : `SCAD Office Clarification: ${clarification}`,
      });
    }

    // Reset fields
    setClarificationText("");
  };

  const updateReportStatus = (id, reportStatus, feedback = "") => {
    // This function now does nothing as SCAD office cannot change report status
    console.log(
      "SCAD office cannot change report status - this is handled by faculty members"
    );
  };

  const gradeReport = (id, grade, feedback) => {
    // This function now does nothing as SCAD office cannot grade reports
    console.log(
      "SCAD office cannot grade reports - this is handled by faculty members"
    );
  };

  const rejectReport = (id, feedback) => {
    // This function now does nothing as SCAD office cannot reject reports
    console.log(
      "SCAD office cannot reject reports - this is handled by faculty members"
    );
  };

  const flagReport = (id, feedback) => {
    // This function now does nothing as SCAD office cannot flag reports
    console.log(
      "SCAD office cannot flag reports - this is handled by faculty members"
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "graded":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "graded":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "rejected":
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderReportDetails = () => {
    if (!selectedReport) return null;

    return (
      <div className="p-6 bg-black border border-gray-800 rounded-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {selectedReport.title}
            </h3>
            <div className="flex flex-col gap-1 text-sm text-gray-400">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {selectedReport.studentName} ({selectedReport.studentId})
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Submitted: {formatDate(selectedReport.submissionDate)}
                {selectedReport.isLate && (
                  <Badge
                    variant="outline"
                    className="ml-2 bg-red-500/10 text-red-500 border-red-500/20"
                  >
                    Late
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Company Supervisor: {selectedReport.supervisorName}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-white"
            onClick={() => setSelectedReport(null)}
          >
            <XCircle className="h-5 w-5" />
          </Button>
        </div>

        {/* Report details */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-black p-4 rounded-lg border border-gray-800">
            <div>
              <p className="text-sm text-gray-500">Student</p>
              <p className="text-white">{selectedReport.studentName}</p>
              <p className="text-sm text-gray-400">
                {selectedReport.studentId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Internship</p>
              <p className="text-white">{selectedReport.position}</p>
              <p className="text-sm text-gray-400">{selectedReport.company}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submission Date</p>
              <p className="text-white">{selectedReport.submissionDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p
                className={`${
                  selectedReport.isLate ? "text-red-400" : "text-white"
                }`}
              >
                {selectedReport.dueDate}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Major</p>
              <p className="text-white">{selectedReport.major}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Report Status</p>
              <p
                className={`${
                  selectedReport.reportStatus === "flagged"
                    ? "text-orange-400"
                    : selectedReport.reportStatus === "rejected"
                    ? "text-red-400"
                    : selectedReport.reportStatus === "accepted"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {selectedReport.reportStatus.charAt(0).toUpperCase() +
                  selectedReport.reportStatus.slice(1)}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-2">Report Summary</h3>
            <div className="bg-black p-4 rounded-lg border border-gray-800">
              <p className="text-gray-300">{selectedReport.summary}</p>

              <h4 className="font-medium text-white mt-4 mb-2">
                Learning Outcomes
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {selectedReport.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-2">Report Document</h3>
            <div className="bg-black p-4 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="text-[#FF6F1B] mr-2 h-5 w-5" />
                  <span className="text-white">{selectedReport.title}.pdf</span>
                </div>
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Eye className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Eye className="h-4 w-4 mr-2" /> View
                    </span>
                    <span className="relative invisible">View</span>
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Download className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </span>
                    <span className="relative invisible">Download</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Replace the grading section with clarification section - only show for flagged or rejected reports */}
          {(selectedReport.reportStatus === "flagged" ||
            selectedReport.reportStatus === "rejected") && (
            <div>
              <h3 className="font-medium text-white mb-2">Add Clarification</h3>
              <div className="bg-black p-4 rounded-lg border border-gray-800 space-y-4">
                {/* Clarification text area */}
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Clarification Message
                  </label>
                  <Textarea
                    className="bg-black border-gray-700 text-white h-24"
                    placeholder="Provide additional clarification about why this report was flagged or rejected by the faculty member..."
                    value={clarificationText}
                    onChange={(e) => setClarificationText(e.target.value)}
                  />
                </div>

                {/* Action button */}
                <div className="flex justify-end pt-2">
                  <Button
                    className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                    onClick={() =>
                      addClarification(selectedReport.id, clarificationText)
                    }
                    disabled={!clarificationText.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Add Clarification
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Show existing feedback/clarifications */}
          {selectedReport.feedback && (
            <div>
              <h3 className="font-medium text-white mb-2">
                Feedback & Clarifications
              </h3>
              <div className="bg-black p-4 rounded-lg border border-gray-800">
                <p className="text-gray-300 whitespace-pre-line">
                  {selectedReport.feedback}
                </p>
              </div>
            </div>
          )}

          {/* Remove grading buttons */}
          {selectedReport.status === "pending" && (
            <div>
              <p className="text-yellow-400 text-sm italic">
                Note: This report needs to be evaluated by a faculty member
                first.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end mt-4 pt-4 border-t border-gray-800">
            <a
              href="#"
              className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gray-700 group-hover:translate-x-0 ease">
                <Calendar className="h-4 w-4" />
              </span>
              <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                <Calendar className="h-4 w-4 mr-2" /> Student History
              </span>
              <span className="relative invisible">Student History</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Total Reports</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalReports}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Submitted by students
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
                <p className="text-gray-400 mb-1 text-sm">Pending Review</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.pendingReports}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Awaiting faculty review
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
                <p className="text-gray-400 mb-1 text-sm">
                  Reports Needing Clarification
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.flaggedReports + statistics.rejectedReports}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Flagged or rejected
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <MessageSquare className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Approved Reports</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.approvedReports}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Approved by faculty
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <FileCheck className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header with description */}
      <div className="border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Report Clarifications</h1>
        <p className="text-gray-400 mt-2">
          Provide additional clarification for reports that have been flagged or
          rejected by faculty members. Only faculty members can evaluate and
          change the status of reports.
        </p>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* List view */}
        <div
          className={`${
            selectedReport ? "w-full md:w-1/2 lg:w-3/5" : "w-full"
          }`}
        >
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-0">
              {/* Tabs and filters */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <Tabs
                    defaultValue="all"
                    onValueChange={setActiveTab}
                    className="w-full md:w-auto"
                  >
                    <TabsList className="bg-black border border-gray-800 text-gray-400">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="pending"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Pending
                      </TabsTrigger>
                      <TabsTrigger
                        value="flagged"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Flagged
                      </TabsTrigger>
                      <TabsTrigger
                        value="rejected"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Rejected
                      </TabsTrigger>
                      <TabsTrigger
                        value="approved"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Approved
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="relative flex-1 md:w-60">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10 bg-black border-gray-700 text-white"
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Filter by:</span>
                  </div>

                  <div className="w-full md:w-auto">
                    <Select
                      value={filterParams.status}
                      onValueChange={(value) =>
                        setFilterParams({ ...filterParams, status: value })
                      }
                    >
                      <SelectTrigger className="w-full md:w-36 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <Select
                      value={filterParams.isLate}
                      onValueChange={(value) =>
                        setFilterParams({ ...filterParams, isLate: value })
                      }
                    >
                      <SelectTrigger className="w-full md:w-36 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Timeliness" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Submissions</SelectItem>
                        <SelectItem value="ontime">On Time</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <Select
                      value={filterParams.major}
                      onValueChange={(value) =>
                        setFilterParams({ ...filterParams, major: value })
                      }
                    >
                      <SelectTrigger className="w-full md:w-36 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Major" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Majors</SelectItem>
                        {majors.map((major) => (
                          <SelectItem key={major} value={major}>
                            {major}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <Select
                      value={filterParams.reportStatus}
                      onValueChange={(value) =>
                        setFilterParams({
                          ...filterParams,
                          reportStatus: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full md:w-42 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Report Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        {reportStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Sort bar */}
              <div className="flex items-center p-3 bg-gray-900/30 border-b border-gray-800 text-sm">
                <div
                  className="flex items-center w-1/3 cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => handleSortChange("submissionDate")}
                >
                  <span>Submission Date</span>
                  {sortConfig.key === "submissionDate" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
                <div
                  className="flex items-center w-1/3 cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => handleSortChange("studentName")}
                >
                  <span>Student</span>
                  {sortConfig.key === "studentName" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
                <div
                  className="flex items-center w-1/3 cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => handleSortChange("status")}
                >
                  <span>Status</span>
                  {sortConfig.key === "status" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </div>

              {/* Reports list */}
              <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                {handleReportSearch().length > 0 ? (
                  handleReportSearch().map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                        selectedReport?.id === report.id
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => setSelectedReport(report)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">
                            {report.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-400">
                            <User className="h-3 w-3 mr-1" />
                            <span>
                              {report.studentName} ({report.studentId})
                            </span>
                            <span className="mx-2 text-gray-600">•</span>
                            <span className="text-gray-400">
                              {report.major}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(report.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(report.status)}
                              <span>
                                {report.status.charAt(0).toUpperCase() +
                                  report.status.slice(1)}
                              </span>
                            </div>
                          </Badge>
                          {report.isLate && (
                            <Badge className="bg-red-500/20 text-red-400">
                              Late
                            </Badge>
                          )}
                          {report.reportStatus === "flagged" && (
                            <Badge className="bg-orange-500/20 text-orange-400">
                              Flagged
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{report.company}</span>
                        <span className="text-gray-500">
                          Submitted: {report.submissionDate}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-400">
                    No reports match your filters. Try adjusting your search
                    criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail view */}
        {selectedReport && (
          <div className="w-full md:w-1/2 lg:w-2/5">
            {renderReportDetails()}
          </div>
        )}
      </div>
    </div>
  );
}
