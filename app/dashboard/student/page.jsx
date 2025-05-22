"use client";

import { useState } from "react";
import StudentSidebar from "@/components/student-sidebar";
import DashboardPage from "./dashboard/page";
import ProfilePage from "./profile/page";
import InternshipsPage from "./internships/page";
import ApplicationsPage from "./applications/page";
import ReportsPage from "./reports/page";
import MajorPage from "./major/page";
import CompaniesPage from "./companies/page";
import NotificationsPage from "./notifications/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Calendar, Video, Star } from "lucide-react";

export default function StudentDashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Handle navigation from the sidebar
  const handleNavigate = (item) => {
    if (item === "upgrade") {
      setIsUpgradeModalOpen(true);
    } else {
      setActiveItem(item);
    }
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
      <StudentSidebar
        activeItem={activeItem}
        onNavigate={(item) => handleNavigate(item)}
      />
      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-black">
        {/* Main content area */}
        <main className="p-6">{renderPage()}</main>
      </div>

      {/* Upgrade to PRO Modal */}
      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl flex items-center justify-center">
              <Badge className="mr-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white border-0 px-4 py-1.5">
                PRO
              </Badge>
              Upgrade Your Experience
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-center">
              Unlock premium features to boost your internship journey
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]">
              <Sparkles className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-900/30 rounded-lg">
                <div className="bg-[#FF6F1B]/20 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-[#FF6F1B]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Video Appointments</h3>
                  <p className="text-gray-400 text-sm">
                    Schedule one-on-one video calls with career advisors for
                    personalized guidance.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-900/30 rounded-lg">
                <div className="bg-[#FF6F1B]/20 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-[#FF6F1B]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Premium Opportunities
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get early access to exclusive internship opportunities at
                    partner companies.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-900/30 rounded-lg">
                <div className="bg-[#FF6F1B]/20 p-2 rounded-full mr-3">
                  <Video className="h-5 w-5 text-[#FF6F1B]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Career Coaching</h3>
                  <p className="text-gray-400 text-sm">
                    Receive professional coaching to prepare for interviews and
                    internships.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#FF6F1B] font-bold text-xl mb-1">
                Unlock PRO for 50 EGP/month
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Or 450 EGP for a full year (save 25%)
              </p>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-3">
            <Button
              className="w-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
              onClick={() => setIsUpgradeModalOpen(false)}
            >
              Upgrade to PRO
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800"
              onClick={() => setIsUpgradeModalOpen(false)}
            >
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
