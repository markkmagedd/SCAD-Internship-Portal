import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Award,
  Calendar,
  BarChart3,
} from "lucide-react";

export default function SCADSidebar({ activeItem = "dashboard", onNavigate }) {
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

  const sidebarItems = [
    {
      name: "dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
    },
    {
      name: "companies",
      icon: <Briefcase className="h-5 w-5" />,
      label: "Companies",
    },
    {
      name: "internships",
      icon: <Briefcase className="h-5 w-5" />,
      label: "Internships",
    },
    {
      name: "students",
      icon: <Users className="h-5 w-5" />,
      label: "Students",
    },
    {
      name: "reports",
      icon: <FileText className="h-5 w-5" />,
      label: "Reports",
    },
    {
      name: "workshops",
      icon: <Award className="h-5 w-5" />,
      label: "Workshops",
    },
    {
      name: "appointments",
      icon: <Calendar className="h-5 w-5" />,
      label: "Appointments",
    },
    {
      name: "statistics",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Statistics",
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
              <span className="text-white font-bold">SCAD Office</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-white hover:bg-black border hover:border-grey-400 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer rounded-full"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 py-6">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
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

        {/* Logout button */}
        <div className="p-4 border-t border-gray-800">
          <button
            className="flex items-center w-full p-3 rounded-lg text-left text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
