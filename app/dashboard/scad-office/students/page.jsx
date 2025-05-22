"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Users,
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  FileText,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
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

export default function StudentsPage() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Mohamed",
      studentId: "28-12345",
      faculty: "Faculty of Engineering",
      major: "Computer Engineering",
      gpa: 3.8,
      email: "ahmed.mohamed@student.guc.edu.eg",
      phone: "+20 123 456 7890",
      year: "Senior",
      status: "active",
      internshipStatus: "current", // none, current, completed
      currentInternship: {
        company: "Tech Solutions Inc.",
        position: "Frontend Developer Intern",
        startDate: "2023-06-01",
        endDate: "2023-09-01",
        progress: 75,
        supervisor: "Amr Khaled",
      },
      completedInternships: [
        {
          company: "Global Innovations",
          position: "UI/UX Design Intern",
          startDate: "2022-06-15",
          endDate: "2022-08-15",
          grade: "A",
          supervisor: "Sara Ali",
        },
      ],
      submittedReports: 3,
      pendingReports: 1,
    },
    {
      id: 2,
      name: "Sara Ahmed",
      studentId: "27-54321",
      faculty: "Faculty of Business",
      major: "Marketing",
      gpa: 3.5,
      email: "sara.ahmed@student.guc.edu.eg",
      phone: "+20 111 222 3333",
      year: "Junior",
      status: "active",
      internshipStatus: "current",
      currentInternship: {
        company: "Digital Media Group",
        position: "Marketing Intern",
        startDate: "2023-05-15",
        endDate: "2023-08-15",
        progress: 90,
        supervisor: "Mohamed Hassan",
      },
      completedInternships: [],
      submittedReports: 5,
      pendingReports: 0,
    },
    {
      id: 3,
      name: "Omar Khaled",
      studentId: "29-98765",
      faculty: "Faculty of Engineering",
      major: "Mechatronics",
      gpa: 3.9,
      email: "omar.khaled@student.guc.edu.eg",
      phone: "+20 100 200 3000",
      year: "Senior",
      status: "active",
      internshipStatus: "none",
      currentInternship: null,
      completedInternships: [
        {
          company: "Future Systems",
          position: "Engineering Intern",
          startDate: "2022-06-01",
          endDate: "2022-08-31",
          grade: "A+",
          supervisor: "Youssef Kamal",
        },
        {
          company: "Tech Solutions Inc.",
          position: "Robotics Intern",
          startDate: "2021-07-01",
          endDate: "2021-09-30",
          grade: "A",
          supervisor: "Laila Ahmed",
        },
      ],
      submittedReports: 6,
      pendingReports: 0,
    },
    {
      id: 4,
      name: "Nour Ibrahim",
      studentId: "30-67890",
      faculty: "Faculty of Computer Science",
      major: "Data Science",
      gpa: 3.7,
      email: "nour.ibrahim@student.guc.edu.eg",
      phone: "+20 155 666 7777",
      year: "Junior",
      status: "inactive",
      internshipStatus: "none",
      currentInternship: null,
      completedInternships: [],
      submittedReports: 0,
      pendingReports: 0,
    },
    {
      id: 5,
      name: "Youssef Mohamed",
      studentId: "28-24680",
      faculty: "Faculty of Engineering",
      major: "Computer Engineering",
      gpa: 3.6,
      email: "youssef.mohamed@student.guc.edu.eg",
      phone: "+20 122 333 4444",
      year: "Senior",
      status: "active",
      internshipStatus: "completed",
      currentInternship: null,
      completedInternships: [
        {
          company: "Future Systems",
          position: "Backend Developer Intern",
          startDate: "2023-01-15",
          endDate: "2023-04-15",
          grade: "B+",
        },
      ],
      submittedReports: 4,
      pendingReports: 0,
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterParams, setFilterParams] = useState({
    faculty: "all",
    year: "all",
    internshipStatus: "all",
  });

  // Statistics
  const statistics = {
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "active").length,
    currentlyInterning: students.filter((s) => s.internshipStatus === "current")
      .length,
    completedInternships: students.reduce(
      (sum, student) => sum + student.completedInternships.length,
      0
    ),
    pendingReports: students.reduce(
      (sum, student) => sum + student.pendingReports,
      0
    ),
  };

  // Filter functions
  const handleStudentSearch = () => {
    let filtered = [...students];

    // Filter by tab
    if (activeTab !== "all") {
      if (activeTab === "active") {
        filtered = filtered.filter((student) => student.status === "active");
      } else if (activeTab === "interning") {
        filtered = filtered.filter(
          (student) => student.internshipStatus === "current"
        );
      } else if (activeTab === "completed") {
        filtered = filtered.filter(
          (student) => student.completedInternships.length > 0
        );
      }
    }

    // Filter by faculty
    if (filterParams.faculty !== "all") {
      filtered = filtered.filter(
        (student) => student.faculty === filterParams.faculty
      );
    }

    // Filter by year
    if (filterParams.year !== "all") {
      filtered = filtered.filter(
        (student) => student.year === filterParams.year
      );
    }

    // Filter by internship status
    if (filterParams.internshipStatus !== "all") {
      filtered = filtered.filter(
        (student) => student.internshipStatus === filterParams.internshipStatus
      );
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.major.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "inactive":
        return "bg-gray-500/20 text-gray-400";
      case "current":
        return "bg-blue-500/20 text-blue-400";
      case "completed":
        return "bg-purple-500/20 text-purple-400";
      case "none":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // Unique lists for filters
  const faculties = [...new Set(students.map((s) => s.faculty))];
  const years = [...new Set(students.map((s) => s.year))];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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
                  {statistics.activeStudents} active
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
                  Currently Interning
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.currentlyInterning}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  At various companies
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
                <p className="text-gray-400 mb-1 text-sm">
                  Completed Internships
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.completedInternships}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Total internships completed
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <CheckCircle className="text-[#FF6F1B]" />
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
                  Awaiting submission
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <FileText className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* List view */}
        <div
          className={`${
            selectedStudent ? "w-full md:w-1/2 lg:w-3/5" : "w-full"
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
                        value="active"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Active
                      </TabsTrigger>
                      <TabsTrigger
                        value="interning"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Interning
                      </TabsTrigger>
                      <TabsTrigger
                        value="completed"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Completed
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="relative flex-1 md:w-60">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10 bg-black border-gray-700 text-white"
                      placeholder="Search students..."
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
                      value={filterParams.faculty}
                      onValueChange={(value) =>
                        setFilterParams({ ...filterParams, faculty: value })
                      }
                    >
                      <SelectTrigger className="w-full md:w-48 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Faculty" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Faculties</SelectItem>
                        {faculties.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>
                            {faculty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <Select
                      value={filterParams.year}
                      onValueChange={(value) =>
                        setFilterParams({ ...filterParams, year: value })
                      }
                    >
                      <SelectTrigger className="w-full md:w-36 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Years</SelectItem>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-auto">
                    <Select
                      value={filterParams.internshipStatus}
                      onValueChange={(value) =>
                        setFilterParams({
                          ...filterParams,
                          internshipStatus: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-full md:w-48 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Internship Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="current">
                          Currently Interning
                        </SelectItem>
                        <SelectItem value="completed">
                          Completed Internships
                        </SelectItem>
                        <SelectItem value="none">No Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Students list */}
              <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                {handleStudentSearch().length > 0 ? (
                  handleStudentSearch().map((student) => (
                    <div
                      key={student.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                        selectedStudent?.id === student.id
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              {student.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-400">
                              <span className="mr-2">{student.studentId}</span>
                              <span>•</span>
                              <span className="ml-2">{student.major}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                          {student.internshipStatus !== "none" && (
                            <Badge
                              className={`ml-2 ${getStatusColor(
                                student.internshipStatus
                              )}`}
                            >
                              {student.internshipStatus === "current"
                                ? "Interning"
                                : "Completed"}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">{student.faculty}</span>
                        <span className="text-gray-500">
                          GPA: {student.gpa}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-400">
                    No students match your filters. Try adjusting your search
                    criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail view */}
        {selectedStudent && (
          <div className="w-full md:w-1/2 lg:w-2/5">
            <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {selectedStudent.name}
                      </h2>
                      <p className="text-gray-400">
                        {selectedStudent.studentId}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => setSelectedStudent(null)}
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>

                {/* Student details */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 bg-black p-4 rounded-lg border border-gray-800">
                    <div>
                      <p className="text-sm text-gray-500">Faculty</p>
                      <p className="text-white">{selectedStudent.faculty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Major</p>
                      <p className="text-white">{selectedStudent.major}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="text-white">{selectedStudent.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GPA</p>
                      <p className="text-white">{selectedStudent.gpa}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-white mb-2">
                      Contact Information
                    </h3>
                    <div className="bg-black p-4 rounded-lg border border-gray-800 space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-white">{selectedStudent.email}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-white">{selectedStudent.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Internship */}
                  {selectedStudent.internshipStatus === "current" &&
                    selectedStudent.currentInternship && (
                      <div>
                        <h3 className="font-medium text-white mb-2">
                          Current Internship
                        </h3>
                        <div className="bg-black p-4 rounded-lg border border-gray-800">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-white font-medium">
                                {selectedStudent.currentInternship.position}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {selectedStudent.currentInternship.company}
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                Supervisor:{" "}
                                {selectedStudent.currentInternship.supervisor}
                              </p>
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-400">
                              <Clock className="h-3 w-3 mr-1" /> In Progress
                            </Badge>
                          </div>

                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-400">
                              {selectedStudent.currentInternship.startDate} -{" "}
                              {selectedStudent.currentInternship.endDate}
                            </span>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-1 text-xs">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">
                                {selectedStudent.currentInternship.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5">
                              <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"
                                style={{
                                  width: `${selectedStudent.currentInternship.progress}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Completed Internships */}
                  {selectedStudent.completedInternships.length > 0 && (
                    <div>
                      <h3 className="font-medium text-white mb-2">
                        Completed Internships
                      </h3>
                      <div className="space-y-3">
                        {selectedStudent.completedInternships.map(
                          (internship, index) => (
                            <div
                              key={index}
                              className="bg-black p-4 rounded-lg border border-gray-800"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="text-white font-medium">
                                    {internship.position}
                                  </h4>
                                  <p className="text-gray-400 text-sm">
                                    {internship.company}
                                  </p>
                                  <p className="text-gray-400 text-sm mt-1">
                                    Supervisor: {internship.supervisor}
                                  </p>
                                </div>
                                <Badge className="bg-green-500/20 text-green-400">
                                  Grade: {internship.grade}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-400">
                                {internship.startDate} - {internship.endDate}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Reports */}
                  <div>
                    <h3 className="font-medium text-white mb-2">Reports</h3>
                    <div className="bg-black p-4 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FileText className="text-[#FF6F1B] mr-2 h-5 w-5" />
                          <span className="text-white">Submitted Reports</span>
                        </div>
                        <span className="text-white">
                          {selectedStudent.submittedReports}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="text-[#FF6F1B] mr-2 h-5 w-5" />
                          <span className="text-white">Pending Reports</span>
                        </div>
                        <span className="text-white">
                          {selectedStudent.pendingReports}
                        </span>
                      </div>

                      {selectedStudent.pendingReports > 0 && (
                        <div className="mt-3 flex justify-end">
                          <a
                            href="#"
                            className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                          >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                              <Eye className="h-4 w-4" />
                            </span>
                            <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                              View Report Status
                            </span>
                            <span className="relative invisible">
                              View Report Status
                            </span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between gap-3 mt-4 pt-4 border-t border-gray-800">
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center w-1/2 px-5 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gray-700 group-hover:translate-x-0 ease">
                        <Calendar className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        <Calendar className="h-4 w-4 mr-2" /> Schedule Meeting
                      </span>
                      <span className="relative invisible">
                        Schedule Meeting
                      </span>
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center w-1/2 px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                        <Briefcase className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        <Briefcase className="h-4 w-4 mr-2" /> Internship
                        History
                      </span>
                      <span className="relative invisible">
                        Internship History
                      </span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
