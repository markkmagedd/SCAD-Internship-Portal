"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  Check,
  CheckCircle,
  Briefcase,
  FileText,
  Clock,
  AlertTriangle,
  Award,
  XCircle,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function NotificationsPage() {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "internship_cycle",
      title: "Summer 2025 Internship Cycle",
      message:
        "The Summer 2025 internship cycle is now open for applications. Apply before April 1, 2025.",
      date: "2025-02-15T09:30:00",
      read: false,
      link: "/dashboard/student/internships",
      icon: <Calendar className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: 2,
      type: "application_status",
      title: "Application Status Update",
      message:
        "Your application for the Data Analyst position at Global Analytics has been accepted!",
      date: "2025-02-12T14:15:00",
      read: false,
      link: "/dashboard/student/applications",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "green",
    },
    {
      id: 3,
      type: "report_status",
      title: "Report Status Update",
      message:
        "Your internship report for Data Insights Inc has been flagged. Please check the feedback and revise your submission.",
      date: "2025-02-08T11:45:00",
      read: true,
      link: "/dashboard/student/reports",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "orange",
    },
    {
      id: 4,
      type: "application_status",
      title: "Application Status Update",
      message:
        "Your application for UX/UI Design Intern at Future Systems has been rejected. View details for more information.",
      date: "2025-02-05T16:20:00",
      read: true,
      link: "/dashboard/student/applications",
      icon: <XCircle className="h-5 w-5" />,
      color: "red",
    },
    {
      id: 5,
      type: "internship_cycle",
      title: "Upcoming Internship Cycle",
      message:
        "The Summer 2025 internship cycle will open for applications in 2 weeks. Update your profile to improve your match score.",
      date: "2025-02-01T08:00:00",
      read: true,
      link: "/dashboard/student/profile",
      icon: <Clock className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: 6,
      type: "report_status",
      title: "Report Reminder",
      message:
        "Your internship report for Tech Solutions Ltd is due in 7 days. Start preparing your submission now.",
      date: "2025-01-28T10:10:00",
      read: true,
      link: "/dashboard/student/reports",
      icon: <FileText className="h-5 w-5" />,
      color: "purple",
    },
    {
      id: 7,
      type: "new_recommendation",
      title: "New Company Match",
      message:
        "Based on your updated profile, we've found a new company that matches your interests: ABC Corporation.",
      date: "2025-01-25T13:45:00",
      read: true,
      link: "/dashboard/student/companies",
      icon: <Briefcase className="h-5 w-5" />,
      color: "indigo",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const markAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== notificationId)
    );
  };

  const clearAllRead = () => {
    if (confirm("Are you sure you want to clear all read notifications?")) {
      setNotifications(
        notifications.filter((notification) => !notification.read)
      );
    }
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today - show time
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      // Yesterday
      return "Yesterday";
    } else if (diffDays < 7) {
      // Days ago
      return `${diffDays} days ago`;
    } else {
      // Regular date
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const getBackgroundColor = (color, read) => {
    if (read) return "bg-gray-800/40";

    switch (color) {
      case "blue":
        return "bg-blue-500/10";
      case "green":
        return "bg-green-500/10";
      case "orange":
        return "bg-orange-500/10";
      case "red":
        return "bg-red-500/10";
      case "purple":
        return "bg-purple-500/10";
      case "indigo":
        return "bg-indigo-500/10";
      default:
        return "bg-gray-800/40";
    }
  };

  const getIconColor = (color) => {
    switch (color) {
      case "blue":
        return "text-blue-400";
      case "green":
        return "text-green-400";
      case "orange":
        return "text-orange-400";
      case "red":
        return "text-red-400";
      case "purple":
        return "text-purple-400";
      case "indigo":
        return "text-indigo-400";
      default:
        return "text-gray-400";
    }
  };

  const getBorderColor = (color, read) => {
    if (read) return "border-gray-800";

    switch (color) {
      case "blue":
        return "border-blue-500/30";
      case "green":
        return "border-green-500/30";
      case "orange":
        return "border-orange-500/30";
      case "red":
        return "border-red-500/30";
      case "purple":
        return "border-purple-500/30";
      case "indigo":
        return "border-indigo-500/30";
      default:
        return "border-gray-800";
    }
  };

  // Filter notifications based on search term
  const filterNotifications = (notifs) => {
    if (!searchTerm) return notifs;

    return notifs.filter(
      (notification) =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Group notifications by date sections
  const unreadNotifications = filterNotifications(
    notifications.filter((notification) => !notification.read)
  );
  const readNotifications = filterNotifications(
    notifications.filter((notification) => notification.read)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400">
            Stay updated on internship cycles, applications, and reports
          </p>
        </div>
        <div className="flex gap-2">
          {unreadNotifications.length > 0 && (
            <Button
              variant="outline"
              className="bg-black border-gray-800 hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black text-white"
              onClick={markAllAsRead}
            >
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )}
          {readNotifications.length > 0 && (
            <Button
              variant="outline"
              className="bg-black border-gray-800 hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black text-white"
              onClick={clearAllRead}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Read
            </Button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <Card className="bg-black border-gray-800 shadow-s">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search notifications..."
              className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-[#FF6F1B]" />
              New Notifications
              <Badge className="ml-2 bg-[#FF6F1B]/20 text-[#FF6F1B]">
                {unreadNotifications.length}
              </Badge>
            </h2>
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${getBackgroundColor(
                        notification.color,
                        notification.read
                      )} border-l-4 ${getBorderColor(
                        notification.color,
                        notification.read
                      )}`}
                    >
                      <div className="flex">
                        <div
                          className={`p-2 rounded-full ${getBackgroundColor(
                            notification.color,
                            false
                          )} mr-4`}
                        >
                          <div className={getIconColor(notification.color)}>
                            {notification.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-white font-medium">
                              {notification.title}
                            </h3>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-400 mr-3">
                                {formatDate(notification.date)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black h-8 px-3 py-1"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className={getIconColor(notification.color)}>
                                {notification.type === "internship_cycle" ? (
                                  <Calendar className="h-3 w-3 mr-2" />
                                ) : notification.type ===
                                  "application_status" ? (
                                  <Briefcase className="h-3 w-3 mr-2" />
                                ) : notification.type === "report_status" ? (
                                  <FileText className="h-3 w-3 mr-2" />
                                ) : (
                                  <Bell className="h-3 w-3 mr-2" />
                                )}
                              </div>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-gray-400" />
              Earlier Notifications
            </h2>
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-gray-800/20"
                    >
                      <div className="flex">
                        <div className={`p-2 rounded-full bg-gray-800/40 mr-4`}>
                          <div className="text-gray-400">
                            {notification.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-white font-medium">
                              {notification.title}
                            </h3>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-400 mr-3">
                                {formatDate(notification.date)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-gray-400 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black"
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <div className="mt-3">
                            <Button
                              variant="outline"
                              className="bg-black border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black h-8 px-3 py-1"
                            >
                              <div className="text-gray-400">
                                {notification.type === "internship_cycle" ? (
                                  <Calendar className="h-3 w-3 mr-2" />
                                ) : notification.type ===
                                  "application_status" ? (
                                  <Briefcase className="h-3 w-3 mr-2" />
                                ) : notification.type === "report_status" ? (
                                  <FileText className="h-3 w-3 mr-2" />
                                ) : (
                                  <Bell className="h-3 w-3 mr-2" />
                                )}
                              </div>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Notifications */}
        {notifications.length === 0 && (
          <Card className="bg-black border-gray-800 shadow-s">
            <CardContent className="p-8 text-center">
              <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white">
                No notifications
              </h3>
              <p className="text-gray-400 mt-2 max-w-md mx-auto">
                You don't have any notifications at the moment. Check back later
                for updates on internship cycles, applications, and reports.
              </p>
              <Button
                variant="outline"
                className="bg-black border-gray-700 text-white hover:bg-gray-800 hover:text-[#FF6F1B] hover:cursor-pointer hover:bg-black mt-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
