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
  Users,
  Building,
  FileText,
  User,
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
  // State for appointment scheduling
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    date: "",
    time: "",
    duration: "30",
    reason: "career",
    details: "",
    advisorId: "auto-assign",
    studentId: "",
  });

  // State for handling appointment responses
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [appointmentResponse, setAppointmentResponse] = useState({
    id: null,
    status: "",
    notes: "",
  });
  const [responseLoading, setResponseLoading] = useState(false);

  // State for filtering and viewing
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);

  // State for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Call state
  const [incomingCall, setIncomingCall] = useState(null);
  const [isIncomingCallModalOpen, setIsIncomingCallModalOpen] = useState(false);
  const [isCallNotificationVisible, setIsCallNotificationVisible] =
    useState(false);

  // Show incoming call notification on page load
  useEffect(() => {
    // Display the incoming call notification after a short delay
    const timer = setTimeout(() => {
      simulateIncomingCall(2); // Call from Sara Ahmed
    }, 2000); // 2 seconds after page load

    return () => clearTimeout(timer);
  }, []);

  // Get today's date in YYYY-MM-DD format for filtering
  const today = new Date().toISOString().split("T")[0];

  // Sample data - Appointments that SCAD officers manage
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2025-04-10",
      time: "14:00",
      duration: "30",
      reason: "career",
      details: "Discuss career options in frontend development",
      status: "approved",
      student: {
        id: "28-12345",
        name: "Ahmed Mohamed",
        faculty: "Faculty of Engineering",
        major: "Computer Engineering",
        type: "student",
        isOnline: true,
      },
      notes:
        "Student needs guidance on career paths in frontend development. Will review portfolio during meeting.",
      meetingUrl: "https://meet.google.com/abc-defg-hij",
      scadOfficer: "Dr. James Wilson",
    },
    {
      id: 2,
      date: "2025-04-15",
      time: "10:30",
      duration: "45",
      reason: "report",
      details: "Final internship report review assistance",
      status: "pending",
      student: {
        id: "27-54321",
        name: "Sara Ahmed",
        faculty: "Faculty of Business",
        major: "Marketing",
        type: "student",
        isOnline: false,
      },
      notes: "",
      meetingUrl: "",
      scadOfficer: "Pending assignment",
    },
    {
      id: 3,
      date: "2025-04-12",
      time: "13:00",
      duration: "60",
      reason: "application",
      details: "Internship application process overview",
      status: "approved",
      student: {
        id: "29-98765",
        name: "Omar Khaled",
        faculty: "Faculty of Engineering",
        major: "Mechatronics",
        type: "student",
        isOnline: true,
      },
      notes:
        "Student needs explanation of internship application process. Bring application forms.",
      meetingUrl: "https://meet.google.com/xyz-abcd-efg",
      scadOfficer: "Dr. Sarah Johnson",
    },
    {
      id: 4,
      date: "2025-04-18",
      time: "15:30",
      duration: "30",
      reason: "other",
      details: "Portfolio review for internship readiness",
      status: "rejected",
      student: {
        id: "30-67890",
        name: "Nour Ibrahim",
        faculty: "Faculty of Computer Science",
        major: "Data Science",
        type: "student",
      },
      notes:
        "Request declined due to scheduling conflict. Please reschedule for next week.",
      meetingUrl: "",
      scadOfficer: "System",
    },
    {
      id: 5,
      date: "2025-04-20",
      time: "11:00",
      duration: "45",
      reason: "partnership",
      details: "Discuss new internship opportunities",
      status: "approved",
      student: {
        id: "COMP-12345",
        name: "Tech Solutions Inc.",
        type: "company",
        industry: "Technology",
      },
      notes:
        "Company representative will discuss new internship program and requirements.",
      meetingUrl: "https://meet.google.com/mno-pqrs-tuv",
      scadOfficer: "Dr. Ahmed Hassan",
    },
    {
      id: 6,
      date: "2025-04-22",
      time: "09:30",
      duration: "60",
      reason: "partnership",
      details: "Internship feedback and program improvement",
      status: "pending",
      student: {
        id: "COMP-67890",
        name: "Global Innovations",
        type: "company",
        industry: "Consulting",
      },
      notes:
        "Review of current internship program and discussion of improvement opportunities.",
      meetingUrl: "",
      scadOfficer: "Pending assignment",
    },
    {
      id: 7,
      date: "2025-03-25",
      time: "14:30",
      duration: "30",
      reason: "career",
      details: "Career counseling session",
      status: "completed",
      student: {
        id: "28-24680",
        name: "Youssef Mohamed",
        faculty: "Faculty of Engineering",
        major: "Computer Engineering",
        type: "student",
      },
      notes:
        "Career guidance session completed. Student provided with resources and next steps.",
      meetingUrl: "https://meet.google.com/efg-hijk-lmn",
      scadOfficer: "Dr. James Wilson",
    },
  ]);

  // Sample SCAD office advisors data
  const advisors = [
    { id: 1, name: "Dr. James Wilson", role: "Career Advisor", isOnline: true },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      role: "Internship Coordinator",
      isOnline: true,
    },
    {
      id: 3,
      name: "Dr. Ahmed Hassan",
      role: "Industry Liaison",
      isOnline: false,
    },
    {
      id: 4,
      name: "Dr. Emily Parker",
      role: "Student Affairs Officer",
      isOnline: true,
    },
  ];

  // Statistics
  const statistics = {
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter((a) => a.date === today).length,
    upcomingAppointments: appointments.filter((a) => a.status === "upcoming")
      .length,
    completedAppointments: appointments.filter((a) => a.status === "completed")
      .length,
    canceledAppointments: appointments.filter((a) => a.status === "canceled")
      .length,
  };

  // Sort and filter functions
  const sortAppointments = (appointments, config) => {
    return [...appointments].sort((a, b) => {
      if (a[config.key] < b[config.key]) {
        return config.direction === "asc" ? -1 : 1;
      }
      if (a[config.key] > b[config.key]) {
        return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSortChange = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleAppointmentSearch = () => {
    let filtered = [...appointments];

    // Filter by tab
    if (activeTab === "today") {
      filtered = filtered.filter((appointment) => appointment.date === today);
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (appointment) => appointment.status === "upcoming"
      );
    } else if (activeTab === "completed") {
      filtered = filtered.filter(
        (appointment) => appointment.status === "completed"
      );
    } else if (activeTab === "canceled") {
      filtered = filtered.filter(
        (appointment) => appointment.status === "canceled"
      );
    }

    // Filter by type
    if (filterParams.type !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.type === filterParams.type
      );
    }

    // Filter by status
    if (filterParams.status !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status === filterParams.status
      );
    }

    // Filter by advisor
    if (filterParams.advisor !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.advisor === filterParams.advisor
      );
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.studentName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.studentId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    return sortAppointments(filtered, sortConfig);
  };

  const completeAppointment = (id, notes) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "completed", notes }
          : appointment
      )
    );
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({
        ...selectedAppointment,
        status: "completed",
        notes,
      });
    }
  };

  const cancelAppointment = (id, notes) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "canceled", notes }
          : appointment
      )
    );
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({
        ...selectedAppointment,
        status: "canceled",
        notes,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-400";
      case "ongoing":
        return "bg-green-500/20 text-green-400";
      case "completed":
        return "bg-purple-500/20 text-purple-400";
      case "canceled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <Calendar className="h-4 w-4 mr-1" />;
      case "ongoing":
        return <Clock className="h-4 w-4 mr-1" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "canceled":
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    return type === "in-person" ? (
      <MapPin className="h-4 w-4 mr-1" />
    ) : (
      <VideoIcon className="h-4 w-4 mr-1" />
    );
  };

  // Get unique advisors for filtering
  const uniqueAdvisors = [
    ...new Set(appointments.map((appointment) => appointment.advisor)),
  ];

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
      link: "/dashboard/scad-office/appointments",
      icon: icon,
      color: color,
    };

    // In a real app, this would be handled by a global notification service or context
    const existingNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    const updatedNotifications = [newNotification, ...existingNotifications];
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    setNotifications([newNotification, ...notifications]);
  };

  // Filter appointments based on the current tab and filters
  const getFilteredAppointments = () => {
    let filtered = [...appointments];

    // Filter by active tab
    if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (appt) => appt.status === "approved" || appt.status === "pending"
      );
    } else if (activeTab === "past") {
      filtered = filtered.filter(
        (appt) => appt.status === "completed" || appt.status === "rejected"
      );
    } else if (activeTab === "pending") {
      filtered = filtered.filter((appt) => appt.status === "pending");
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((appt) => appt.student.type === filterType);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (appt) =>
          appt.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (appt.student.id &&
            appt.student.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (appt.details &&
            appt.details.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (appt.reason &&
            appt.reason.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  // Handle appointment submission
  const handleAppointmentSubmit = () => {
    // In a real app, this would send data to an API
    const newAppointment = {
      id: appointments.length + 1,
      ...appointmentForm,
      status: "pending",
      student: {
        id: appointmentForm.studentId || "NEW-ID",
        name: "New Student",
        type: "student",
      },
      notes: "",
      meetingUrl: "",
      scadOfficer:
        appointmentForm.advisorId === "auto-assign" ||
        !appointmentForm.advisorId
          ? "Pending assignment"
          : advisors.find((a) => a.id.toString() === appointmentForm.advisorId)
              ?.name || "Pending assignment",
    };

    setAppointments([...appointments, newAppointment]);
    setIsAppointmentModalOpen(false);
    setAppointmentForm({
      date: "",
      time: "",
      duration: "30",
      reason: "career",
      details: "",
      advisorId: "auto-assign",
      studentId: "",
    });

    showNotificationToast(
      "Success",
      "Appointment has been scheduled successfully.",
      "success"
    );

    addNotification(
      "New Appointment Scheduled",
      `A new appointment has been scheduled for ${new Date(
        newAppointment.date
      ).toLocaleDateString()}`,
      "appointment",
      "Calendar",
      "green"
    );
  };

  // Start video call
  const handleStartVideoCall = (appointment) => {
    // In a real app, this would initialize WebRTC connection
    setIsVideoCallModalOpen(false);

    // Save call details to localStorage to be retrieved by call page
    const callDetails = {
      id: appointment.id,
      student: appointment.student.name,
      type: appointment.student.type,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
      details: appointment.details,
    };

    localStorage.setItem("currentCall", JSON.stringify(callDetails));

    // Open call in new window
    window.open(
      `/dashboard/scad-office/call?id=${appointment.id}`,
      "_blank",
      "width=1200,height=800"
    );
  };

  // Get count of appointments by status
  const getStatusCount = (status) => {
    return appointments.filter((appt) => appt.status === status).length;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  // Get badge style based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-500/20 text-blue-400">
            <Check className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
    }
  };

  // Get formatted text for appointment reason
  const getReasonText = (reason) => {
    switch (reason) {
      case "career":
        return "Career Guidance";
      case "report":
        return "Report Assistance";
      case "application":
        return "Application Help";
      case "partnership":
        return "Partnership Discussion";
      case "other":
        return "Other";
      default:
        return reason.charAt(0).toUpperCase() + reason.slice(1);
    }
  };

  // Get icon for appointment reason
  const getReasonIcon = (reason) => {
    switch (reason) {
      case "career":
        return <Star className="h-4 w-4 text-purple-400" />;
      case "report":
        return <FileText className="h-4 w-4 text-blue-400" />;
      case "application":
        return <FileText className="h-4 w-4 text-green-400" />;
      case "partnership":
        return <Building className="h-4 w-4 text-orange-400" />;
      case "other":
        return <Info className="h-4 w-4 text-gray-400" />;
      default:
        return <Info className="h-4 w-4 text-gray-400" />;
    }
  };

  // Handle appointment approval
  const approveAppointment = (id, notes) => {
    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id === id) {
          const meetingUrl = `https://meet.google.com/${Math.random()
            .toString(36)
            .substring(2, 7)}-${Math.random()
            .toString(36)
            .substring(2, 7)}-${Math.random().toString(36).substring(2, 7)}`;

          return {
            ...appointment,
            status: "approved",
            notes: notes,
            meetingUrl,
          };
        }
        return appointment;
      })
    );

    // Find the appointment that was approved
    const approvedAppointment = appointments.find((a) => a.id === id);

    // Send notification to student (would be handled by backend in real app)
    showNotificationToast(
      "Appointment Approved",
      `You have approved the appointment with ${
        approvedAppointment ? approvedAppointment.student.name : "the student"
      }.`,
      "success"
    );

    addNotification(
      "Appointment Approved",
      `You approved the appointment with ${
        approvedAppointment ? approvedAppointment.student.name : "a student"
      } on ${
        approvedAppointment
          ? new Date(approvedAppointment.date).toLocaleDateString()
          : ""
      }`,
      "appointment",
      "CheckCircle",
      "green"
    );
  };

  // Handle appointment rejection
  const rejectAppointment = (id, notes) => {
    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id === id) {
          return {
            ...appointment,
            status: "rejected",
            notes: notes,
          };
        }
        return appointment;
      })
    );

    // Find the appointment that was rejected
    const rejectedAppointment = appointments.find((a) => a.id === id);

    // Send notification to student (would be handled by backend in real app)
    showNotificationToast(
      "Appointment Rejected",
      `You have rejected the appointment with ${
        rejectedAppointment ? rejectedAppointment.student.name : "the student"
      }.`,
      "error"
    );

    addNotification(
      "Appointment Rejected",
      `You rejected the appointment with ${
        rejectedAppointment ? rejectedAppointment.student.name : "a student"
      } on ${
        rejectedAppointment
          ? new Date(rejectedAppointment.date).toLocaleDateString()
          : ""
      }`,
      "appointment",
      "XCircle",
      "red"
    );
  };

  // Handle opening response modal for approving appointment
  const handleApproveAppointment = (appointmentId) => {
    openResponseModal(
      appointments.find((a) => a.id === appointmentId),
      "approved"
    );
  };

  // Handle opening response modal for rejecting appointment
  const handleRejectAppointment = (appointmentId) => {
    openResponseModal(
      appointments.find((a) => a.id === appointmentId),
      "rejected"
    );
  };

  // Open response modal with pre-filled data
  const openResponseModal = (appointment, initialStatus) => {
    setAppointmentResponse({
      id: appointment.id,
      status: initialStatus,
      notes: "",
    });
    setIsResponseModalOpen(true);
  };

  // Handle response submission
  const handleResponseSubmit = () => {
    setResponseLoading(true);

    setTimeout(() => {
      if (appointmentResponse.status === "approved") {
        approveAppointment(appointmentResponse.id, appointmentResponse.notes);
      } else if (appointmentResponse.status === "rejected") {
        rejectAppointment(appointmentResponse.id, appointmentResponse.notes);
      }

      setResponseLoading(false);
      setIsResponseModalOpen(false);
    }, 1000);
  };

  // Simulate incoming call
  const simulateIncomingCall = (appointmentId = null) => {
    let caller;

    if (appointmentId) {
      const appointment = appointments.find((a) => a.id === appointmentId);
      if (appointment) {
        caller = appointment.student;
      }
    } else {
      // Default caller if no appointment specified
      caller = {
        name: "Sara Ahmed",
        id: "27-54321",
        type: "student",
        faculty: "Faculty of Business",
        major: "Marketing",
      };
    }

    if (!caller) return;

    setIncomingCall({
      id: appointmentId || Math.floor(Math.random() * 1000),
      caller: caller.name,
      callerId: caller.id,
      callerType: caller.type || "student",
      faculty: caller.faculty,
      major: caller.major,
      advisor: caller.name, // Adding this field to match pro student format
    });

    setIsCallNotificationVisible(true);
  };

  // Accept incoming call
  const acceptIncomingCall = () => {
    setIsCallNotificationVisible(false);

    // Save call details to localStorage
    const callDetails = {
      id: incomingCall.id,
      student: incomingCall.caller,
      type: incomingCall.callerType,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].substring(0, 5),
      reason: "unscheduled",
      details: "Impromptu call",
    };

    localStorage.setItem("currentCall", JSON.stringify(callDetails));

    // Open call in new window
    window.open(
      `/dashboard/scad-office/call?id=${incomingCall.id}&incoming=true`,
      "_blank",
      "width=1200,height=800"
    );

    // Reset incoming call data
    setIncomingCall(null);

    // Add notification
    addNotification(
      "Call Accepted",
      `You accepted a call from ${incomingCall.caller}`,
      "call",
      "Phone",
      "green"
    );
  };

  // Decline incoming call
  const declineIncomingCall = () => {
    setIsCallNotificationVisible(false);

    // Add notification
    addNotification(
      "Call Declined",
      `You declined a call from ${incomingCall.caller}`,
      "call",
      "PhoneOff",
      "red"
    );

    // Reset incoming call data
    setIncomingCall(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Appointments</h1>
        <Button
          className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
          onClick={() => setIsAppointmentModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" /> Schedule Appointment
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Total Appointments</p>
                <h2 className="text-3xl font-bold text-white">
                  {appointments.length}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {getStatusCount("approved") + getStatusCount("pending")}{" "}
                  upcoming
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Calendar className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Pending Approval</p>
                <h2 className="text-3xl font-bold text-white">
                  {getStatusCount("pending")}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Awaiting your response
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Clock className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Approved</p>
                <h2 className="text-3xl font-bold text-white">
                  {getStatusCount("approved")}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Ready for meeting
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <CheckCircle className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Today</p>
                <h2 className="text-3xl font-bold text-white">
                  {
                    appointments.filter(
                      (a) => a.date === today && a.status === "approved"
                    ).length
                  }
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Scheduled for today
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Calendar className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Tabs */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <Tabs
          defaultValue="upcoming"
          className="w-full md:w-auto"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-black border border-gray-800 text-gray-400 w-full md:w-auto">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
            >
              Past
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10 bg-black border-gray-700 text-white"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-black border-gray-700 text-white w-full md:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="student">Students Only</SelectItem>
              <SelectItem value="company">Companies Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments List */}
        <div
          className={`col-span-1 ${
            selectedAppointment ? "lg:col-span-1" : "lg:col-span-3"
          }`}
        >
          <Card className="bg-black border-gray-800 h-full">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-xl font-medium text-white">
                  {activeTab === "upcoming"
                    ? "Upcoming Appointments"
                    : activeTab === "pending"
                    ? "Pending Requests"
                    : "Past Appointments"}
                </h3>
              </div>
              <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                {getFilteredAppointments().length > 0 ? (
                  getFilteredAppointments().map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer transition-colors ${
                        selectedAppointment?.id === appointment.id
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-white">
                              {appointment.student.name}
                            </h4>
                            {appointment.student.type === "company" && (
                              <Badge className="ml-2 bg-blue-500/20 text-blue-400">
                                Company
                              </Badge>
                            )}
                            <div className="ml-2 flex items-center">
                              <span
                                className={`w-2 h-2 rounded-full mr-1 ${
                                  appointment.student.isOnline
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                                }`}
                              />
                              <span className="text-xs text-gray-400">
                                {appointment.student.isOnline
                                  ? "Online"
                                  : "Offline"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <User className="h-3 w-3 mr-1" />
                            <span>{appointment.student.id}</span>
                            {appointment.student.major && (
                              <>
                                <span className="mx-2 text-gray-600">•</span>
                                <span>{appointment.student.major}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div>{getStatusBadge(appointment.status)}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-400">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString()}
                          </span>
                          <span className="mx-2 text-gray-600">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400">
                            {getReasonIcon(appointment.reason)}
                          </span>
                          <span className="ml-1 text-gray-400">
                            {getReasonText(appointment.reason)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-400">
                    No appointments found. Adjust your filters or schedule a new
                    appointment.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Details */}
        {selectedAppointment && (
          <div className="col-span-1 lg:col-span-2">
            <Card className="bg-black border-gray-800 h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Appointment Details
                  </h2>
                  <Button
                    variant="ghost"
                    className="text-white"
                    onClick={() => setSelectedAppointment(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Student/Company Info */}
                  <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-white">
                            {selectedAppointment.student.name}
                          </h3>
                          {selectedAppointment.student.type === "company" ? (
                            <Badge className="bg-blue-500/20 text-blue-400">
                              <Building className="h-3 w-3 mr-1" /> Company
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500/20 text-green-400">
                              <User className="h-3 w-3 mr-1" /> Student
                            </Badge>
                          )}
                          <Badge
                            className={`${
                              selectedAppointment.student.isOnline
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {selectedAppointment.student.isOnline
                              ? "Online"
                              : "Offline"}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                          ID: {selectedAppointment.student.id}
                        </p>
                        {selectedAppointment.student.type === "student" && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge className="bg-gray-800 text-white">
                              {selectedAppointment.student.faculty}
                            </Badge>
                            <Badge className="bg-gray-800 text-white">
                              {selectedAppointment.student.major}
                            </Badge>
                          </div>
                        )}
                        {selectedAppointment.student.type === "company" && (
                          <Badge className="bg-gray-800 text-white mt-2">
                            {selectedAppointment.student.industry}
                          </Badge>
                        )}
                      </div>
                      <div>
                        {selectedAppointment.status === "approved" && (
                          <Button
                            onClick={() => {
                              setIsVideoCallModalOpen(true);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Video className="h-4 w-4 mr-2" /> Start Video Call
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-white">
                        {formatDate(selectedAppointment.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="text-white">
                        {selectedAppointment.time} (
                        {selectedAppointment.duration} minutes)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Purpose</p>
                      <p className="text-white">
                        {getReasonText(selectedAppointment.reason)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(selectedAppointment.status)}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">SCAD Officer</p>
                      <p className="text-white">
                        {selectedAppointment.scadOfficer}
                      </p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Details</p>
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                      <p className="text-white">
                        {selectedAppointment.details || "No details provided."}
                      </p>
                    </div>
                  </div>

                  {/* Meeting Link (if approved) */}
                  {selectedAppointment.status === "approved" && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Meeting Link</p>
                      <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800 flex items-center justify-between">
                        <p className="text-white">
                          {selectedAppointment.meetingUrl}
                        </p>
                        <Button
                          variant="outline"
                          className="text-[#FF6F1B] border-[#FF6F1B]"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              selectedAppointment.meetingUrl
                            );
                            showNotificationToast(
                              "Success",
                              "Meeting link copied to clipboard",
                              "success"
                            );
                          }}
                        >
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedAppointment.notes && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Notes</p>
                      <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                        <p className="text-white">
                          {selectedAppointment.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Approval/Rejection Actions - only for pending appointments */}
                  {selectedAppointment.status === "pending" && (
                    <div className="flex gap-3 pt-4 mt-4 border-t border-gray-800">
                      <Button
                        className="flex-1 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                        onClick={() =>
                          handleApproveAppointment(selectedAppointment.id)
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-2" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-white bg-red-600 hover:bg-red-700 border-red-600"
                        onClick={() =>
                          handleRejectAppointment(selectedAppointment.id)
                        }
                      >
                        <XCircle className="h-4 w-4 mr-2" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Schedule Appointment Modal */}
      <Dialog
        open={isAppointmentModalOpen}
        onOpenChange={setIsAppointmentModalOpen}
      >
        <DialogContent className="bg-black border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details to schedule an appointment with a student or
              company.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm text-gray-400 block mb-1">
                  Student/Company ID
                </label>
                <Input
                  className="bg-black border-gray-700 text-white"
                  placeholder="Enter ID number"
                  value={appointmentForm.studentId}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      studentId: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Date</label>
                <Input
                  className="bg-black border-gray-700 text-white"
                  type="date"
                  value={appointmentForm.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Time</label>
                <Input
                  className="bg-black border-gray-700 text-white"
                  type="time"
                  value={appointmentForm.time}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Duration
                </label>
                <Select
                  value={appointmentForm.duration}
                  onValueChange={(value) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      duration: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Purpose
                </label>
                <Select
                  value={appointmentForm.reason}
                  onValueChange={(value) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      reason: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="career">Career Guidance</SelectItem>
                    <SelectItem value="report">Report Assistance</SelectItem>
                    <SelectItem value="application">
                      Application Help
                    </SelectItem>
                    <SelectItem value="partnership">
                      Partnership Discussion
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-400 block mb-1">
                  Assign SCAD Officer
                </label>
                <Select
                  value={appointmentForm.advisorId}
                  onValueChange={(value) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      advisorId: value,
                    })
                  }
                >
                  <SelectTrigger className="bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select SCAD officer" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="auto-assign">Auto-assign</SelectItem>
                    {advisors.map((advisor) => (
                      <SelectItem
                        key={advisor.id}
                        value={advisor.id.toString()}
                      >
                        {advisor.name} - {advisor.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-400 block mb-1">
                  Details
                </label>
                <Textarea
                  className="bg-black border-gray-700 text-white h-24"
                  placeholder="Provide details about the appointment purpose..."
                  value={appointmentForm.details}
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      details: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="text-white border-gray-700"
              onClick={() => setIsAppointmentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
              onClick={handleAppointmentSubmit}
              disabled={
                !appointmentForm.date ||
                !appointmentForm.time ||
                !appointmentForm.reason ||
                !appointmentForm.studentId
              }
            >
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Response Modal - for approval/rejection */}
      <Dialog open={isResponseModalOpen} onOpenChange={setIsResponseModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {appointmentResponse.status === "approved"
                ? "Approve Appointment"
                : "Reject Appointment"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {appointmentResponse.status === "approved"
                ? "Add optional notes for the student/company before approving."
                : "Please provide a reason for rejecting this appointment request."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              className="bg-black border-gray-700 text-white h-32"
              placeholder={
                appointmentResponse.status === "approved"
                  ? "Optional: Add notes or instructions for the meeting..."
                  : "Required: Explain why this appointment is being rejected..."
              }
              value={appointmentResponse.notes}
              onChange={(e) =>
                setAppointmentResponse({
                  ...appointmentResponse,
                  notes: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="text-white border-gray-700 bg-black hover:bg-black/70"
              onClick={() => setIsResponseModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className={
                appointmentResponse.status === "approved"
                  ? "bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }
              onClick={handleResponseSubmit}
              disabled={
                responseLoading ||
                (appointmentResponse.status === "rejected" &&
                  !appointmentResponse.notes)
              }
            >
              {responseLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : appointmentResponse.status === "approved" ? (
                <CheckCircle className="h-4 w-4 mr-2" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              {appointmentResponse.status === "approved" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Call Modal - to confirm starting a call */}
      <Dialog
        open={isVideoCallModalOpen}
        onOpenChange={setIsVideoCallModalOpen}
      >
        <DialogContent className="bg-black border-gray-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Start Video Call
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              You are about to start a video call with{" "}
              {selectedAppointment?.student.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center mb-3">
                {selectedAppointment?.student.type === "company" ? (
                  <Building className="h-5 w-5 text-blue-400 mr-2" />
                ) : (
                  <User className="h-5 w-5 text-green-400 mr-2" />
                )}
                <span className="text-white font-medium">
                  {selectedAppointment?.student.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Date:</p>
                  <p className="text-white">
                    {selectedAppointment
                      ? formatDate(selectedAppointment.date)
                      : ""}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Time:</p>
                  <p className="text-white">{selectedAppointment?.time}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400">Purpose:</p>
                  <p className="text-white">
                    {selectedAppointment
                      ? getReasonText(selectedAppointment.reason)
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              className="text-white border-gray-700 bg-black hover:bg-black/70"
              onClick={() => setIsVideoCallModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() =>
                selectedAppointment && handleStartVideoCall(selectedAppointment)
              }
            >
              <Video className="h-4 w-4 mr-2" /> Start Call
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
            <p className="text-sm text-gray-400">From {incomingCall.caller}</p>
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

      {/* Toast Notification */}
      {showNotification && notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in-20">
          <Card className="bg-black border-gray-800 shadow-xl max-w-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 rounded-full ${
                    notification.type === "success"
                      ? "bg-green-500/20 text-green-400"
                      : notification.type === "error"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {notification.type === "success" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : notification.type === "error" ? (
                    <XCircle className="h-5 w-5" />
                  ) : (
                    <Info className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {notification.message}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full text-gray-400 hover:text-white"
                  onClick={() => setShowNotification(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
