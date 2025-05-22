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
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function StudentSidebar({
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
      name: "major",
      label: "My Major",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      name: "companies",
      label: "Suggested Companies",
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
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white font-bold mr-2">
                S
              </div>
              <span className="text-white font-bold">Student Portal</span>
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
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC1024]/60 to-[#FF6F1B]/60 flex items-center justify-center font-bold text-white">
                A
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Ahmed Mohamed</p>
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
            <button
              className="flex items-center w-full p-3 rounded-lg text-left text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
