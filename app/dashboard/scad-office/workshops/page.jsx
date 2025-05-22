"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Award,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  Edit,
  Trash2,
  MapPin,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  Video,
  Link,
  ListPlus,
  Trash,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      title: "Resume Building Workshop",
      date: "2023-03-20",
      startTime: "14:00",
      endTime: "16:00",
      time: "14:00 - 16:00",
      location: "Hall A, Student Center",
      isOnline: false,
      meetingLink: "",
      presenter: "Dr. Sarah Johnson",
      presenterBio:
        "Dr. Sarah Johnson is a career development specialist with over 10 years of experience helping students prepare for professional careers. She holds a PhD in Psychology from Harvard University.",
      description:
        "Learn how to create an effective resume that highlights your skills and experiences to stand out to employers.",
      agenda: [
        "Introduction to resume formats",
        "Tailoring your resume for different industries",
        "Highlighting relevant skills and experiences",
        "Common resume mistakes to avoid",
        "Q&A session",
      ],
      capacity: 50,
      registrations: 45,
      status: "upcoming", // upcoming, ongoing, completed, canceled
      registrationDeadline: "2023-03-18",
      attendees: [
        {
          id: 1,
          name: "Ahmed Mohamed",
          studentId: "28-12345",
          email: "ahmed.mohamed@student.guc.edu.eg",
          attended: null,
        },
        {
          id: 2,
          name: "Sara Ahmed",
          studentId: "27-54321",
          email: "sara.ahmed@student.guc.edu.eg",
          attended: null,
        },
        // more attendees
      ],
    },
    {
      id: 2,
      title: "Interview Skills",
      date: "2023-03-25",
      startTime: "13:00",
      endTime: "15:30",
      time: "13:00 - 15:30",
      location: "Online (Zoom)",
      isOnline: true,
      meetingLink: "https://zoom.us/j/123456789",
      presenter: "Prof. Ahmed Khaled",
      presenterBio:
        "Prof. Ahmed Khaled is a senior HR consultant who has conducted over 2000 interviews for top multinational companies. He specializes in technical interviews and behavioral assessments.",
      description:
        "Master the art of interviewing with tips on answering common questions, body language, and following up.",
      agenda: [
        "Preparing for different types of interviews",
        "Behavioral questions and the STAR method",
        "Technical interview strategies",
        "Body language and virtual interview tips",
        "Mock interview practice",
        "Follow-up etiquette",
      ],
      capacity: 40,
      registrations: 38,
      status: "upcoming",
      registrationDeadline: "2023-03-23",
      attendees: [
        {
          id: 3,
          name: "Omar Khaled",
          studentId: "29-98765",
          email: "omar.khaled@student.guc.edu.eg",
          attended: null,
        },
        {
          id: 4,
          name: "Nour Ibrahim",
          studentId: "30-67890",
          email: "nour.ibrahim@student.guc.edu.eg",
          attended: null,
        },
        // more attendees
      ],
    },
    {
      id: 3,
      title: "Introduction to Career Paths in Engineering",
      date: "2023-02-15",
      time: "10:00 - 12:00",
      location: "Engineering Building, Room 202",
      presenter: "Eng. Mohamed Farid",
      description:
        "Explore various career paths available to engineering graduates, industry trends, and growth opportunities.",
      capacity: 60,
      registrations: 58,
      status: "completed",
      registrationDeadline: "2023-02-13",
      attendees: [
        {
          id: 5,
          name: "Youssef Mohamed",
          studentId: "28-24680",
          email: "youssef.mohamed@student.guc.edu.eg",
          attended: true,
        },
        {
          id: 6,
          name: "Laila Adel",
          studentId: "29-13579",
          email: "laila.adel@student.guc.edu.eg",
          attended: false,
        },
        // more attendees
      ],
    },
    {
      id: 4,
      title: "Networking for Success",
      date: "2023-04-05",
      time: "15:00 - 17:00",
      location: "Business School Auditorium",
      presenter: "Dr. Amira Hassan",
      description:
        "Learn effective networking strategies to build professional relationships and advance your career.",
      capacity: 45,
      registrations: 20,
      status: "upcoming",
      registrationDeadline: "2023-04-03",
      attendees: [
        // attendees
      ],
    },
    {
      id: 5,
      title: "Tech Industry Panel Discussion",
      date: "2023-02-28",
      time: "16:00 - 18:00",
      location: "Computer Science Building, Room 105",
      presenter: "Various Industry Professionals",
      description:
        "Panel discussion with professionals from leading tech companies sharing insights about the industry.",
      capacity: 70,
      registrations: 68,
      status: "canceled",
      registrationDeadline: "2023-02-25",
      attendees: [
        // attendees
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [attendeeSearchTerm, setAttendeeSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState({
    status: "all",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });
  const [activeTabWorkshop, setActiveTabWorkshop] = useState("details");

  // State for add/edit workshop form
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [agendaItems, setAgendaItems] = useState([""]);
  const [workshopForm, setWorkshopForm] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    isOnline: false,
    meetingLink: "",
    presenter: "",
    presenterBio: "",
    description: "",
    capacity: 50,
    registrationDeadline: "",
  });

  // State for confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [workshopToDelete, setWorkshopToDelete] = useState(null);

  // Reset form when modal closes
  const resetWorkshopForm = () => {
    setWorkshopForm({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      isOnline: false,
      meetingLink: "",
      presenter: "",
      presenterBio: "",
      description: "",
      capacity: 50,
      registrationDeadline: "",
    });
    setAgendaItems([""]);
    setIsEditMode(false);
  };

  // Open modal for adding new workshop
  const openAddWorkshopModal = () => {
    resetWorkshopForm();
    setIsWorkshopModalOpen(true);
  };

  // Open modal for editing existing workshop
  const openEditWorkshopModal = (workshop) => {
    setIsEditMode(true);
    setWorkshopForm({
      id: workshop.id,
      title: workshop.title,
      date: workshop.date,
      startTime: workshop.startTime,
      endTime: workshop.endTime,
      location: workshop.location,
      isOnline: workshop.isOnline,
      meetingLink: workshop.meetingLink || "",
      presenter: workshop.presenter,
      presenterBio: workshop.presenterBio || "",
      description: workshop.description,
      capacity: workshop.capacity,
      registrationDeadline: workshop.registrationDeadline,
    });
    setAgendaItems(workshop.agenda || [""]);
    setIsWorkshopModalOpen(true);
  };

  // Handle agenda item changes
  const handleAgendaItemChange = (index, value) => {
    const newAgendaItems = [...agendaItems];
    newAgendaItems[index] = value;
    setAgendaItems(newAgendaItems);
  };

  // Add new agenda item
  const addAgendaItem = () => {
    setAgendaItems([...agendaItems, ""]);
  };

  // Remove agenda item
  const removeAgendaItem = (index) => {
    if (agendaItems.length > 1) {
      const newAgendaItems = [...agendaItems];
      newAgendaItems.splice(index, 1);
      setAgendaItems(newAgendaItems);
    }
  };

  // Handle workshop form submission
  const handleWorkshopSubmit = () => {
    // Format time display string
    const timeDisplay = `${workshopForm.startTime} - ${workshopForm.endTime}`;

    // Filter out empty agenda items
    const filteredAgenda = agendaItems.filter((item) => item.trim() !== "");

    if (isEditMode) {
      // Update existing workshop
      const updatedWorkshops = workshops.map((workshop) =>
        workshop.id === workshopForm.id
          ? {
              ...workshop,
              ...workshopForm,
              time: timeDisplay,
              agenda: filteredAgenda,
            }
          : workshop
      );
      setWorkshops(updatedWorkshops);

      // Update selected workshop if it's the one being edited
      if (selectedWorkshop && selectedWorkshop.id === workshopForm.id) {
        setSelectedWorkshop({
          ...selectedWorkshop,
          ...workshopForm,
          time: timeDisplay,
          agenda: filteredAgenda,
        });
      }
    } else {
      // Add new workshop
      const newWorkshop = {
        id: Math.max(...workshops.map((w) => w.id), 0) + 1,
        ...workshopForm,
        time: timeDisplay,
        agenda: filteredAgenda,
        status: "upcoming",
        registrations: 0,
        attendees: [],
      };

      setWorkshops([...workshops, newWorkshop]);
    }

    // Close modal and reset form
    setIsWorkshopModalOpen(false);
    resetWorkshopForm();
  };

  // Handle workshop deletion/cancellation
  const confirmDeleteWorkshop = (workshop) => {
    setWorkshopToDelete(workshop);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteWorkshop = () => {
    if (!workshopToDelete) return;

    // Completely remove the workshop from the list instead of marking as canceled
    const updatedWorkshops = workshops.filter(
      (workshop) => workshop.id !== workshopToDelete.id
    );

    setWorkshops(updatedWorkshops);

    // If the deleted workshop was selected, clear the selection
    if (selectedWorkshop && selectedWorkshop.id === workshopToDelete.id) {
      setSelectedWorkshop(null);
    }

    // Reset state
    setWorkshopToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  // Statistics
  const statistics = {
    totalWorkshops: workshops.length,
    upcomingWorkshops: workshops.filter((w) => w.status === "upcoming").length,
    completedWorkshops: workshops.filter((w) => w.status === "completed")
      .length,
    totalRegistrations: workshops.reduce(
      (sum, workshop) => sum + workshop.registrations,
      0
    ),
    averageAttendance:
      workshops.filter((w) => w.status === "completed").length > 0
        ? Math.round(
            workshops
              .filter((w) => w.status === "completed")
              .reduce((sum, workshop) => {
                const attendedCount = workshop.attendees.filter(
                  (a) => a.attended === true
                ).length;
                return sum + (attendedCount / workshop.registrations) * 100;
              }, 0) / workshops.filter((w) => w.status === "completed").length
          )
        : 0,
  };

  // Sort and filter functions
  const sortWorkshops = (workshops, config) => {
    return [...workshops].sort((a, b) => {
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

  const handleWorkshopSearch = () => {
    let filtered = [...workshops];

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((workshop) => workshop.status === activeTab);
    }

    // Filter by status
    if (filterParams.status !== "all") {
      filtered = filtered.filter(
        (workshop) => workshop.status === filterParams.status
      );
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(
        (workshop) =>
          workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.presenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workshop.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    return sortWorkshops(filtered, sortConfig);
  };

  const filterAttendees = (attendees) => {
    if (!attendeeSearchTerm) return attendees;

    return attendees.filter(
      (attendee) =>
        attendee.name
          .toLowerCase()
          .includes(attendeeSearchTerm.toLowerCase()) ||
        attendee.studentId
          .toLowerCase()
          .includes(attendeeSearchTerm.toLowerCase()) ||
        attendee.email.toLowerCase().includes(attendeeSearchTerm.toLowerCase())
    );
  };

  const markAttendance = (workshopId, attendeeId, status) => {
    setWorkshops(
      workshops.map((workshop) =>
        workshop.id === workshopId
          ? {
              ...workshop,
              attendees: workshop.attendees.map((attendee) =>
                attendee.id === attendeeId
                  ? { ...attendee, attended: status }
                  : attendee
              ),
            }
          : workshop
      )
    );

    if (selectedWorkshop && selectedWorkshop.id === workshopId) {
      setSelectedWorkshop({
        ...selectedWorkshop,
        attendees: selectedWorkshop.attendees.map((attendee) =>
          attendee.id === attendeeId
            ? { ...attendee, attended: status }
            : attendee
        ),
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

  const getAttendanceColor = (status) => {
    if (status === true) return "bg-green-500/20 text-green-400";
    if (status === false) return "bg-red-500/20 text-red-400";
    return "bg-gray-500/20 text-gray-400";
  };

  const getAttendanceText = (status) => {
    if (status === true) return "Present";
    if (status === false) return "Absent";
    return "Not Marked";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Total Workshops</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalWorkshops}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  {statistics.upcomingWorkshops} upcoming
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Award className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Upcoming Workshops</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.upcomingWorkshops}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Scheduled events
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
                <p className="text-gray-400 mb-1 text-sm">
                  Total Registrations
                </p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.totalRegistrations}
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  Student sign-ups
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Users className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-sm">Avg. Attendance</p>
                <h2 className="text-3xl font-bold text-white">
                  {statistics.averageAttendance}%
                </h2>
                <p className="text-sm text-[#FF6F1B] font-medium mt-1">
                  For completed workshops
                </p>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <CheckCircle className="text-[#FF6F1B]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* List view */}
        <div
          className={`${
            selectedWorkshop ? "w-full md:w-1/2 lg:w-2/5" : "w-full"
          }`}
        >
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
            <CardContent className="p-0">
              {/* Tabs and filters */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <Tabs
                    defaultValue="all"
                    onValueChange={setActiveTab}
                    className="w-full md:w-auto"
                  >
                    <TabsList className="bg-black border border-gray-800 text-gray-400">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="upcoming"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Upcoming
                      </TabsTrigger>
                      <TabsTrigger
                        value="completed"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Completed
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="relative flex-1 md:w-60">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10 bg-black border-gray-700 text-white"
                      placeholder="Search workshops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Filter by:</span>
                    <Select
                      value={filterParams.status}
                      onValueChange={(value) =>
                        setFilterParams({ ...filterParams, status: value })
                      }
                    >
                      <SelectTrigger className="w-32 bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                    onClick={openAddWorkshopModal}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                      <Plus className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Plus className="h-4 w-4 mr-2" /> New Workshop
                    </span>
                    <span className="relative invisible">New Workshop</span>
                  </a>
                </div>
              </div>

              {/* Sort bar */}
              <div className="flex items-center p-3 bg-gray-900/30 border-b border-gray-800 text-sm">
                <div
                  className="flex items-center w-1/2 cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => handleSortChange("date")}
                >
                  <span>Date</span>
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
                <div
                  className="flex items-center w-1/2 cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => handleSortChange("title")}
                >
                  <span>Workshop</span>
                  {sortConfig.key === "title" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </div>

              {/* Workshops list */}
              <div className="divide-y divide-gray-800 max-h-[600px] overflow-y-auto">
                {handleWorkshopSearch().length > 0 ? (
                  handleWorkshopSearch().map((workshop) => (
                    <div
                      key={workshop.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                        selectedWorkshop?.id === workshop.id
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => setSelectedWorkshop(workshop)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">
                            {workshop.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {workshop.date} • {workshop.time}
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(workshop.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(workshop.status)}
                            <span>
                              {workshop.status.charAt(0).toUpperCase() +
                                workshop.status.slice(1)}
                            </span>
                          </div>
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{workshop.location}</span>
                        </div>
                        <span className="text-gray-500">
                          {workshop.registrations}/{workshop.capacity}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-400">
                    No workshops match your filters. Try adjusting your search
                    criteria.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail view */}
        {selectedWorkshop && (
          <div className="w-full md:w-1/2 lg:w-3/5">
            <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
              <CardContent className="p-0">
                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {selectedWorkshop.title}
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          className={getStatusColor(selectedWorkshop.status)}
                        >
                          <div className="flex items-center">
                            {getStatusIcon(selectedWorkshop.status)}
                            <span>
                              {selectedWorkshop.status.charAt(0).toUpperCase() +
                                selectedWorkshop.status.slice(1)}
                            </span>
                          </div>
                        </Badge>
                        <span className="text-gray-400 text-sm">
                          {selectedWorkshop.registrations}/
                          {selectedWorkshop.capacity} registered
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-5 py-2 h-8 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        onClick={() => openEditWorkshopModal(selectedWorkshop)}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                          <Edit className="h-3.5 w-3.5" />
                        </span>
                        <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </span>
                        <span className="relative invisible">Edit</span>
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center justify-center px-5 py-2 h-8 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                        onClick={() => confirmDeleteWorkshop(selectedWorkshop)}
                      >
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500/20 group-hover:translate-x-0 ease">
                          <Trash2 className="h-3.5 w-3.5" />
                        </span>
                        <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                        </span>
                        <span className="relative invisible">Delete</span>
                      </a>
                    </div>
                  </div>

                  <Tabs
                    defaultValue="details"
                    onValueChange={setActiveTabWorkshop}
                    className="w-full"
                  >
                    <TabsList className="bg-black border border-gray-800 text-gray-400">
                      <TabsTrigger
                        value="details"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="attendees"
                        className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
                      >
                        Attendees ({selectedWorkshop.registrations})
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Content */}
                <div className="p-6">
                  {activeTabWorkshop === "details" ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4 bg-black p-4 rounded-lg border border-gray-800">
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="text-white">{selectedWorkshop.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="text-white">{selectedWorkshop.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <div className="flex items-center text-white">
                            {selectedWorkshop.isOnline ? (
                              <Video className="h-4 w-4 mr-1 text-[#FF6F1B]" />
                            ) : (
                              <MapPin className="h-4 w-4 mr-1 text-[#FF6F1B]" />
                            )}
                            <span>{selectedWorkshop.location}</span>
                          </div>
                        </div>
                        {selectedWorkshop.isOnline &&
                          selectedWorkshop.meetingLink && (
                            <div>
                              <p className="text-sm text-gray-500">
                                Meeting Link
                              </p>
                              <div className="flex items-center text-[#FF6F1B]">
                                <Link className="h-4 w-4 mr-1" />
                                <a
                                  href={selectedWorkshop.meetingLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:underline"
                                >
                                  Join Meeting
                                </a>
                              </div>
                            </div>
                          )}
                        <div>
                          <p className="text-sm text-gray-500">Presenter</p>
                          <p className="text-white">
                            {selectedWorkshop.presenter}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Registration Deadline
                          </p>
                          <p className="text-white">
                            {selectedWorkshop.registrationDeadline}
                          </p>
                        </div>
                      </div>

                      {/* Workshop Description */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white text-sm">
                          Description
                        </h4>
                        <div className="bg-black p-4 rounded-lg border border-gray-800">
                          <p className="text-gray-300 whitespace-pre-line">
                            {selectedWorkshop.description}
                          </p>
                        </div>
                      </div>

                      {/* Presenter Bio */}
                      {selectedWorkshop.presenterBio && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-white text-sm">
                            Presenter Bio
                          </h4>
                          <div className="bg-black p-4 rounded-lg border border-gray-800">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 bg-gradient-to-br from-[#EC1024] to-[#FF6F1B] rounded-full flex items-center justify-center text-white text-lg font-bold">
                                {selectedWorkshop.presenter.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-white">
                                  {selectedWorkshop.presenter}
                                </h5>
                                <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">
                                  {selectedWorkshop.presenterBio}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Workshop Agenda */}
                      {selectedWorkshop.agenda &&
                        selectedWorkshop.agenda.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-white text-sm">
                              Workshop Agenda
                            </h4>
                            <div className="bg-black p-4 rounded-lg border border-gray-800">
                              <ol className="space-y-2 list-decimal pl-5 text-gray-300">
                                {selectedWorkshop.agenda.map((item, index) => (
                                  <li key={index} className="text-gray-300">
                                    {item}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        )}

                      {/* Registration Details */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white text-sm">
                          Registration Details
                        </h4>
                        <div className="bg-black p-4 rounded-lg border border-gray-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gray-400 text-sm">
                                Capacity:{" "}
                                <span className="text-white">
                                  {selectedWorkshop.capacity}
                                </span>
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                Registered:{" "}
                                <span className="text-white">
                                  {selectedWorkshop.registrations}
                                </span>
                              </p>
                            </div>
                            <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center">
                              <div className="text-center">
                                <p className="text-xl font-bold text-white">
                                  {Math.round(
                                    (selectedWorkshop.registrations /
                                      selectedWorkshop.capacity) *
                                      100
                                  )}
                                  %
                                </p>
                                <p className="text-xs text-gray-400">Full</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="relative w-full md:w-64">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            className="pl-10 bg-black border-gray-700 text-white"
                            placeholder="Search attendees..."
                            value={attendeeSearchTerm}
                            onChange={(e) =>
                              setAttendeeSearchTerm(e.target.value)
                            }
                          />
                        </div>
                        {selectedWorkshop.status === "completed" && (
                          <div className="flex items-center text-sm text-gray-400">
                            <span className="mr-2">Attendance:</span>
                            <Badge className="bg-green-500/20 text-green-400 mr-1">
                              {
                                selectedWorkshop.attendees.filter(
                                  (a) => a.attended === true
                                ).length
                              }{" "}
                              Present
                            </Badge>
                            <Badge className="bg-red-500/20 text-red-400">
                              {
                                selectedWorkshop.attendees.filter(
                                  (a) => a.attended === false
                                ).length
                              }{" "}
                              Absent
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-10 p-3 bg-gray-900/30 border-b border-gray-800 text-sm font-medium text-gray-400">
                          <div className="col-span-4">Student</div>
                          <div className="col-span-4">Email</div>
                          <div className="col-span-2 text-right">
                            Attendance
                          </div>
                        </div>

                        <div className="divide-y divide-gray-800 max-h-[400px] overflow-y-auto">
                          {filterAttendees(selectedWorkshop.attendees).length >
                          0 ? (
                            filterAttendees(selectedWorkshop.attendees).map(
                              (attendee) => (
                                <div
                                  key={attendee.id}
                                  className="grid grid-cols-10 p-3 items-center hover:bg-gray-800/20"
                                >
                                  <div className="col-span-4 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                      {attendee.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="text-white">
                                        {attendee.name}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {attendee.studentId}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-4 text-gray-400 truncate">
                                    {attendee.email}
                                  </div>
                                  <div className="col-span-2 flex justify-end">
                                    {selectedWorkshop.status === "completed" ? (
                                      <Badge
                                        className={getAttendanceColor(
                                          attendee.attended
                                        )}
                                      >
                                        {getAttendanceText(attendee.attended)}
                                      </Badge>
                                    ) : (
                                      <div className="flex space-x-1">
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-8 w-8 p-0 border-gray-700 text-white hover:bg-green-500/10 hover:text-green-500"
                                          onClick={() =>
                                            markAttendance(
                                              selectedWorkshop.id,
                                              attendee.id,
                                              true
                                            )
                                          }
                                        >
                                          <CheckCircle className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-8 w-8 p-0 border-gray-700 text-white hover:bg-red-500/10 hover:text-red-500"
                                          onClick={() =>
                                            markAttendance(
                                              selectedWorkshop.id,
                                              attendee.id,
                                              false
                                            )
                                          }
                                        >
                                          <XCircle className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )
                          ) : (
                            <div className="p-6 text-center text-gray-400">
                              No attendees match your search. Try adjusting your
                              search criteria.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end mt-4 pt-4 border-t border-gray-800">
                        <a
                          href="#"
                          className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                        >
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                            <FileText className="h-4 w-4" />
                          </span>
                          <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                            <FileText className="h-4 w-4 mr-2" /> Export
                            Attendance
                          </span>
                          <span className="relative invisible">
                            Export Attendance
                          </span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-black border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Workshop
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this workshop? This action cannot
              be undone and will permanently remove the workshop from the
              system. All registration data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-black border-gray-700 text-white hover:bg-gray-800">
              No, Keep Workshop
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteWorkshop}
            >
              Yes, Delete Workshop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Workshop Form Modal */}
      <Dialog open={isWorkshopModalOpen} onOpenChange={setIsWorkshopModalOpen}>
        <DialogContent className="bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              {isEditMode ? "Edit Workshop" : "New Workshop"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Workshop Title */}
            <div>
              <Label htmlFor="title">Workshop Title</Label>
              <Input
                id="title"
                className="bg-black border-gray-700 text-white mt-1"
                placeholder="Enter workshop title"
                value={workshopForm.title}
                onChange={(e) =>
                  setWorkshopForm({ ...workshopForm, title: e.target.value })
                }
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="bg-black border-gray-700 text-white mt-1"
                  value={workshopForm.date}
                  onChange={(e) =>
                    setWorkshopForm({ ...workshopForm, date: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Time</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    id="startTime"
                    type="time"
                    className="bg-black border-gray-700 text-white"
                    value={workshopForm.startTime}
                    onChange={(e) =>
                      setWorkshopForm({
                        ...workshopForm,
                        startTime: e.target.value,
                      })
                    }
                    required
                  />
                  <span className="text-gray-400">-</span>
                  <Input
                    id="endTime"
                    type="time"
                    className="bg-black border-gray-700 text-white"
                    value={workshopForm.endTime}
                    onChange={(e) =>
                      setWorkshopForm({
                        ...workshopForm,
                        endTime: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Switch
                  id="isOnline"
                  checked={workshopForm.isOnline}
                  onCheckedChange={(checked) =>
                    setWorkshopForm({ ...workshopForm, isOnline: checked })
                  }
                />
                <Label htmlFor="isOnline">Online Workshop</Label>
              </div>

              <Input
                id="location"
                className="bg-black border-gray-700 text-white"
                placeholder={
                  workshopForm.isOnline
                    ? "Platform (e.g., Zoom)"
                    : "Location (e.g., Hall A)"
                }
                value={workshopForm.location}
                onChange={(e) =>
                  setWorkshopForm({ ...workshopForm, location: e.target.value })
                }
                required
              />

              {workshopForm.isOnline && (
                <Input
                  id="meetingLink"
                  className="bg-black border-gray-700 text-white mt-2"
                  placeholder="Meeting Link"
                  value={workshopForm.meetingLink}
                  onChange={(e) =>
                    setWorkshopForm({
                      ...workshopForm,
                      meetingLink: e.target.value,
                    })
                  }
                />
              )}
            </div>

            {/* Presenter */}
            <div>
              <Label htmlFor="presenter">Presenter</Label>
              <Input
                id="presenter"
                className="bg-black border-gray-700 text-white mt-1"
                placeholder="Presenter name"
                value={workshopForm.presenter}
                onChange={(e) =>
                  setWorkshopForm({
                    ...workshopForm,
                    presenter: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Presenter Bio */}
            <div>
              <Label htmlFor="presenterBio">Presenter Bio</Label>
              <Textarea
                id="presenterBio"
                className="bg-black border-gray-700 text-white h-20 mt-1"
                placeholder="Presenter biography"
                value={workshopForm.presenterBio}
                onChange={(e) =>
                  setWorkshopForm({
                    ...workshopForm,
                    presenterBio: e.target.value,
                  })
                }
              />
            </div>

            {/* Workshop Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="bg-black border-gray-700 text-white h-20 mt-1"
                placeholder="Workshop description"
                value={workshopForm.description}
                onChange={(e) =>
                  setWorkshopForm({
                    ...workshopForm,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Workshop Agenda */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label>Agenda Items</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="bg-black border-gray-700 text-white h-7 px-2"
                  onClick={addAgendaItem}
                >
                  <Plus className="h-3 w-3 mr-1" /> Add
                </Button>
              </div>

              <div className="space-y-2">
                {agendaItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      className="bg-black border-gray-700 text-white flex-1"
                      placeholder={`Item ${index + 1}`}
                      value={item}
                      onChange={(e) =>
                        handleAgendaItemChange(index, e.target.value)
                      }
                    />
                    {agendaItems.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-red-900/20 text-red-400 border-red-900/20 h-8 w-8 p-0"
                        onClick={() => removeAgendaItem(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="bg-black border-gray-700 text-white"
              onClick={() => setIsWorkshopModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
              onClick={handleWorkshopSubmit}
              disabled={
                !workshopForm.title ||
                !workshopForm.date ||
                !workshopForm.startTime ||
                !workshopForm.endTime ||
                !workshopForm.location ||
                !workshopForm.presenter ||
                !workshopForm.description
              }
            >
              {isEditMode ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
