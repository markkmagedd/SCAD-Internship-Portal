"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  Briefcase,
  User,
  GraduationCap,
  FileText,
  Star,
  Bell,
  Video,
  Calendar,
  Award,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProStudentSidebar({
  activeItem = "dashboard",
  onNavigate,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleNavigate = (item) => {
    if (onNavigate) {
      onNavigate(item);
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  const navItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "profile",
      label: "My Profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "internships",
      label: "Internships",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "applications",
      label: "My Applications",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "reports",
      label: "My Reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "assessments",
      label: "Assessments",
      icon: <Award className="h-5 w-5" />,
      isPro: true,
    },
    {
      name: "workshops",
      label: "Workshops",
      icon: <Video className="h-5 w-5" />,
      isPro: true,
    },
    {
      name: "appointments",
      label: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      isPro: true,
    },
    {
      name: "major",
      label: "My Major",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      name: "companies",
      label: "Partner Companies",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`h-full bg-black transition-all duration-300 border-r border-gray-800 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between p-4 border-b border-gray-800">
          {isSidebarOpen && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white font-bold mr-2 relative">
                S
                <Badge className="absolute -top-2 -right-3 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] border-0 px-1.5 py-0.5 text-[0.6rem]">
                  PRO
                </Badge>
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold">Pro Student</span>
                <Badge className="ml-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white border-0 px-1.5 py-0.5 text-[0.6rem]">
                  PRO
                </Badge>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-black border hover:border-grey-400 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer rounded-full transition-colors duration-300"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-all duration-300 ${
                    activeItem === item.name
                      ? "bg-gradient-to-r from-[#EC1024]/30 to-[#FF6F1B]/30 text-white"
                      : "text-white hover:cursor-pointer hover:bg-gradient-to-r hover:from-[#EC1024]/30 hover:to-[#FF6F1B]/30 hover:text-white"
                  }`}
                  onClick={() => handleNavigate(item.name)}
                >
                  {item.icon}
                  {isSidebarOpen && (
                    <div className="ml-3 flex items-center">
                      <span>{item.label}</span>
                      {item.isPro && (
                        <Badge className="ml-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white border-0 px-1.5 py-0.5 text-[0.6rem]">
                          PRO
                        </Badge>
                      )}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Pro features section */}
        {isSidebarOpen && (
          <div className="px-4 py-3 mx-2 mb-4 rounded-lg bg-gradient-to-r from-[#EC1024]/10 to-[#FF6F1B]/10 border border-[#FF6F1B]/20">
            <div className="flex items-center mb-2">
              <Sparkles className="h-4 w-4 text-[#FF6F1B] mr-2" />
              <h4 className="text-white text-sm font-medium">Pro Features</h4>
            </div>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-[#FF6F1B] mr-1.5" />
                Video appointments
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-[#FF6F1B] mr-1.5" />
                Premium opportunities
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-3 w-3 text-[#FF6F1B] mr-1.5" />
                Career coaching
              </li>
            </ul>
          </div>
        )}

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC1024]/60 to-[#FF6F1B]/60 flex items-center justify-center font-bold text-white relative">
                A
                <div className="absolute -bottom-1 -right-1 bg-green-500 h-3.5 w-3.5 rounded-full border-2 border-black"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <p className="text-white text-sm font-medium">
                    Ahmed Mohamed
                  </p>
                  <Badge className="ml-1.5 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white border-0 px-1 py-0 text-[0.6rem]">
                    PRO
                  </Badge>
                </div>
                <p className="text-gray-400 text-xs">Computer Science - GUC</p>
              </div>
              <button
                className="text-gray-400 hover:text-[#FF6F1B] rounded-md p-1 transition-colors duration-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC1024]/60 to-[#FF6F1B]/60 flex items-center justify-center font-bold text-white relative">
                A
                <div className="absolute -bottom-1 -right-1 bg-green-500 h-3.5 w-3.5 rounded-full border-2 border-black"></div>
              </div>
              <button
                className="flex items-center justify-center w-full p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
