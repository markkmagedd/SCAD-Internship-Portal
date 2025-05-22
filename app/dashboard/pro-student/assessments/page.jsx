"use client";

import { useState } from "react";
import {
  Award,
  Clock,
  AlertCircle,
  CheckCircle,
  Share2,
  Filter,
  Search,
  BookOpen,
  ChevronRight,
  Timer,
  XCircle,
  Eye,
  PieChart,
  Star,
  BarChart4,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [isScoreShared, setIsScoreShared] = useState(false);

  // Mock data for assessments
  const assessments = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      category: "Technical",
      description: "Test your knowledge of HTML, CSS, and JavaScript basics",
      timeLimit: 30,
      numberOfQuestions: 20,
      difficulty: "Beginner",
      status: "available",
      tags: ["HTML", "CSS", "JavaScript"],
      avgScore: 72,
    },
    {
      id: 2,
      title: "React.js Proficiency",
      category: "Technical",
      description: "Advanced assessment for React.js developers",
      timeLimit: 45,
      numberOfQuestions: 25,
      difficulty: "Advanced",
      status: "available",
      tags: ["React", "JavaScript", "Frontend"],
      avgScore: 68,
    },
    {
      id: 3,
      title: "Database Design Concepts",
      category: "Technical",
      description: "Test your database design and SQL knowledge",
      timeLimit: 40,
      numberOfQuestions: 22,
      difficulty: "Intermediate",
      status: "available",
      tags: ["SQL", "Database", "Design"],
      avgScore: 65,
    },
    {
      id: 4,
      title: "Problem Solving Skills",
      category: "Soft Skills",
      description: "Assess your ability to solve complex problems",
      timeLimit: 60,
      numberOfQuestions: 15,
      difficulty: "Advanced",
      status: "completed",
      score: 82,
      completedDate: "2023-05-12",
      isShared: true,
      tags: ["Problem Solving", "Algorithms"],
      avgScore: 70,
    },
    {
      id: 5,
      title: "Data Structures",
      category: "Technical",
      description: "Test your knowledge of fundamental data structures",
      timeLimit: 45,
      numberOfQuestions: 20,
      difficulty: "Intermediate",
      status: "completed",
      score: 94,
      completedDate: "2023-06-21",
      isShared: false,
      tags: ["Algorithms", "Data Structures", "Computer Science"],
      avgScore: 62,
    },
  ];

  // Filter assessments based on tab, search query, and filter
  const filteredAssessments = assessments.filter((assessment) => {
    // Filter by tab
    if (activeTab === "available" && assessment.status !== "available")
      return false;
    if (activeTab === "completed" && assessment.status !== "completed")
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !assessment.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by category
    if (selectedFilter !== "all" && assessment.category !== selectedFilter)
      return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Assessments</h1>
      <p className="text-gray-400">
        Take online assessments to test your skills and showcase your expertise
        on your profile.
      </p>

      {/* Tabs for available vs completed assessments */}
      <div className="flex space-x-2 border-b border-gray-800">
        <button
          className={`pb-2 px-4 font-medium relative ${
            activeTab === "available"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available Assessments
          {activeTab === "available" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"></div>
          )}
        </button>
        <button
          className={`pb-2 px-4 font-medium relative ${
            activeTab === "completed"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Assessments
          {activeTab === "completed" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"></div>
          )}
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search assessments..."
            className="pl-10 bg-black border border-gray-800 text-white focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full bg-black border border-gray-800 text-white focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black border border-gray-800 text-white">
              <SelectItem
                value="all"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                All Categories
              </SelectItem>
              <SelectItem
                value="Technical"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                Technical
              </SelectItem>
              <SelectItem
                value="Soft Skills"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                Soft Skills
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Assessments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((assessment) => (
            <Card
              key={assessment.id}
              className="bg-black border-gray-800 shadow-sm hover:shadow-[#FF6F1B]/30 hover:border-[#FF6F1B]/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedAssessment(assessment)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <Badge
                    className={`${
                      assessment.status === "completed"
                        ? "bg-[#FF6F1B]/20 text-[#FF6F1B]"
                        : "bg-[#FF6F1B]/10 text-[#FF6F1B]"
                    }`}
                  >
                    <div className="flex items-center">
                      {assessment.status === "completed" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      <span>
                        {assessment.status === "completed"
                          ? "Completed"
                          : "Available"}
                      </span>
                    </div>
                  </Badge>
                  <Badge className="bg-black border border-gray-800 text-white">
                    {assessment.difficulty}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FF6F1B] transition-colors">
                  {assessment.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {assessment.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {assessment.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-black text-gray-300 border-gray-800"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    <span>{assessment.timeLimit} min</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{assessment.numberOfQuestions} questions</span>
                  </div>
                </div>

                {assessment.status === "completed" && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                        <span className="text-white font-semibold">
                          Your Score: {assessment.score}%
                        </span>
                      </div>
                      {assessment.isShared && (
                        <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B] flex items-center">
                          <Share2 className="h-3 w-3 mr-1" />
                          <span>Shared</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <AlertCircle className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No assessments found
            </h3>
            <p className="text-center max-w-md">
              {activeTab === "available"
                ? "There are no available assessments matching your search criteria."
                : "You haven't completed any assessments yet."}
            </p>
          </div>
        )}
      </div>

      {/* Selected Assessment Details */}
      {selectedAssessment && !currentAssessment && (
        <Dialog
          open={!!selectedAssessment}
          onOpenChange={(open) => !open && setSelectedAssessment(null)}
        >
          <DialogContent className="bg-black text-white border border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedAssessment.title}
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-black border border-gray-800 text-white">
                  {selectedAssessment.category}
                </Badge>
                <Badge className="bg-black border border-gray-800 text-white">
                  {selectedAssessment.difficulty}
                </Badge>
                {selectedAssessment.status === "completed" && (
                  <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span>Completed</span>
                  </Badge>
                )}
              </div>

              <p className="text-gray-400 mb-6">
                {selectedAssessment.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center text-gray-400 mb-1">
                    <Timer className="h-4 w-4 mr-2" />
                    <span className="text-sm">Time Limit</span>
                  </div>
                  <p className="text-white font-medium">
                    {selectedAssessment.timeLimit} minutes
                  </p>
                </div>

                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center text-gray-400 mb-1">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm">Questions</span>
                  </div>
                  <p className="text-white font-medium">
                    {selectedAssessment.numberOfQuestions} total
                  </p>
                </div>

                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center text-gray-400 mb-1">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    <span className="text-sm">Avg. Score</span>
                  </div>
                  <p className="text-white font-medium">
                    {selectedAssessment.avgScore}%
                  </p>
                </div>
              </div>

              {selectedAssessment.status === "completed" ? (
                <div className="border border-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Your Results
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white text-xl font-bold">
                      {selectedAssessment.score}%
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-400 mb-1">Completed on</p>
                      <p className="text-white">
                        {selectedAssessment.completedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      className="border-[#FF6F1B] text-[#FF6F1B] hover:bg-[#FF6F1B]/10"
                      onClick={() => setShowShareDialog(true)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      {selectedAssessment.isShared
                        ? "Shared on Profile"
                        : "Share on Profile"}
                    </Button>

                    <Button
                      className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                      onClick={() => {
                        // Reset assessment state and start over
                        setSelectedAssessment({
                          ...selectedAssessment,
                          status: "available",
                        });
                        setUserAnswers({});
                        setCurrentQuestionIndex(0);
                        setAssessmentCompleted(false);
                        setAssessmentResults(null);
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                        <Award className="h-5 w-5" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Retake Assessment
                      </span>
                      <span className="relative invisible">
                        Retake Assessment
                      </span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Before You Begin
                  </h3>
                  <ul className="text-gray-400 space-y-2 mb-4 ml-6 list-disc">
                    <li>
                      You will have {selectedAssessment.timeLimit} minutes to
                      complete the assessment
                    </li>
                    <li>
                      The assessment contains{" "}
                      {selectedAssessment.numberOfQuestions} questions
                    </li>
                    <li>You can't pause the assessment once started</li>
                    <li>Ensure you have a stable internet connection</li>
                  </ul>

                  <Button
                    className="w-full relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                    onClick={() => {
                      // Start the assessment
                      setCurrentAssessment(selectedAssessment);
                      setSelectedAssessment(null);
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                      <Award className="h-5 w-5" />
                    </span>
                    <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      Start Assessment
                    </span>
                    <span className="relative invisible">Start Assessment</span>
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Assessment Taking Interface */}
      {currentAssessment && !assessmentCompleted && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col">
          <div className="border-b border-gray-800 p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                {currentAssessment.title}
              </h2>
              <p className="text-gray-400 text-sm">Assessment in progress</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-black border border-gray-800 px-4 py-2 rounded-lg flex items-center">
                <Timer className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                <span className="text-white font-medium">23:45 remaining</span>
              </div>

              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  // Confirm before exiting
                  if (
                    confirm(
                      "Are you sure you want to exit? Your progress will be lost."
                    )
                  ) {
                    setCurrentAssessment(null);
                    setUserAnswers({});
                    setCurrentQuestionIndex(0);
                  }
                }}
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
            {/* Mock questions data */}
            {(() => {
              const questions = [
                {
                  id: 1,
                  question:
                    "Which of the following is NOT a valid JavaScript data type?",
                  options: ["String", "Number", "Boolean", "Float"],
                  correctAnswer: "Float",
                },
                {
                  id: 2,
                  question:
                    "Which CSS property is used to control the spacing between lines of text?",
                  options: [
                    "line-height",
                    "text-spacing",
                    "letter-spacing",
                    "word-spacing",
                  ],
                  correctAnswer: "line-height",
                },
                {
                  id: 3,
                  question: "What does the 'C' stand for in CSS?",
                  options: ["Cascading", "Colorful", "Creative", "Computed"],
                  correctAnswer: "Cascading",
                },
              ];

              const currentQuestion = questions[currentQuestionIndex];

              return (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B] px-4 py-1">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </Badge>
                    <p className="text-gray-400">
                      {Math.round(
                        (currentQuestionIndex / questions.length) * 100
                      )}
                      % completed
                    </p>
                  </div>

                  <Card className="bg-black border border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">
                        {currentQuestion.question}
                      </h3>

                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border transition-all cursor-pointer ${
                              userAnswers[currentQuestion.id] === option
                                ? "border-[#FF6F1B] bg-[#FF6F1B]/10"
                                : "border-gray-800 bg-black hover:border-gray-600"
                            }`}
                            onClick={() => {
                              setUserAnswers({
                                ...userAnswers,
                                [currentQuestion.id]: option,
                              });
                            }}
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                  userAnswers[currentQuestion.id] === option
                                    ? "border-[#FF6F1B] bg-[#FF6F1B]"
                                    : "border-gray-600"
                                }`}
                              >
                                {userAnswers[currentQuestion.id] === option && (
                                  <CheckCircle className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span className="text-white">{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </div>

          <div className="border-t border-gray-800 p-4 flex justify-between">
            <Button
              variant="outline"
              className="border-gray-700 text-white hover:border-[#FF6F1B] hover:text-[#FF6F1B]"
              disabled={currentQuestionIndex === 0}
              onClick={() =>
                setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
              }
            >
              Previous
            </Button>

            <Button
              className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!userAnswers[currentQuestionIndex + 1]}
              onClick={() => {
                // Sample questions for demo
                const totalQuestions = 3;

                if (currentQuestionIndex < totalQuestions - 1) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                  // Calculate results (mock data)
                  const score = 83;
                  setAssessmentResults({
                    score,
                    correctAnswers: Math.round((score / 100) * totalQuestions),
                    totalQuestions,
                    timeSpent: "27:15",
                    date: new Date().toLocaleDateString(),
                  });
                  setAssessmentCompleted(true);
                }
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                <ChevronRight className="h-5 w-5" />
              </span>
              <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                {currentQuestionIndex === 2 ? "Finish" : "Next"}
              </span>
              <span className="relative invisible">
                {currentQuestionIndex === 2 ? "Finish" : "Next"}
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Assessment Results */}
      {assessmentCompleted && assessmentResults && (
        <Dialog
          open={assessmentCompleted}
          onOpenChange={(open) => !open && setAssessmentCompleted(false)}
        >
          <DialogContent className="bg-black text-white border border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Assessment Results
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-4xl font-bold">
                      {assessmentResults.score}%
                    </div>
                  </div>
                  {assessmentResults.score >= 70 && (
                    <div className="absolute -right-2 -top-2 bg-[#FF6F1B] text-white p-2 rounded-full">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-center text-xl font-semibold text-white mb-6">
                {assessmentResults.score >= 70
                  ? "Congratulations! You passed the assessment."
                  : "You didn't pass this time. Try again!"}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <p className="text-gray-400 text-sm mb-1">Correct Answers</p>
                  <p className="text-white font-medium">
                    {assessmentResults.correctAnswers} /{" "}
                    {assessmentResults.totalQuestions}
                  </p>
                </div>

                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <p className="text-gray-400 text-sm mb-1">Time Spent</p>
                  <p className="text-white font-medium">
                    {assessmentResults.timeSpent}
                  </p>
                </div>

                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <p className="text-gray-400 text-sm mb-1">Completed On</p>
                  <p className="text-white font-medium">
                    {assessmentResults.date}
                  </p>
                </div>

                <div className="bg-black p-4 rounded-lg border border-gray-800">
                  <p className="text-gray-400 text-sm mb-1">Average Score</p>
                  <p className="text-white font-medium">
                    {currentAssessment.avgScore}%
                  </p>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <Button
                  variant="outline"
                  className="border-[#FF6F1B] text-white hover:bg-black bg-black cursor-pointer  hover:text-[#FF6F1B] mr-4"
                  onClick={() => setShowShareDialog(true)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Profile
                </Button>

                <Button
                  className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                  onClick={() => {
                    // Close results and return to assessments list
                    setCurrentAssessment(null);
                    setAssessmentCompleted(false);
                    setAssessmentResults(null);
                    setUserAnswers({});
                    setCurrentQuestionIndex(0);

                    // Update the assessment status in our list (mock functionality)
                    const updatedAssessments = assessments.map((a) => {
                      if (a.id === currentAssessment.id) {
                        return {
                          ...a,
                          status: "completed",
                          score: assessmentResults.score,
                          completedDate: assessmentResults.date,
                          isShared: false,
                        };
                      }
                      return a;
                    });

                    // Note: In a real application, you would update state here
                    // or call an API to update the database
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                  <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Back to Assessments
                  </span>
                  <span className="relative invisible">
                    Back to Assessments
                  </span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Share Score Dialog */}
      {showShareDialog && (
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="bg-black text-white border border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Share Assessment Score
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Choose to display this assessment score on your public profile.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FF6F1B]/20 flex items-center justify-center text-[#FF6F1B]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">
                    {selectedAssessment?.title || currentAssessment?.title}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {assessmentResults?.score || selectedAssessment?.score}%
                    score achieved
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">
                      Display on Profile
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Show your skill assessment on your public profile
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className={`h-8 w-14 ${
                      isScoreShared
                        ? "bg-[#FF6F1B] text-white"
                        : "border border-gray-700"
                    }`}
                    onClick={() => setIsScoreShared(!isScoreShared)}
                  >
                    {isScoreShared ? "ON" : "OFF"}
                  </Button>
                </div>

                {isScoreShared && (
                  <div className="border border-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Preview</h4>
                    <div className="bg-black border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#FF6F1B]/20 flex items-center justify-center text-[#FF6F1B] mr-3">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-white font-medium">
                            {selectedAssessment?.title ||
                              currentAssessment?.title}
                          </h5>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-[#FF6F1B] mr-1" />
                            <span className="text-gray-400 text-xs">
                              {assessmentResults?.score ||
                                selectedAssessment?.score}
                              % •{" "}
                              {selectedAssessment?.difficulty ||
                                currentAssessment?.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                        Verified
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="text-white border-gray-700 hover:border-[#FF6F1B] hover:text-[#FF6F1B]"
                onClick={() => setShowShareDialog(false)}
              >
                Cancel
              </Button>

              <Button
                className="relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                onClick={() => {
                  // Save sharing preference (mock functionality)
                  if (selectedAssessment) {
                    selectedAssessment.isShared = isScoreShared;
                  }
                  // Close dialog
                  setShowShareDialog(false);
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                  <Share2 className="h-5 w-5" />
                </span>
                <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Save Preferences
                </span>
                <span className="relative invisible">Save Preferences</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
