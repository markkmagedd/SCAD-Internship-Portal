"use client";

import { useState } from "react";
import {
  GraduationCap,
  Book,
  CheckCircle,
  ChevronRight,
  Calendar,
  Search,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function MajorPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [currentMajor, setCurrentMajor] = useState({
    name: "Computer Science",
    semester: 6,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Sample majors data
  const majors = [
    {
      id: 1,
      name: "Computer Science",
      college: "College of Engineering & IT",
      totalSemesters: 8,
      description:
        "A program focused on computing, programming, algorithms, and software development.",
      courses: [
        "Introduction to Programming",
        "Data Structures and Algorithms",
        "Database Systems",
        "Operating Systems",
        "Software Engineering",
        "Computer Networks",
        "Artificial Intelligence",
        "Web Development",
      ],
      icon: <GraduationCap />,
    },
    {
      id: 2,
      name: "Business Administration",
      college: "College of Business",
      totalSemesters: 8,
      description:
        "A program focused on business operations, management, and leadership skills.",
      courses: [
        "Principles of Management",
        "Marketing Fundamentals",
        "Financial Accounting",
        "Business Ethics",
        "Organizational Behavior",
        "Strategic Management",
        "Business Law",
        "Operations Management",
      ],
      icon: <Book />,
    },
    {
      id: 3,
      name: "Electrical Engineering",
      college: "College of Engineering & IT",
      totalSemesters: 8,
      description:
        "A program focused on electrical systems, electronics, and power generation.",
      courses: [
        "Circuit Analysis",
        "Digital Logic Design",
        "Electromagnetics",
        "Signal Processing",
        "Control Systems",
        "Power Systems",
        "Microelectronics",
        "Communication Systems",
      ],
      icon: <GraduationCap />,
    },
    {
      id: 4,
      name: "Graphic Design",
      college: "College of Arts & Sciences",
      totalSemesters: 8,
      description:
        "A program focused on visual communication, design principles, and digital media.",
      courses: [
        "Design Fundamentals",
        "Typography",
        "Digital Imaging",
        "Web Design",
        "Animation",
        "Brand Identity",
        "UX/UI Design",
        "Portfolio Development",
      ],
      icon: <GraduationCap />,
    },
    {
      id: 5,
      name: "Marketing",
      college: "College of Business",
      totalSemesters: 8,
      description:
        "A program focused on marketing strategies, consumer behavior, and brand management.",
      courses: [
        "Principles of Marketing",
        "Consumer Behavior",
        "Market Research",
        "Digital Marketing",
        "Brand Management",
        "Integrated Marketing Communications",
        "Retail Marketing",
        "International Marketing",
      ],
      icon: <Book />,
    },
  ];

  // Filter majors based on search term
  const filteredMajors = majors.filter((major) =>
    major.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectMajor = (major) => {
    setSelectedMajor(major);
    setSelectedSemester(null); // Reset semester selection
  };

  const handleSelectSemester = (semesterNumber) => {
    setSelectedSemester(semesterNumber);
  };

  const handleUpdateMajor = () => {
    if (selectedMajor && selectedSemester) {
      setCurrentMajor({
        name: selectedMajor.name,
        semester: selectedSemester,
      });
      setShowConfirmation(true);

      // In a real app, you would save this to the backend
      setTimeout(() => {
        setShowConfirmation(false);
        setSelectedMajor(null);
        setSelectedSemester(null);
      }, 3000);
    }
  };

  // Generate array of semester numbers
  const getSemesterNumbers = (totalSemesters) => {
    return Array.from({ length: totalSemesters }, (_, i) => i + 1);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Major</h1>
          <p className="text-gray-400">
            View available majors and update your major/semester
          </p>
        </div>
      </div>

      {/* Current Major Card */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Your Current Major
          </h2>
          <div className="bg-gray-900/30 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">
                  {currentMajor.name}
                </h3>
                <p className="text-gray-400">
                  Current Semester: {currentMajor.semester}
                </p>
              </div>
            </div>
            <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B] mt-4 md:mt-0">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
          <span className="text-green-400">
            Your major and semester have been updated successfully.
          </span>
        </div>
      )}

      {/* Search and Majors List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Majors List */}
        <div className="md:col-span-1">
          <Card className="bg-black border-gray-800 shadow-s">
            <CardContent className="p-6">
              {/* Search bar */}
              <div className="mb-6 bg-black border-gray-800 shadow-s rounded-lg p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search majors..."
                    className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-800 max-h-[500px] overflow-y-auto">
                {filteredMajors.map((major) => (
                  <div
                    key={major.id}
                    className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                      selectedMajor && selectedMajor.id === major.id
                        ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                        : ""
                    }`}
                    onClick={() => handleSelectMajor(major)}
                  >
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 p-2 rounded-full mr-3">
                        <div className="text-[#FF6F1B]">{major.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{major.name}</h3>
                        <p className="text-sm text-gray-400">{major.college}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredMajors.length === 0 && (
                  <div className="p-8 text-center">
                    <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white">
                      No majors found
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Try adjusting your search term.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Major Details and Semester Selection */}
        <div className="md:col-span-2">
          {selectedMajor ? (
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedMajor.name}
                    </h2>
                    <p className="text-gray-400">{selectedMajor.college}</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {selectedMajor.totalSemesters} Semesters
                  </Badge>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    About this Major
                  </h3>
                  <p className="text-gray-300">{selectedMajor.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Key Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedMajor.courses.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-900/30 p-3 rounded-lg"
                      >
                        <Book className="h-4 w-4 mr-3 text-[#FF6F1B]" />
                        <span className="text-white">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Select Your Semester
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {getSemesterNumbers(selectedMajor.totalSemesters).map(
                      (semesterNumber) => (
                        <div
                          key={semesterNumber}
                          className={`p-3 border rounded-lg text-center cursor-pointer transition-all hover:scale-105 ${
                            selectedSemester === semesterNumber
                              ? "border-[#FF6F1B] bg-[#FF6F1B]/10"
                              : "border-gray-700 bg-gray-900/30"
                          }`}
                          onClick={() => handleSelectSemester(semesterNumber)}
                        >
                          <Calendar className="h-5 w-5 mx-auto mb-1 text-[#FF6F1B]" />
                          <span className="text-white font-medium">
                            Semester {semesterNumber}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      className={`relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group ${
                        !selectedSemester ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={!selectedSemester}
                      onClick={handleUpdateMajor}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                        <CheckCircle className="h-5 w-5" />
                      </span>
                      <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Confirm Selection
                      </span>
                      <span className="relative invisible">
                        Confirm Selection
                      </span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black border-gray-800 shadow-s h-full flex items-center justify-center">
              <CardContent className="p-6 text-center">
                <div className="bg-gray-800/30 rounded-full p-6 inline-flex mx-auto mb-4">
                  <GraduationCap className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-medium text-white">
                  Select a major to view details
                </h3>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">
                  Choose a major from the list to see more information and
                  select your semester.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
