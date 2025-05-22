"use client";

import { useState } from "react";
import SCADSidebar from "@/components/scad-sidebar";
import DashboardPage from "./dashboard/page";
import CompaniesPage from "./companies/page";
import StudentsPage from "./students/page";
import ReportsPage from "./reports/page";
import WorkshopsPage from "./workshops/page";
import AppointmentsPage from "./appointments/page";
import StatisticsPage from "./statistics/page";
import InternshipsPage from "./internships/page";

export default function SCADOfficePage() {
  const [activeItem, setActiveItem] = useState("dashboard");

  // Handle navigation from the sidebar
  const handleNavigate = (item) => {
    setActiveItem(item);
  };

  // Render the appropriate page based on active item
  const renderPage = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardPage />;
      case "companies":
        return <CompaniesPage />;
      case "internships":
        return <InternshipsPage />;
      case "students":
        return <StudentsPage />;
      case "reports":
        return <ReportsPage />;
      case "workshops":
        return <WorkshopsPage />;
      case "appointments":
        return <AppointmentsPage />;
      case "statistics":
        return <StatisticsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="h-screen bg-black flex">
      {/* Sidebar */}
      <SCADSidebar activeItem={activeItem} onNavigate={handleNavigate} />

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8">{renderPage()}</div>
    </div>
  );
}
