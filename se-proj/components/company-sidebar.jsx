import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  FileEdit,
  Users,
  UserCircle,
  Briefcase,
} from "lucide-react";

export default function CompanySidebar({
  activeItem = "dashboard",
  onNavigate,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNavigate = (item) => {
    if (onNavigate) {
      onNavigate(item);
    }
  };

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
            <div className="text-white font-bold text-xl bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-transparent bg-clip-text">
              SCAD Portal
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-[#FF6F1B]/20 rounded-full"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-2">
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                  activeItem === "dashboard"
                    ? "bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => handleNavigate("dashboard")}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Dashboard</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                  activeItem === "posts"
                    ? "bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => handleNavigate("posts")}
              >
                <FileEdit className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Manage Posts</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                  activeItem === "applications"
                    ? "bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => handleNavigate("applications")}
              >
                <Users className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Applications</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                  activeItem === "interns"
                    ? "bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => handleNavigate("interns")}
              >
                <Briefcase className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Manage Interns</span>}
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                  activeItem === "profile"
                    ? "bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => handleNavigate("profile")}
              >
                <UserCircle className="h-5 w-5 mr-3" />
                {isSidebarOpen && <span>Company Profile</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center w-full p-3 rounded-lg text-left text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
