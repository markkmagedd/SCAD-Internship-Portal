"use client";

import { useState } from "react";
import CompanySidebar from "@/components/company-sidebar";
import DashboardPage from "./dashboard/page";
import CreatePage from "./create/page";
import PostsPage from "./posts/page";
import ApplicationsPage from "./applications/page";
import InternsPage from "./interns/page";
import ProfilePage from "./profile/page";
import InternshipsPage from "./internships/page";

export default function CompanyDashboard() {
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
      case "create":
        return <CreatePage />;
      case "posts":
        return <PostsPage />;
      case "internships":
        return <InternshipsPage />;
      case "applications":
        return <ApplicationsPage />;
      case "interns":
        return <InternsPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex bg-black text-white">
      <CompanySidebar
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
