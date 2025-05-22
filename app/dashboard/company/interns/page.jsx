"use client";

import { useState } from "react";
import {
  Search,
  Clock,
  Briefcase,
  Star,
  CheckCircle,
  XCircle,
  Edit,
  Mail,
  CalendarClock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InternsPage() {
  // Mock data - In a real app, this would come from a database
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [filterParams, setFilterParams] = useState({
    status: "all",
  });

  // For evaluation form
  const [evaluation, setEvaluation] = useState({
    performance: 0,
    punctuality: 0,
    teamwork: 0,
    skills: 0,
    comments: "",
  });

  // Helper Functions
  const handleInternSearch = () => {
    // Filter interns by name or job title
    if (!searchTerm) {
      let filtered = [...interns];
      if (filterParams.status !== "all") {
        filtered = filtered.filter(
          (intern) => intern.status === filterParams.status
        );
      }
      return filtered;
    }

    return interns.filter(
      (intern) =>
        (intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          intern.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterParams.status === "all" || intern.status === filterParams.status)
    );
  };

  const updateInternStatus = (internId, newStatus) => {
    // Update intern status
    const updatedInterns = interns.map((intern) =>
      intern.id === internId ? { ...intern, status: newStatus } : intern
    );
    setInterns(updatedInterns);

    if (selectedIntern && selectedIntern.id === internId) {
      setSelectedIntern({ ...selectedIntern, status: newStatus });
    }
  };

  const saveEvaluation = (internId, evaluation) => {
    // Save intern evaluation
    const updatedInterns = interns.map((intern) =>
      intern.id === internId ? { ...intern, evaluation } : intern
    );
    setInterns(updatedInterns);

    if (selectedIntern && selectedIntern.id === internId) {
      setSelectedIntern({ ...selectedIntern, evaluation });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "current":
        return "bg-green-500/20 text-green-400";
      case "complete":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Handle rating selection in evaluation form
  const handleRatingChange = (category, rating) => {
    setEvaluation({
      ...evaluation,
      [category]: rating,
    });
  };

  // Handle comments change in evaluation form
  const handleCommentsChange = (e) => {
    setEvaluation({
      ...evaluation,
      comments: e.target.value,
    });
  };

  // Submit evaluation
  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (selectedIntern) {
      saveEvaluation(selectedIntern.id, evaluation);
    }
  };

  return (
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
                className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
              >
                All Interns
              </TabsTrigger>
              <TabsTrigger
                value="current"
                className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
              >
                Current
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
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
                    (activeTab === "current" && intern.status === "current") ||
                    (activeTab === "completed" && intern.status === "complete")
                )
                .map((intern) => (
                  <div
                    key={intern.id}
                    className={`p-4 cursor-pointer hover:bg-gray-800/50 ${
                      selectedIntern?.id === intern.id
                        ? "bg-gray-800/80 border-l-4 border-l-[#FF6F1B]"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedIntern(intern);
                      if (intern.evaluation) {
                        setEvaluation(intern.evaluation);
                      } else {
                        setEvaluation({
                          performance: 0,
                          punctuality: 0,
                          teamwork: 0,
                          skills: 0,
                          comments: "",
                        });
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-white">{intern.name}</h4>
                      <Badge className={getStatusColor(intern.status)}>
                        {intern.status === "current" ? "Active" : "Completed"}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{intern.role}</p>

                    {intern.status === "current" ? (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1 text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{intern.progress}%</span>
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

              {handleInternSearch().filter(
                (intern) =>
                  activeTab === "all" ||
                  (activeTab === "current" && intern.status === "current") ||
                  (activeTab === "completed" && intern.status === "complete")
              ).length === 0 && (
                <div className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                  <h4 className="text-lg font-medium text-white mb-1">
                    No interns found
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {searchTerm
                      ? "Try adjusting your search"
                      : "There are no interns in this category"}
                  </p>
                </div>
              )}
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
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Mail className="h-4 w-4 mr-2" /> Contact
                    </span>
                    <span className="relative invisible">Contact</span>
                  </a>
                  <Button
                    variant="ghost"
                    className="text-white bg-black border border-gray-800 hover:bg-[#FF6F1B]/25 hover:cursor-pointer rounded-full"
                    onClick={() => setSelectedIntern(null)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Status badge and controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(selectedIntern.status)}>
                    {selectedIntern.status === "current"
                      ? "Active"
                      : "Completed"}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {selectedIntern.startDate} to {selectedIntern.endDate}
                  </span>
                </div>

                {selectedIntern.status === "current" && (
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                    onClick={(e) => {
                      e.preventDefault();
                      updateInternStatus(selectedIntern.id, "complete");
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                      <CheckCircle className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <CheckCircle className="h-4 w-4 mr-2" /> Mark as Completed
                    </span>
                    <span className="relative invisible">
                      Mark as Completed
                    </span>
                  </a>
                )}
              </div>

              {/* Intern details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black border border-gray-800 p-4 rounded-lg mb-6">
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="text-white">{selectedIntern.studentId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-white">{selectedIntern.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="text-white">{selectedIntern.startDate}</p>
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

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-2">
                      <div className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          Next check-in: Tomorrow at 10:00 AM
                        </span>
                      </div>
                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                          <Edit className="h-4 w-4" />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          <Edit className="h-4 w-4 mr-2" /> Update Progress
                        </span>
                        <span className="relative invisible">
                          Update Progress
                        </span>
                      </a>
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
                          <p className="text-sm text-gray-500">Performance</p>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= selectedIntern.evaluation.performance
                                    ? "text-[#FF6F1B]"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Punctuality</p>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= selectedIntern.evaluation.punctuality
                                    ? "text-[#FF6F1B]"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Teamwork</p>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= selectedIntern.evaluation.teamwork
                                    ? "text-[#FF6F1B]"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Skills</p>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= selectedIntern.evaluation.skills
                                    ? "text-[#FF6F1B]"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-1">Comments</p>
                        <p className="text-white bg-gray-800 p-3 rounded">
                          {selectedIntern.evaluation.comments}
                        </p>
                      </div>

                      <div className="flex justify-end mt-4">
                        <a
                          href="#"
                          className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        >
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                            <Edit className="h-4 w-4" />
                          </span>
                          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                            <Edit className="h-4 w-4 mr-2" /> Edit Evaluation
                          </span>
                          <span className="relative invisible">
                            Edit Evaluation
                          </span>
                        </a>
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

                      <form
                        className="space-y-4"
                        onSubmit={handleSubmitEvaluation}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-400 block mb-1">
                              Performance
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    handleRatingChange("performance", star)
                                  }
                                >
                                  <Star
                                    className={`h-6 w-6 cursor-pointer ${
                                      star <= evaluation.performance
                                        ? "text-[#FF6F1B]"
                                        : "text-gray-600 hover:text-[#FF6F1B]/50"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400 block mb-1">
                              Punctuality
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    handleRatingChange("punctuality", star)
                                  }
                                >
                                  <Star
                                    className={`h-6 w-6 cursor-pointer ${
                                      star <= evaluation.punctuality
                                        ? "text-[#FF6F1B]"
                                        : "text-gray-600 hover:text-[#FF6F1B]/50"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400 block mb-1">
                              Teamwork
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    handleRatingChange("teamwork", star)
                                  }
                                >
                                  <Star
                                    className={`h-6 w-6 cursor-pointer ${
                                      star <= evaluation.teamwork
                                        ? "text-[#FF6F1B]"
                                        : "text-gray-600 hover:text-[#FF6F1B]/50"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400 block mb-1">
                              Skills
                            </label>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() =>
                                    handleRatingChange("skills", star)
                                  }
                                >
                                  <Star
                                    className={`h-6 w-6 cursor-pointer ${
                                      star <= evaluation.skills
                                        ? "text-[#FF6F1B]"
                                        : "text-gray-600 hover:text-[#FF6F1B]/50"
                                    }`}
                                  />
                                </button>
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
                            value={evaluation.comments}
                            onChange={handleCommentsChange}
                          />
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                          >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                              <CheckCircle className="h-4 w-4" />
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                              Save Evaluation
                            </span>
                            <span className="relative invisible">
                              Save Evaluation
                            </span>
                          </button>
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
  );
}
