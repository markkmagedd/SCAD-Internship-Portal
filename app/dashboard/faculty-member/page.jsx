"use client";

import { useState } from "react";
import FacultySidebar from "@/components/faculty-sidebar";
import ReportsPage from "./reports/page";
import DashboardPage from "./dashboard/page";
import StatisticsPage from "./statistics/page";
export default function FacultyMemberDashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");

  // Handle navigation from the sidebar
  const handleNavigate = (item) => {
    setActiveItem(item);
  };

  // Render the appropriate page based on active item
  const renderPage = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardPage onNavigate={handleNavigate} />;
      case "reports":
        return <ReportsPage />;
      case "statistics":
        return <StatisticsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex bg-black text-white">
      <FacultySidebar
        activeItem={activeItem}
        onNavigate={(item) => handleNavigate(item)}
      />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-black">
        {/* Main content area */}
        <main className="p-6">{renderPage()}</main>
      </div>
    </div>
  );
}
