"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Edit,
  Save,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  // Sample student profile data
  const [profile, setProfile] = useState({
    name: "Ahmed Mohamed",
    email: "ahmed.mohamed@student.guc.edu.eg",
    phone: "+20 102 345 6789",
    location: "Cairo, Egypt",
    dateOfBirth: "2002-06-15",
    major: "Computer Science",
    semester: 6,
    gpa: 3.7,
    bio: "Computer Science student at the German University in Cairo specializing in web development and AI. Looking for internship opportunities to apply my skills in a real-world environment.",
    jobInterests: ["Web Development", "Mobile Development", "Machine Learning"],
    skills: ["JavaScript", "Python", "React", "Node.js", "SQL", "TensorFlow"],
    experiences: [
      {
        id: 1,
        title: "Web Developer Intern",
        company: "Tech Solutions Egypt",
        duration: "Summer 2024",
        description:
          "Developed and maintained company website, implemented responsive design, and integrated payment gateway.",
      },
      {
        id: 2,
        title: "Part-time IT Support",
        company: "GUC IT Department",
        duration: "January 2023 - Present",
        description:
          "Assist students and faculty with technical issues, maintain computer labs, and provide training on university systems.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "German University in Cairo",
        years: "2021 - Present",
        gpa: "3.7/4.0",
      },
    ],
  });

  // Edit states
  const [editMode, setEditMode] = useState({
    personalInfo: false,
    bio: false,
    jobInterests: false,
    skills: false,
    experiences: false,
    education: false,
  });

  // New item states
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });

  // Handle edit functions
  const toggleEditMode = (section) => {
    setEditMode({ ...editMode, [section]: !editMode[section] });
  };

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleAddInterest = () => {
    if (
      newInterest.trim() !== "" &&
      !profile.jobInterests.includes(newInterest)
    ) {
      setProfile({
        ...profile,
        jobInterests: [...profile.jobInterests, newInterest],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setProfile({
      ...profile,
      jobInterests: profile.jobInterests.filter(
        (interest) => interest !== interestToRemove
      ),
    });
  };

  const handleExperienceChange = (field, value) => {
    setNewExperience({ ...newExperience, [field]: value });
  };

  const handleAddExperience = () => {
    if (
      newExperience.title.trim() !== "" &&
      newExperience.company.trim() !== ""
    ) {
      const newExp = {
        id: profile.experiences.length + 1,
        ...newExperience,
      };
      setProfile({
        ...profile,
        experiences: [...profile.experiences, newExp],
      });
      setNewExperience({
        title: "",
        company: "",
        duration: "",
        description: "",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-gray-400">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-gray-400">{profile.major}</p>
                <div className="mt-2 flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1 text-[#FF6F1B]" />
                  <span className="text-white">
                    Semester {profile.semester} • GPA: {profile.gpa}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-[#FF6F1B]" />
                  <span className="text-gray-300">{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-[#FF6F1B]" />
                  <span className="text-gray-300">{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-[#FF6F1B]" />
                  <span className="text-gray-300">{profile.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-3 text-[#FF6F1B]" />
                  <span className="text-gray-300">
                    {new Date(profile.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Skills</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                  onClick={() => toggleEditMode("skills")}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {editMode.skills ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-gray-800 text-white flex items-center gap-1"
                      >
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add a skill"
                      className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="bg-black border-gray-700 text-white hover:bg-gray-800"
                      onClick={handleAddSkill}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                      onClick={() => toggleEditMode("skills")}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-black text-[#FF6F1B] border-[#FF6F1B]/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Interests Card */}
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Job Interests
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                  onClick={() => toggleEditMode("jobInterests")}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {editMode.jobInterests ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profile.jobInterests.map((interest, index) => (
                      <Badge
                        key={index}
                        className="bg-gray-800 text-white flex items-center gap-1"
                      >
                        {interest}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveInterest(interest)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Add a job interest"
                      className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="bg-black border-gray-700 text-white hover:bg-gray-800"
                      onClick={handleAddInterest}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                      onClick={() => toggleEditMode("jobInterests")}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.jobInterests.map((interest, index) => (
                    <Badge
                      key={index}
                      className="bg-[#FF6F1B]/20 text-[#FF6F1B]"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* About Me Card */}
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">About Me</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                  onClick={() => toggleEditMode("bio")}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {editMode.bio ? (
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 bg-gray-900 border border-gray-700 rounded-md p-2 text-white resize-none focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/50 focus:outline-none"
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                  ></textarea>
                  <div className="flex justify-end">
                    <Button
                      className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                      onClick={() => toggleEditMode("bio")}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300">{profile.bio}</p>
              )}
            </CardContent>
          </Card>

          {/* Work Experience Card */}
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Work Experience
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                  onClick={() => toggleEditMode("experiences")}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {profile.experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-b border-gray-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-white font-medium">{exp.title}</h4>
                      <span className="text-gray-400 text-sm">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-[#FF6F1B]">{exp.company}</p>
                    <p className="text-gray-300 mt-2">{exp.description}</p>
                  </div>
                ))}

                {editMode.experiences && (
                  <div className="mt-4 bg-gray-900/30 p-4 rounded-lg space-y-4">
                    <h4 className="text-white font-medium">
                      Add New Experience
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">
                          Title
                        </label>
                        <Input
                          type="text"
                          className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                          placeholder="Position title"
                          value={newExperience.title}
                          onChange={(e) =>
                            handleExperienceChange("title", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">
                          Company
                        </label>
                        <Input
                          type="text"
                          className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                          placeholder="Company name"
                          value={newExperience.company}
                          onChange={(e) =>
                            handleExperienceChange("company", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">
                        Duration
                      </label>
                      <Input
                        type="text"
                        className="bg-gray-900 border-gray-700 text-white focus:border-[#FF6F1B]"
                        placeholder="e.g. June 2023 - August 2023"
                        value={newExperience.duration}
                        onChange={(e) =>
                          handleExperienceChange("duration", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full h-20 bg-gray-900 border border-gray-700 rounded-md p-2 text-white resize-none focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/50 focus:outline-none"
                        placeholder="Describe your responsibilities and achievements"
                        value={newExperience.description}
                        onChange={(e) =>
                          handleExperienceChange("description", e.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="bg-black border-gray-700 text-white hover:bg-gray-800"
                        onClick={handleAddExperience}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Experience
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                        onClick={() => toggleEditMode("experiences")}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Education</h3>
              </div>

              <div className="space-y-6">
                {profile.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-b border-gray-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between">
                      <h4 className="text-white font-medium">{edu.degree}</h4>
                      <span className="text-gray-400 text-sm">{edu.years}</span>
                    </div>
                    <p className="text-[#FF6F1B]">{edu.institution}</p>
                    <div className="flex items-center mt-2">
                      <Award className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      <span className="text-gray-300">GPA: {edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
