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
      supervisorName: "Mr. Ahmed Hassan",
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
      supervisorName: "Ms. Fatima Salem",
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
      supervisorName: "Dr. Osama Mohamed",
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
      supervisorName: "Mr. Ahmed Hassan",
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
      supervisorName: "Ms. Nada Ibrahim",
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  // Function to update report status
  const handleStatusChange = (reportId, newStatus, feedbackComments = "") => {
    // Update the report status in the reports array
    const updatedReports = reports.map((report) =>
      report.id === reportId
        ? {
            ...report,
            status: newStatus,
            feedbackComments:
              newStatus === "approved"
                ? "This report has been approved by the faculty member."
                : feedbackComments,
          }
        : report
    );

    setReports(updatedReports);

    // Update the selected report if it's the one being updated
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({
        ...selectedReport,
        status: newStatus,
        feedbackComments:
          newStatus === "approved"
            ? "This report has been approved by the faculty member."
            : feedbackComments,
      });
    }
  };

  // Function to show feedback dialog when flagging or rejecting a report
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [pendingStatus, setPendingStatus] = useState(null);

  const showFeedbackDialog = (status) => {
    setPendingStatus(status);
    setFeedbackComment("");
    setIsFeedbackDialogOpen(true);
  };

  const submitFeedback = () => {
    if (selectedReport && pendingStatus) {
      handleStatusChange(selectedReport.id, pendingStatus, feedbackComment);
      setIsFeedbackDialogOpen(false);
      setPendingStatus(null);
    }
  };

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
            }
          : report
      );
      setReports(updatedReports);
      setSelectedReport({
        ...selectedReport,
        ...editableReport,
        lastEdited: new Date().toISOString().split("T")[0],
      });
    }
    setIsEditing(false);
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Internship Reports</h1>
          <p className="text-gray-400">
            Review, evaluate, and manage student internship reports
          </p>
        </div>
        <div className="flex gap-2">
          {/* Faculty members shouldn't create reports */}
          {/* <Button
            className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
            onClick={handleCreateNew}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Report
          </Button> */}
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
                      Supervisor Name
                    </label>
                    <Input
                      type="text"
                      className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                      placeholder="Enter supervisor name"
                      value={editableReport.supervisorName || ""}
                      onChange={(e) =>
                        handleInputChange("supervisorName", e.target.value)
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
                      {selectedReport.supervisorName && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Supervisor: {selectedReport.supervisorName}
                          </span>
                        </>
                      )}
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
                        Your Feedback to Student
                      </h3>
                      <p className="text-gray-300">
                        {selectedReport.feedbackComments}
                      </p>

                      <div className="mt-4 flex gap-2">
                        {/* Remove the appeal button */}
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
                      {/* Add status change buttons */}
                      {selectedReport.status !== "approved" && (
                        <Button
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() =>
                            handleStatusChange(selectedReport.id, "approved")
                          }
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      )}
                      {selectedReport.status !== "flagged" && (
                        <Button
                          className="bg-orange-600 hover:bg-orange-700 text-white"
                          onClick={() => showFeedbackDialog("flagged")}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Flag
                        </Button>
                      )}
                      {selectedReport.status !== "rejected" && (
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => showFeedbackDialog("rejected")}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      )}
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
                  Review and evaluate student internship reports. You can
                  approve reports, flag them for revisions, or reject reports
                  that don't meet requirements.
                </p>
                {/* Faculty members shouldn't create reports */}
                {/* <Button
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white mt-6"
                  onClick={handleCreateNew}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Report
                </Button> */}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog
        open={isFeedbackDialogOpen}
        onOpenChange={setIsFeedbackDialogOpen}
      >
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Provide Feedback</DialogTitle>
            <DialogDescription className="text-gray-400">
              {pendingStatus === "flagged"
                ? "Flag a report that needs revisions before it can be approved."
                : "Reject a report that does not meet requirements."}{" "}
              SCAD Office will be able to provide additional clarification to
              the student based on your feedback if needed.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-gray-400 text-sm mb-2">
              Please provide feedback for the student
            </label>
            <Textarea
              className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B] h-40"
              placeholder="Enter your feedback comments here. Be specific about what needs to be improved or why the report is being flagged/rejected."
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-black border-gray-700 text-white hover:bg-gray-800"
              onClick={() => setIsFeedbackDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={`text-white ${
                pendingStatus === "flagged"
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={submitFeedback}
              disabled={!feedbackComment.trim()}
            >
              {pendingStatus === "flagged" ? "Flag Report" : "Reject Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
