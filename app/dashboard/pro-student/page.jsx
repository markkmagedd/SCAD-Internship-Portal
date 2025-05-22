"use client";

import { useState } from "react";
import ProStudentSidebar from "@/components/pro-student-sidebar";
import DashboardPage from "./dashboard/page";
import ProfilePage from "./profile/page";
import InternshipsPage from "./internships/page";
import ApplicationsPage from "./applications/page";
import ReportsPage from "./reports/page";
import MajorPage from "./major/page";
import CompaniesPage from "./companies/page";
import NotificationsPage from "./notifications/page";
import AppointmentsPage from "./appointments/page";
import AssessmentsPage from "./assessments/page";
import WorkshopsPage from "./workshops/page";

export default function ProStudentDashboard() {
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
      case "profile":
        return <ProfilePage />;
      case "internships":
        return <InternshipsPage />;
      case "applications":
        return <ApplicationsPage />;
      case "reports":
        return <ReportsPage />;
      case "assessments":
        return <AssessmentsPage />;
      case "workshops":
        return <WorkshopsPage />;
      case "appointments":
        return <AppointmentsPage />;
      case "major":
        return <MajorPage />;
      case "companies":
        return <CompaniesPage />;
      case "notifications":
        return <NotificationsPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex bg-black text-white">
      <ProStudentSidebar
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
