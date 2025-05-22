"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  Filter,
  Search,
  Plus,
  Check,
  X,
  Info,
  RefreshCw,
  Star,
  ArrowRight,
  MessageCircle,
  LucideIcon,
  CheckCircle,
  XCircle,
  Bell,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AppointmentsPage() {
  // State for appointment request
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    time: "",
    duration: "30",
    reason: "career",
    details: "",
  });
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlineAdvisorsOnly, setShowOnlineAdvisorsOnly] = useState(false);

  // Add state for appointment response
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [appointmentResponse, setAppointmentResponse] = useState({
    id: null,
    status: "",
    notes: "",
  });
  const [responseLoading, setResponseLoading] = useState(false);

  // Add state for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Add incoming call state
  const [incomingCall, setIncomingCall] = useState(null);
  const [isIncomingCallModalOpen, setIsIncomingCallModalOpen] = useState(false);

  // Add state for call notification
  const [isCallNotificationVisible, setIsCallNotificationVisible] =
    useState(false);

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2025-04-10",
      time: "14:00",
      duration: "30",
      reason: "career",
      details: "Discuss career options in frontend development",
      status: "approved",
      advisor: "Dr. Ahmed Hassan (SCAD Officer)",
      notes:
        "Please prepare your resume and portfolio for discussion. Looking forward to our meeting!",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
      isAdvisorOnline: true,
    },
    {
      id: 2,
      date: "2025-04-15",
      time: "10:30",
      duration: "45",
      reason: "report",
      details: "Need help with my final internship report structure",
      status: "pending",
      advisor: "Pending assignment",
      notes: "",
      meetingUrl: "",
      isAdvisorOnline: false,
    },
    {
      id: 5,
      date: "2025-04-18",
      time: "11:00",
      duration: "30",
      reason: "application",
      details: "Review student internship applications",
      status: "pending",
      advisor: "Dr. James Chen (SCAD Office)",
      notes:
        "We need your help to review several student applications for Microsoft internships",
      meetingUrl: "",
      isAdvisorOnline: true,
      forProStudentAction: true,
    },
    {
      id: 3,
      date: "2025-03-20",
      time: "13:00",
      duration: "60",
      reason: "application",
      details: "Review my application materials for Google internship",
      status: "completed",
      advisor: "Prof. Sarah Wilson",
      notes: "Application materials were reviewed and feedback provided",
      meetingUrl: "https://meet.google.com/xyz-abcd-efg",
      isAdvisorOnline: false,
    },
    {
      id: 4,
      date: "2025-04-12",
      time: "15:30",
      duration: "30",
      reason: "other",
      details:
        "Discuss potential research opportunities related to my internship",
      status: "rejected",
      advisor: "System",
      notes:
        "Request declined due to insufficient details. Please provide specific research topics.",
      meetingUrl: "",
      isAdvisorOnline: false,
    },
  ]);

  // Function to show notification
  const showNotificationToast = (title, message, type) => {
    setNotification({
      title,
      message,
      type,
    });
    setShowNotification(true);
    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Function to add notification to global notifications list
  const addNotification = (title, message, type, icon, color) => {
    const newNotification = {
      id: Date.now(),
      type: type,
      title: title,
      message: message,
      date: new Date().toISOString(),
      read: false,
      link: "/dashboard/pro-student/appointments",
      icon: icon,
      color: color,
    };

    // In a real app, this would be handled by a global notification service or context
    // For now, we'll simulate saving to localStorage
    const existingNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    const updatedNotifications = [newNotification, ...existingNotifications];
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    setNotifications([newNotification, ...notifications]);

    // We're calling showNotificationToast separately in acceptAppointment and rejectAppointment,
    // so we don't need to call it here anymore.
    // showNotificationToast(title, message, type);
  };

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    setNotifications(savedNotifications);
  }, []);

  // Get upcoming approved appointments
  const getFilteredAppointments = () => {
    return appointments
      .filter((appointment) => {
        // Filter by status
        if (filterStatus !== "all" && appointment.status !== filterStatus) {
          return false;
        }

        // Filter by online advisors
        if (showOnlineAdvisorsOnly && !appointment.isAdvisorOnline) {
          return false;
        }

        // Search filter
        if (searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          return (
            appointment.details.toLowerCase().includes(searchLower) ||
            appointment.advisor.toLowerCase().includes(searchLower) ||
            appointment.reason.toLowerCase().includes(searchLower)
          );
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by date (newest first for pending, chronological for approved)
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);

        if (a.status === "pending" && b.status === "pending") {
          return dateB - dateA; // Newest pending first
        }

        return dateA - dateB; // Otherwise chronological
      });
  };

  // Handle appointment submission
  const handleAppointmentSubmit = () => {
    // In a real app, this would send an API request to create an appointment
    const newAppointment = {
      id: Date.now(),
      ...appointmentForm,
      status: "pending",
      advisor: "Pending assignment",
      notes: "",
      meetingUrl: "",
    };

    setAppointments([...appointments, newAppointment]);
    setAppointmentStatus("success");

    // Reset after 3 seconds and close modal
    setTimeout(() => {
      setAppointmentStatus(null);
      setIsAppointmentModalOpen(false);
      setAppointmentForm({
        date: "",
        time: "",
        duration: "30",
        reason: "career",
        details: "",
      });
    }, 3000);
  };

  // Handle starting a video call
  const handleStartVideoCall = (appointment) => {
    // Store the appointment details in localStorage for the call page to access
    localStorage.setItem(
      "currentCall",
      JSON.stringify({
        id: appointment.id,
        advisor: appointment.advisor,
        reason: appointment.reason,
        details: appointment.details,
        meetingUrl: appointment.meetingUrl,
        date: appointment.date,
        time: appointment.time,
        duration: appointment.duration,
        isAdvisorOnline: appointment.isAdvisorOnline,
      })
    );

    // Open the call page in a new tab
    window.open(`/dashboard/pro-student/call?id=${appointment.id}`, "_blank");
  };

  // Get counts for dashboard stats
  const getStatusCount = (status) => {
    return appointments.filter((a) => a.status === status).length;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400">Approved</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-500/20 text-blue-400">Completed</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>;
      default:
        return null;
    }
  };

  // Get reason text
  const getReasonText = (reason) => {
    switch (reason) {
      case "career":
        return "Career Guidance";
      case "report":
        return "Report Clarifications";
      case "application":
        return "Application Help";
      case "other":
        return "Other";
      default:
        return reason;
    }
  };

  // Get reason icon
  const getReasonIcon = (reason) => {
    switch (reason) {
      case "career":
        return <ArrowRight className="h-5 w-5 text-[#FF6F1B]" />;
      case "report":
        return <MessageCircle className="h-5 w-5 text-[#FF6F1B]" />;
      case "application":
        return <Star className="h-5 w-5 text-[#FF6F1B]" />;
      case "other":
        return <Info className="h-5 w-5 text-[#FF6F1B]" />;
      default:
        return null;
    }
  };

  // Handle accepting an appointment
  const acceptAppointment = (id, notes) => {
    setResponseLoading(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      // Find the appointment being accepted
      const appointment = appointments.find((app) => app.id === id);

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                status: "approved",
                notes: notes,
                meetingUrl: notes
                  ? "https://meet.google.com/generated-meeting-id"
                  : "https://meet.google.com/default-meeting-id",
                advisor: "Dr. Ahmed Hassan", // In a real app, this would be assigned
              }
            : appointment
        )
      );

      // Create notification for accepted appointment
      if (appointment) {
        const reasonText = getReasonText(appointment.reason);
        const notificationTitle = "Appointment Accepted";
        const notificationMessage = `Your ${reasonText} appointment on ${formatDate(
          appointment.date
        )} at ${appointment.time} has been accepted by Dr. Ahmed Hassan.`;

        // Add notification
        addNotification(
          notificationTitle,
          notificationMessage,
          "appointment_status",
          <CheckCircle className="h-5 w-5" />,
          "green"
        );

        // Show toast notification with correct type
        showNotificationToast(
          notificationTitle,
          notificationMessage,
          "acceptance"
        );
      }

      setResponseLoading(false);
      setIsResponseModalOpen(false);
    }, 1000);
  };

  // Handle rejecting an appointment
  const rejectAppointment = (id, notes) => {
    setResponseLoading(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      // Find the appointment being rejected
      const appointment = appointments.find((app) => app.id === id);

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? {
                ...appointment,
                status: "rejected",
                notes: notes,
                advisor: "System", // In a real app, this would be who rejected it
              }
            : appointment
        )
      );

      // Create notification for rejected appointment
      if (appointment) {
        const reasonText = getReasonText(appointment.reason);
        const notificationTitle = "Appointment Rejected";
        const notificationMessage = `Your ${reasonText} appointment on ${formatDate(
          appointment.date
        )} at ${appointment.time} has been rejected. Reason: ${notes}`;

        // Add notification
        addNotification(
          notificationTitle,
          notificationMessage,
          "appointment_status",
          <XCircle className="h-5 w-5" />,
          "red"
        );

        // Show toast notification with correct type
        showNotificationToast(
          notificationTitle,
          notificationMessage,
          "rejection"
        );
      }

      setResponseLoading(false);
      setIsResponseModalOpen(false);
    }, 1000);
  };

  // Modify the functions to accept/reject without showing the notes modal
  const handleAcceptAppointment = (appointmentId) => {
    // Call acceptAppointment directly with empty notes
    acceptAppointment(appointmentId, "");
  };

  const handleRejectAppointment = (appointmentId) => {
    // Call rejectAppointment directly with a standard message
    rejectAppointment(
      appointmentId,
      "Unable to accommodate this request at this time."
    );
  };

  // Open the response modal
  const openResponseModal = (appointment, initialStatus) => {
    setAppointmentResponse({
      id: appointment.id,
      status: initialStatus,
      notes: "",
    });
    setIsResponseModalOpen(true);
  };

  // Handle form submission for appointment response
  const handleResponseSubmit = () => {
    if (appointmentResponse.status === "approved") {
      acceptAppointment(appointmentResponse.id, appointmentResponse.notes);
    } else if (appointmentResponse.status === "rejected") {
      rejectAppointment(appointmentResponse.id, appointmentResponse.notes);
    }
  };

  // Add function to simulate receiving a call
  const simulateIncomingCall = (appointmentId) => {
    // Find the appointment that the call is for
    const appointment = appointments.find((app) => app.id === appointmentId);

    if (appointment && appointment.status === "approved") {
      setIncomingCall(appointment);
      setIsCallNotificationVisible(true);

      // Play a notification sound
      const audio = new Audio("/call-sound.mp3");
      audio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  // Update the acceptIncomingCall function to redirect to the dedicated call page
  const acceptIncomingCall = () => {
    // Store the current call in localStorage
    localStorage.setItem(
      "currentCall",
      JSON.stringify({
        id: incomingCall.id,
        advisor: incomingCall.advisor,
        reason: incomingCall.reason,
        details: incomingCall.details,
        meetingUrl: incomingCall.meetingUrl,
        date: incomingCall.date,
        time: incomingCall.time,
        duration: incomingCall.duration,
        isAdvisorOnline: incomingCall.isAdvisorOnline,
        isIncoming: true, // Flag to indicate this was an incoming call
      })
    );

    // Close the notification
    setIsCallNotificationVisible(false);
    setIncomingCall(null);

    // Open the call page in a new tab
    window.open(
      `/dashboard/pro-student/call?id=${incomingCall.id}&incoming=true`,
      "_blank"
    );
  };

  // Update the declineIncomingCall function
  const declineIncomingCall = () => {
    // End the call completely
    setIncomingCall(null);
    setIsCallNotificationVisible(false);
  };

  // Add useEffect to simulate incoming calls from online advisors (for demonstration purposes)
  useEffect(() => {
    // Simulate a call from the first approved appointment with an online advisor immediately
    const approvedAppointment = appointments.find(
      (app) => app.status === "approved" && app.isAdvisorOnline
    );

    if (approvedAppointment && !isVideoCallModalOpen) {
      simulateIncomingCall(approvedAppointment.id);
    }

    return () => {}; // Cleanup function (empty in this case)
  }, [appointments, isVideoCallModalOpen]); // Only run when appointments or modal state changes

  return (
    <div className="space-y-8">
      {/* Notification Toast */}
      {showNotification && notification && (
        <div
          className={`fixed top-4 right-4 z-50 bg-black border ${
            notification.type === "rejection"
              ? "border-red-500/30"
              : "border-green-500/30"
          } rounded-lg shadow-lg p-4 max-w-md animate-in slide-in-from-right`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full ${
                notification.type === "rejection"
                  ? "bg-red-500/10"
                  : "bg-green-500/10"
              }`}
            >
              {notification.type === "rejection" ? (
                <XCircle className="h-5 w-5 text-red-400" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">{notification.title}</h4>
              <p className="text-sm text-gray-400">{notification.message}</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Appointments</h1>
          <p className="text-gray-400">
            Request appointments with SCAD officers for guidance and join
            scheduled video calls
          </p>
        </div>
        <Button
          onClick={() => setIsAppointmentModalOpen(true)}
          className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Request New Appointment
        </Button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Upcoming</p>
                <h3 className="text-2xl font-bold text-white">
                  {getStatusCount("approved")}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Video className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <h3 className="text-2xl font-bold text-white">
                  {getStatusCount("pending")}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <h3 className="text-2xl font-bold text-white">
                  {getStatusCount("completed")}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Check className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected</p>
                <h3 className="text-2xl font-bold text-white">
                  {getStatusCount("rejected")}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <X className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search appointments..."
            className="pl-10 bg-black border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-black border-gray-700 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700 text-white">
            <SelectItem value="all">All Appointments</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="bg-black border-gray-700 text-white"
          onClick={() => {
            setFilterStatus("all");
            setSearchTerm("");
          }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
        <Button
          variant="outline"
          className={`${
            showOnlineAdvisorsOnly
              ? "bg-green-500/20 text-green-400 border-green-500/30"
              : "bg-black border-gray-700 text-white"
          }`}
          onClick={() => setShowOnlineAdvisorsOnly(!showOnlineAdvisorsOnly)}
        >
          <div className="flex items-center">
            <span
              className={`w-2 h-2 rounded-full ${
                showOnlineAdvisorsOnly ? "bg-green-500" : "bg-gray-500"
              } mr-2`}
            ></span>
            Online Advisors {showOnlineAdvisorsOnly ? "Only" : ""}
          </div>
        </Button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {getFilteredAppointments().length > 0 ? (
          getFilteredAppointments().map((appointment) => (
            <Card
              key={appointment.id}
              className="bg-black border-gray-800 hover:border-gray-700 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex h-12 w-12 rounded-full bg-gray-800 items-center justify-center flex-shrink-0">
                      {getReasonIcon(appointment.reason)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-white">
                          {getReasonText(appointment.reason)}
                        </h3>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {appointment.details}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-gray-400 text-xs">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">Advisor:</span>
                          <span className="ml-1">{appointment.advisor}</span>
                          {appointment.advisor !== "Pending assignment" &&
                            appointment.advisor !== "System" && (
                              <span className="ml-2 flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    appointment.isAdvisorOnline
                                      ? "bg-green-500"
                                      : "bg-gray-500"
                                  } mr-1`}
                                ></span>
                                <span
                                  className={`text-xs ${
                                    appointment.isAdvisorOnline
                                      ? "text-green-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {appointment.isAdvisorOnline
                                    ? "Online"
                                    : "Offline"}
                                </span>
                              </span>
                            )}
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs text-gray-400">
                          <span className="font-medium">Notes:</span>{" "}
                          {appointment.notes}
                        </div>
                      )}
                      {/* Check if appointment is today and advisor is online */}
                      {appointment.status === "approved" &&
                        appointment.isAdvisorOnline &&
                        new Date(appointment.date).toDateString() ===
                          new Date().toDateString() && (
                          <div className="mt-2 p-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400 flex items-center">
                            <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Your advisor is online now! Join the call when
                            you're ready.
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 self-start md:self-center ml-auto md:ml-0">
                    {appointment.status === "approved" && (
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleStartVideoCall(appointment)}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      </div>
                    )}
                    {appointment.status === "pending" &&
                      !appointment.forProStudentAction && (
                        <div className="flex items-center gap-2">
                          <div className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 py-2 px-3 rounded flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            Awaiting SCAD Officer Response
                          </div>
                        </div>
                      )}
                    {appointment.status === "pending" &&
                      appointment.forProStudentAction && (
                        <div className="flex flex-col gap-2">
                          <div className="bg-blue-500/20 text-blue-400 border border-blue-500/20 py-2 px-3 rounded flex items-center">
                            <Bell className="h-4 w-4 mr-2" />
                            Request From SCAD Office
                          </div>

                          <div className="flex gap-2 mt-2">
                            <Button
                              onClick={() =>
                                handleAcceptAppointment(appointment.id)
                              }
                              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20 flex-1"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              onClick={() =>
                                handleRejectAppointment(appointment.id)
                              }
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 flex-1"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}
                    {appointment.status === "rejected" && (
                      <Button
                        onClick={() => {
                          // Pre-fill form with previous data for resubmission
                          setAppointmentForm({
                            date: appointment.date,
                            time: appointment.time,
                            duration: appointment.duration,
                            reason: appointment.reason,
                            details: appointment.details,
                          });
                          setIsAppointmentModalOpen(true);
                        }}
                        variant="outline"
                        className="bg-black border-gray-700 text-white"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Resubmit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center p-12 border border-gray-800 rounded-lg">
            <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No appointments found
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your filters or search criteria"
                : "Request an appointment to schedule a video call with an advisor"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Request New Appointment
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Appointment Request Modal */}
      <Dialog
        open={isAppointmentModalOpen}
        onOpenChange={setIsAppointmentModalOpen}
      >
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Request an Appointment
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Schedule a video call with a SCAD officer for career guidance or
              report clarifications
            </DialogDescription>
          </DialogHeader>

          {!appointmentStatus ? (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                    value={appointmentForm.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="time"
                    className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                    value={appointmentForm.time}
                    onChange={(e) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        time: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Duration <span className="text-red-500">*</span>
                </label>
                <Select
                  value={appointmentForm.duration}
                  onValueChange={(value) =>
                    setAppointmentForm({ ...appointmentForm, duration: value })
                  }
                >
                  <SelectTrigger className="bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Reason for Appointment <span className="text-red-500">*</span>
                </label>
                <Select
                  value={appointmentForm.reason}
                  onValueChange={(value) =>
                    setAppointmentForm({ ...appointmentForm, reason: value })
                  }
                >
                  <SelectTrigger className="bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="career">Career Guidance</SelectItem>
                    <SelectItem value="report">
                      Report Clarifications
                    </SelectItem>
                    <SelectItem value="application">
                      Application Help
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Details <span className="text-red-500">*</span>
                </label>
                <Textarea
                  className="h-32 bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                  placeholder="Provide details about what you'd like to discuss during the appointment..."
                  value={appointmentForm.details}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      details: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mt-2 flex items-start">
                <Info className="h-4 w-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-gray-400">
                  Appointments are subject to approval. You'll receive a
                  notification once your request has been processed.
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              {appointmentStatus === "success" && (
                <>
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-500/20 mb-4">
                    <Calendar className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    Appointment Requested!
                  </h3>
                  <p className="text-gray-400">
                    Your appointment request has been submitted. You'll receive
                    a notification once a SCAD officer approves or rejects it.
                  </p>
                </>
              )}
            </div>
          )}

          <DialogFooter className="flex justify-between">
            {!appointmentStatus ? (
              <>
                <Button
                  onClick={() => setIsAppointmentModalOpen(false)}
                  variant="outline"
                  className="bg-black border-gray-700 hover:bg-gray-800 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAppointmentSubmit}
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                  disabled={
                    !appointmentForm.date ||
                    !appointmentForm.time ||
                    !appointmentForm.details
                  }
                >
                  Submit Request
                </Button>
              </>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Call Modal */}
      <Dialog
        open={isVideoCallModalOpen}
        onOpenChange={setIsVideoCallModalOpen}
      >
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Join Video Call
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Start your scheduled video call with your advisor
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="py-4">
              <div className="p-4 bg-gray-900/30 rounded-lg mb-6">
                <h3 className="text-white font-medium">
                  {getReasonText(selectedAppointment.reason)}
                </h3>
                <p className="text-gray-400 mt-1">
                  {selectedAppointment.details}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="text-white">
                      {formatDate(selectedAppointment.date)} at{" "}
                      {selectedAppointment.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="text-white">
                      {selectedAppointment.duration} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Advisor</p>
                    <p className="text-white flex items-center">
                      {selectedAppointment.advisor}
                      <span className="ml-2 flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            selectedAppointment.isAdvisorOnline
                              ? "bg-green-500"
                              : "bg-gray-500"
                          } mr-1`}
                        ></span>
                        <span
                          className={`text-xs ${
                            selectedAppointment.isAdvisorOnline
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          {selectedAppointment.isAdvisorOnline
                            ? "Online"
                            : "Offline"}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {selectedAppointment.isAdvisorOnline ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                  <p className="text-white text-sm flex items-start">
                    <div className="h-4 w-4 bg-green-500 rounded-full mr-2 animate-pulse mt-0.5"></div>
                    <span>
                      Your advisor is currently{" "}
                      <span className="text-green-400 font-medium">online</span>{" "}
                      and ready for the meeting. You can join the call now!
                    </span>
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
                  <p className="text-white text-sm flex items-start">
                    <div className="h-4 w-4 bg-yellow-500 rounded-full mr-2 mt-0.5"></div>
                    <span>
                      Your advisor is currently{" "}
                      <span className="text-yellow-400 font-medium">
                        offline
                      </span>
                      . You can still join the meeting room and wait, or check
                      back closer to the scheduled time.
                    </span>
                  </p>
                </div>
              )}

              <div className="border border-[#FF6F1B]/30 bg-[#FF6F1B]/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Video className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                  Meeting Information
                </h4>

                <p className="text-gray-300 text-sm mt-4">
                  Meeting URL:{" "}
                  <span className="text-[#FF6F1B]">
                    {selectedAppointment.meetingUrl}
                  </span>
                </p>

                <div className="mt-6 text-center">
                  <Button
                    onClick={() =>
                      window.open(selectedAppointment.meetingUrl, "_blank")
                    }
                    className="w-full sm:w-auto bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Call
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Please ensure your camera and microphone are working
                    properly before joining.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setIsVideoCallModalOpen(false)}
              variant="outline"
              className="bg-black border-gray-700 hover:bg-gray-800 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Response Modal */}
      <Dialog open={isResponseModalOpen} onOpenChange={setIsResponseModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {appointmentResponse.status === "approved"
                ? "Accept Appointment"
                : "Reject Appointment"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {appointmentResponse.status === "approved"
                ? "Add any notes or instructions for this appointment"
                : "Provide a reason for rejecting this appointment request"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  {appointmentResponse.status === "approved"
                    ? "Your Notes (Optional)"
                    : "Reason for Rejection"}
                </label>
                <Textarea
                  value={appointmentResponse.notes}
                  onChange={(e) =>
                    setAppointmentResponse({
                      ...appointmentResponse,
                      notes: e.target.value,
                    })
                  }
                  placeholder={
                    appointmentResponse.status === "approved"
                      ? "Add any specific instructions or preparation for the meeting..."
                      : "Please provide a reason for rejecting this appointment request..."
                  }
                  className="h-32 bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                  required={appointmentResponse.status === "rejected"}
                />
              </div>

              {appointmentResponse.status === "approved" && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-white text-sm flex items-start">
                    <Info className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                    Accepting this appointment will automatically generate a
                    meeting link that will be shared with the advisor.
                  </p>
                </div>
              )}

              {appointmentResponse.status === "rejected" && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <p className="text-white text-sm flex items-start">
                    <Info className="h-4 w-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                    Please provide a clear reason for rejection. You can always
                    request a new appointment later.
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              onClick={() => setIsResponseModalOpen(false)}
              variant="outline"
              className="bg-black border-gray-700 hover:bg-gray-800 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleResponseSubmit}
              className={
                appointmentResponse.status === "approved"
                  ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20"
                  : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
              }
              disabled={
                appointmentResponse.status === "rejected" &&
                !appointmentResponse.notes.trim()
              }
            >
              {responseLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  {appointmentResponse.status === "approved" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Appointment
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Appointment
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Incoming Call Notification */}
      {isCallNotificationVisible && incomingCall && (
        <div className="fixed bottom-4 right-4 z-50 bg-black border border-green-500/30 shadow-lg rounded-lg p-4 flex items-center gap-3 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center relative">
            <Phone className="h-5 w-5 text-green-400" />
            <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <div>
            <h4 className="font-medium text-white">Incoming Call</h4>
            <p className="text-sm text-gray-400">From {incomingCall.advisor}</p>
          </div>
          <div className="flex gap-2 ml-2">
            <Button
              onClick={declineIncomingCall}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-red-500/20 border-red-500/20 text-red-400"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              onClick={acceptIncomingCall}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 bg-green-500/20 border-green-500/20 text-green-400"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
