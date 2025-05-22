"use client";

import { useState } from "react";
import {
  FileText,
  Edit,
  Trash,
  Download,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Send,
  MessageSquare,
  Book,
  Save,
  Search,
  Upload,
  X,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ReportsPage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Web Development Internship Final Report",
      company: "Tech Solutions Ltd",
      date: "2024-12-15",
      status: "approved",
      intro:
        "This report summarizes my experience as a web development intern at Tech Solutions Ltd during the summer of 2024.",
      body: "During my internship, I worked on various projects including the company's website redesign and the development of an e-commerce platform. I was responsible for implementing responsive design, integrating payment gateways, and optimizing database queries. I learned a lot about modern web development practices, teamwork, and project management. The experience has significantly improved my technical skills and prepared me for future career opportunities in the field.",
      coursesHelped: [
        "Web Development",
        "Database Systems",
        "Software Engineering",
      ],
      recommendation: true,
      feedbackComments: "Great report! Well structured and informative.",
      lastEdited: "2024-12-10",
    },
    {
      id: 2,
      title: "Marketing Internship Report",
      company: "Global Marketing Agency",
      date: "2024-10-05",
      status: "pending",
      intro:
        "This report outlines my experience and learnings during my marketing internship at Global Marketing Agency.",
      body: "As a marketing intern, I was involved in social media management, content creation, and market research. I helped develop marketing campaigns for several clients and participated in brainstorming sessions with the creative team. I gained valuable insights into digital marketing strategies and consumer behavior analysis. The internship provided me with hands-on experience in a fast-paced marketing environment.",
      coursesHelped: [
        "Digital Marketing",
        "Consumer Behavior",
        "Marketing Research",
      ],
      recommendation: true,
      lastEdited: "2024-10-01",
    },
    {
      id: 3,
      title: "Data Analysis Internship Report",
      company: "Data Insights Inc",
      date: "2024-08-20",
      status: "flagged",
      intro:
        "This report covers my experience as a data analysis intern at Data Insights Inc.",
      body: "During my internship, I worked with the data analytics team to analyze customer data and develop insights for business decisions. I used tools such as Python, SQL, and Power BI to clean, analyze, and visualize data. The experience helped me understand the practical applications of data analysis in a business context.",
      coursesHelped: ["Data Analysis", "Statistics", "Programming"],
      recommendation: false,
      feedbackComments:
        "Report needs more detailed examples of your work and specific outcomes of your analysis. Please revise and resubmit.",
      lastEdited: "2024-08-15",
    },
    {
      id: 4,
      title: "Software Engineering Internship Report",
      company: "Future Systems Egypt",
      date: "2024-09-15",
      status: "rejected",
      intro:
        "This report summarizes my three-month internship experience at Future Systems Egypt as a software engineering intern.",
      body: "During my internship at Future Systems Egypt, I worked on backend development for their customer relationship management system. I implemented several API endpoints using Node.js and Express, integrated MongoDB for data storage, and collaborated with the frontend team to ensure seamless data flow. I also participated in code reviews and agile sprint planning meetings. The internship taught me a lot about building scalable applications and working in a team environment.",
      coursesHelped: [
        "Software Engineering",
        "Database Systems",
        "Web Development",
        "Agile Methodologies",
      ],
      recommendation: true,
      feedbackComments:
        "The report doesn't meet our length requirements and lacks sufficient detail about the technical challenges encountered. Additionally, there are several grammatical errors throughout the document.",
      lastEdited: "2024-09-10",
    },
    {
      id: 5,
      title: "UX/UI Design Internship Report",
      company: "Creative Studio Egypt",
      date: "2024-07-30",
      status: "flagged",
      intro:
        "This report documents my experience as a UX/UI design intern at Creative Studio Egypt, where I worked on creating user interfaces for mobile applications.",
      body: "At Creative Studio Egypt, I was assigned to the mobile design team where I created wireframes, prototypes, and final UI designs for two client projects. I conducted user research and usability testing to validate design decisions and improve user flows. I learned to use Figma and Adobe XD for collaborative design work and how to effectively communicate design decisions to developers and stakeholders. The internship enhanced my understanding of the design process in a commercial setting.",
      coursesHelped: [
        "UI/UX Design",
        "User Research",
        "Mobile App Development",
        "Interactive Design",
      ],
      recommendation: true,
      feedbackComments:
        "Your report lacks visual examples of your work. Please include screenshots or links to your portfolio showcasing the designs you created during the internship. Also, there's minimal discussion of user research methodologies.",
      lastEdited: "2024-07-25",
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Appeal functionality state variables
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [appealMessage, setAppealMessage] = useState("");
  const [appealSuccess, setAppealSuccess] = useState(false);
  const [appealDocs, setAppealDocs] = useState(null);

  const [editableReport, setEditableReport] = useState({
    title: "",
    company: "",
    intro: "",
    body: "",
    coursesHelped: [],
    recommendation: true,
  });
  const [availableCourses, setAvailableCourses] = useState([
    "Web Development",
    "Database Systems",
    "Software Engineering",
    "Data Analysis",
    "Statistics",
    "Programming",
    "Digital Marketing",
    "Consumer Behavior",
    "Marketing Research",
    "UI/UX Design",
    "Mobile App Development",
  ]);
  const [newCourse, setNewCourse] = useState("");

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setIsEditing(true);
    setEditableReport({
      title: "",
      company: "",
      intro: "",
      body: "",
      coursesHelped: [],
      recommendation: true,
    });
    setSelectedReport(null);
  };

  const handleEditReport = (report) => {
    setIsCreatingNew(false);
    setIsEditing(true);
    setEditableReport({
      ...report,
    });
    setSelectedReport(report);
  };

  const handleSaveReport = () => {
    if (isCreatingNew) {
      const newReport = {
        id: reports.length + 1,
        ...editableReport,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
        lastEdited: new Date().toISOString().split("T")[0],
      };
      setReports([...reports, newReport]);
      setSelectedReport(newReport);
    } else {
      const updatedReports = reports.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              ...editableReport,
              lastEdited: new Date().toISOString().split("T")[0],
              status: report.status === "flagged" ? "pending" : report.status, // If flagged, resubmit as pending
            }
          : report
      );
      setReports(updatedReports);
      setSelectedReport({ ...selectedReport, ...editableReport });
    }
    setIsEditing(false);
    setIsCreatingNew(false);
  };

  const handleDeleteReport = (reportId) => {
    if (confirm("Are you sure you want to delete this report?")) {
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
      setSelectedReport(null);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableReport({ ...editableReport, [field]: value });
  };

  const handleCourseSelect = (e) => {
    const course = e.target.value;
    if (
      course &&
      !editableReport.coursesHelped.includes(course) &&
      course !== "Select a course"
    ) {
      setEditableReport({
        ...editableReport,
        coursesHelped: [...editableReport.coursesHelped, course],
      });
    }
  };

  const handleAddCustomCourse = () => {
    if (
      newCourse.trim() !== "" &&
      !editableReport.coursesHelped.includes(newCourse)
    ) {
      setEditableReport({
        ...editableReport,
        coursesHelped: [...editableReport.coursesHelped, newCourse],
      });
      setNewCourse("");
    }
  };

  const handleRemoveCourse = (course) => {
    setEditableReport({
      ...editableReport,
      coursesHelped: editableReport.coursesHelped.filter((c) => c !== course),
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      case "flagged":
        return "bg-orange-500/20 text-orange-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "rejected":
        return <XCircle className="h-4 w-4 mr-1" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
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

  const handleAppealSubmit = () => {
    // In a real app, this would send an appeal request to the backend
    // For demo purposes, we'll simulate a successful appeal submission

    setAppealSuccess(true);

    // Reset after 3 seconds and close modal
    setTimeout(() => {
      setAppealSuccess(false);
      setIsAppealModalOpen(false);
      setAppealMessage("");
      setAppealDocs(null);

      // For demo purposes, change the report status to "pending" to simulate the appeal has been submitted
      if (selectedReport) {
        const updatedReports = reports.map((report) =>
          report.id === selectedReport.id
            ? {
                ...report,
                status: "pending",
                appealed: true,
                feedbackComments:
                  report.feedbackComments + " [Appeal submitted]",
              }
            : report
        );
        setReports(updatedReports);
        setSelectedReport({
          ...selectedReport,
          status: "pending",
          appealed: true,
          feedbackComments:
            selectedReport.feedbackComments + " [Appeal submitted]",
        });
      }
    }, 3000);
  };

  const handleAppealFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAppealDocs(e.target.files[0]);
    }
  };

  const handleRemoveAppealFile = () => {
    setAppealDocs(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Internship Reports</h1>
          <p className="text-gray-400">
            Create, view, and manage your internship reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
            onClick={handleCreateNew}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reports List - takes 1/3 on desktop, full on mobile */}
        <div className="md:col-span-1">
          <Card className="bg-black border-gray-800 shadow-s">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Your Reports ({reports.length})
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search reports..."
                    className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                    onChange={(e) => {
                      // You can implement report filtering here if needed
                    }}
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-800 max-h-[700px] overflow-y-auto">
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <div
                      key={report.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                        selectedReport &&
                        selectedReport.id === report.id &&
                        !isCreatingNew
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedReport(report);
                        setIsCreatingNew(false);
                        setIsEditing(false);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">
                            {report.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {report.company}
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
                      <div className="text-xs text-gray-500">
                        Submitted: {formatDate(report.date)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <FileText className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white">
                      No reports found
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Create your first internship report.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Details - takes 2/3, full on mobile */}
        <div className="md:col-span-2">
          {isEditing ? (
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  {isCreatingNew ? "Create New Report" : "Edit Report"}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Report Title
                    </label>
                    <Input
                      type="text"
                      className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                      placeholder="Enter report title"
                      value={editableReport.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                      placeholder="Enter company name"
                      value={editableReport.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Introduction
                    </label>
                    <textarea
                      className="w-full h-20 bg-gray-900 border border-gray-700 rounded-md p-2 text-white resize-none focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/50 focus:outline-none"
                      placeholder="Write an introduction for your report"
                      value={editableReport.intro}
                      onChange={(e) =>
                        handleInputChange("intro", e.target.value)
                      }
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Report Body
                    </label>
                    <textarea
                      className="w-full h-40 bg-gray-900 border border-gray-700 rounded-md p-2 text-white resize-none focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/50 focus:outline-none"
                      placeholder="Describe your internship experience, responsibilities, challenges, and learnings"
                      value={editableReport.body}
                      onChange={(e) =>
                        handleInputChange("body", e.target.value)
                      }
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Courses That Helped
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editableReport.coursesHelped.map((course, index) => (
                        <Badge
                          key={index}
                          className="bg-gray-800 text-white flex items-center gap-1"
                        >
                          {course}
                          <XCircle
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => handleRemoveCourse(course)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <select
                          className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white"
                          onChange={handleCourseSelect}
                          value="Select a course"
                        >
                          <option value="Select a course" disabled>
                            Select a course
                          </option>
                          {availableCourses
                            .filter(
                              (course) =>
                                !editableReport.coursesHelped.includes(course)
                            )
                            .map((course, index) => (
                              <option key={index} value={course}>
                                {course}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                          placeholder="Add custom course"
                          value={newCourse}
                          onChange={(e) => setNewCourse(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                          onClick={handleAddCustomCourse}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Would you recommend this company to other students?
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="recommend-yes"
                          className="mr-2 accent-[#FF6F1B]"
                          checked={editableReport.recommendation}
                          onChange={() =>
                            handleInputChange("recommendation", true)
                          }
                        />
                        <label
                          htmlFor="recommend-yes"
                          className="text-white cursor-pointer"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="recommend-no"
                          className="mr-2 accent-[#FF6F1B]"
                          checked={!editableReport.recommendation}
                          onChange={() =>
                            handleInputChange("recommendation", false)
                          }
                        />
                        <label
                          htmlFor="recommend-no"
                          className="text-white cursor-pointer"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                    onClick={() => {
                      setIsEditing(false);
                      setIsCreatingNew(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                    onClick={handleSaveReport}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isCreatingNew ? "Submit Report" : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : selectedReport ? (
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedReport.title}
                    </h2>
                    <div className="flex items-center text-gray-400 mt-1">
                      <span>{selectedReport.company}</span>
                      <span className="mx-2">•</span>
                      <span>
                        Submitted on {formatDate(selectedReport.date)}
                      </span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(selectedReport.status)}>
                    <div className="flex items-center">
                      {getStatusIcon(selectedReport.status)}
                      <span>
                        {selectedReport.status.charAt(0).toUpperCase() +
                          selectedReport.status.slice(1)}
                      </span>
                    </div>
                  </Badge>
                </div>

                {/* Feedback for flagged or rejected reports */}
                {(selectedReport.status === "flagged" ||
                  selectedReport.status === "rejected") &&
                  selectedReport.feedbackComments && (
                    <div
                      className={`mb-6 p-4 rounded-lg ${
                        selectedReport.status === "flagged"
                          ? "bg-orange-500/10 border border-orange-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}
                    >
                      <h3
                        className={`text-lg font-medium flex items-center mb-2 ${
                          selectedReport.status === "flagged"
                            ? "text-orange-400"
                            : "text-red-400"
                        }`}
                      >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Feedback from SCAD Office
                      </h3>
                      <p className="text-gray-300">
                        {selectedReport.feedbackComments}
                      </p>

                      <div className="mt-4 flex gap-2">
                        {(selectedReport.status === "rejected" ||
                          selectedReport.status === "flagged") && (
                          <Button
                            className="bg-black border-[#FF6F1B]/30 text-[#FF6F1B] hover:bg-[#FF6F1B]/10"
                            onClick={() => setIsAppealModalOpen(true)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Appeal This Decision
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Introduction
                    </h3>
                    <p className="text-gray-300">{selectedReport.intro}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Body
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">
                      {selectedReport.body}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Courses That Helped
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.coursesHelped.map((course, index) => (
                        <Badge
                          key={index}
                          className="bg-[#FF6F1B]/20 text-[#FF6F1B]"
                        >
                          <Book className="h-3 w-3 mr-1" /> {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Recommendation
                    </h3>
                    <p className="text-gray-300">
                      {selectedReport.recommendation
                        ? "I would recommend this company to other students."
                        : "I would not recommend this company to other students."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Last edited: {formatDate(selectedReport.lastEdited)}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                        onClick={() => handleEditReport(selectedReport)}
                        disabled={selectedReport.status === "approved"}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                        onClick={() => handleDeleteReport(selectedReport.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black border-gray-800 shadow-s h-full flex items-center justify-center">
              <CardContent className="p-6 text-center">
                <div className="bg-gray-800/30 rounded-full p-6 inline-flex mx-auto mb-4">
                  <FileText className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  Select a report or create a new one
                </h3>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">
                  Create and submit reports about your internship experience to
                  share insights with SCAD office and other students.
                </p>
                <Button
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white mt-6"
                  onClick={handleCreateNew}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Report
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Appeal Modal */}
      <Dialog open={isAppealModalOpen} onOpenChange={setIsAppealModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Appeal{" "}
              {selectedReport?.status === "flagged" ? "Flagged" : "Rejected"}{" "}
              Report
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit an appeal for your{" "}
              {selectedReport?.status === "flagged" ? "flagged" : "rejected"}{" "}
              report for {selectedReport?.company}.
            </DialogDescription>
          </DialogHeader>

          {!appealSuccess ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Appeal Reason <span className="text-red-500 ml-1">*</span>
                </label>
                <Textarea
                  value={appealMessage}
                  onChange={(e) => setAppealMessage(e.target.value)}
                  placeholder="Explain why you believe your report should be reconsidered. Include any additional information or context that may help your case."
                  className="h-40 bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Supporting Documents (Optional)
                </label>
                {!appealDocs ? (
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-[#FF6F1B] transition-all cursor-pointer">
                    <input
                      type="file"
                      id="appeal-docs-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleAppealFileChange}
                    />
                    <label
                      htmlFor="appeal-docs-upload"
                      className="cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">
                        Click to upload supporting documents
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
                      <span className="text-white">{appealDocs.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={handleRemoveAppealFile}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-2 flex items-start">
                <AlertTriangle className="h-4 w-4 text-[#FF6F1B] mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-gray-400">
                  Your appeal will be reviewed by the SCAD Office. Please be
                  professional and provide clear, specific reasons for your
                  appeal.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500/20 mb-4">
                <MessageSquare className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">
                Appeal Submitted!
              </h3>
              <p className="text-gray-400">
                Your appeal for the {selectedReport?.title} report has been
                successfully submitted. It will be reviewed by the SCAD Office.
              </p>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {!appealSuccess ? (
              <>
                <Button
                  onClick={() => setIsAppealModalOpen(false)}
                  variant="outline"
                  className="bg-black border-gray-700 hover:bg-gray-800 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAppealSubmit}
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                  disabled={!appealMessage.trim()}
                >
                  Submit Appeal
                </Button>
              </>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
