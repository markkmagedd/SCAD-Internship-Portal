"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  Video,
  PenLine,
  Download,
  Star,
  StarHalf,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Send,
  Award,
  Bell,
  Check,
  XCircle,
  Plus,
  Bookmark,
  MoreVertical,
  Sparkles,
  CheckCircle,
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

export default function WorkshopsPage() {
  // State for filtering and searching workshops
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // State for workshop details
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [registeredWorkshops, setRegisteredWorkshops] = useState([1, 3]);
  const [completedWorkshops, setCompletedWorkshops] = useState([5, 6]);

  // Function to mark workshop as completed
  const markWorkshopAsCompleted = (workshopId) => {
    if (registeredWorkshops.includes(workshopId)) {
      // Remove from registered workshops
      setRegisteredWorkshops(
        registeredWorkshops.filter((id) => id !== workshopId)
      );
      // Add to completed workshops if not already there
      if (!completedWorkshops.includes(workshopId)) {
        setCompletedWorkshops([...completedWorkshops, workshopId]);

        // Find the workshop to get its title
        const completedWorkshop = workshops.find((w) => w.id === workshopId);
        if (completedWorkshop) {
          // Show a notification
          alert(
            `Congratulations! You've completed "${completedWorkshop.title}" and earned a certificate!`
          );

          // Show certificate after a short delay
          setTimeout(() => {
            setShowCertificate(true);
          }, 500);
        }
      }
    }
  };

  // State for video player
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoVolume, setVideoVolume] = useState(80);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressUpdateIntervalRef = useRef(null);

  // State for chat
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "John Smith",
      initial: "J",
      color: "from-[#EC1024]/60 to-[#FF6F1B]/60",
      message: "This is exactly what I needed for my next interview!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: 2,
      sender: "Sara Lee",
      initial: "S",
      color: "from-purple-500/60 to-blue-500/60",
      message: "Can you explain more about the networking strategies?",
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
    {
      id: 3,
      sender: "Mark Johnson",
      initial: "M",
      color: "from-green-500/60 to-teal-500/60",
      message: "Thank you for covering this topic. Very insightful!",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
    {
      id: 4,
      sender: "Instructor",
      initial: "I",
      color: "from-[#EC1024]/60 to-[#FF6F1B]/60",
      message:
        "Glad you're finding it helpful! I'll cover more networking strategies in the next section.",
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
    {
      id: 5,
      sender: "Ryan Williams",
      initial: "R",
      color: "from-yellow-500/60 to-amber-500/60",
      message: "How do I apply these techniques for remote positions?",
      timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showChatNotification, setShowChatNotification] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const chatContainerRef = useRef(null);

  // State for notes
  const [workshopNotes, setWorkshopNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  // State for workshop rating
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState("");

  // State for certificate
  const [showCertificate, setShowCertificate] = useState(false);

  // Update video progress when playing
  useEffect(() => {
    if (progressUpdateIntervalRef.current) {
      clearInterval(progressUpdateIntervalRef.current);
      progressUpdateIntervalRef.current = null;
    }

    if (isPlaying) {
      // Simulate video progress
      progressUpdateIntervalRef.current = setInterval(() => {
        setVideoProgress((prev) => {
          // Loop back to beginning when reaching 100%
          if (prev >= 100) {
            setIsPlaying(false);
            // Mark workshop as completed when video reaches end
            if (
              selectedWorkshop &&
              registeredWorkshops.includes(selectedWorkshop.id)
            ) {
              markWorkshopAsCompleted(selectedWorkshop.id);
            }
            return 0;
          }
          return prev + 0.5; // Increment by small amount for smooth progress
        });
      }, 100);
    }

    return () => {
      if (progressUpdateIntervalRef.current) {
        clearInterval(progressUpdateIntervalRef.current);
        progressUpdateIntervalRef.current = null;
      }
    };
  }, [isPlaying, selectedWorkshop, registeredWorkshops]);

  // Play/pause when isPlaying state changes
  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  // Add a new useEffect to scroll to the bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Clean up session storage on unmount
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("certificateWorkshop");
      sessionStorage.removeItem("ratingWorkshop");
    };
  }, []);

  // Mock data for workshops - update with a working video URL
  const workshops = [
    {
      id: 1,
      title: "Resume Building Masterclass",
      instructor: "Sarah Johnson",
      role: "Senior HR Manager, Google",
      date: "2023-07-15",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      type: "live",
      category: "Job Search",
      attendees: 145,
      status: "upcoming",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      description:
        "Learn how to craft a professional resume that stands out to recruiters. This workshop will cover formatting, content organization, and how to showcase your skills effectively.",
      tags: ["resume", "job search", "career development"],
      // Using a royalty-free demo video
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    },
    {
      id: 2,
      title: "Technical Interview Preparation",
      instructor: "Michael Chen",
      role: "Engineering Manager, Microsoft",
      date: "2023-07-20",
      time: "2:00 PM - 4:30 PM",
      duration: "2.5 hours",
      type: "live",
      category: "Interview Skills",
      attendees: 98,
      status: "upcoming",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
      description:
        "Prepare for technical interviews with practical tips, mock interview sessions, and insights into what top tech companies look for in candidates.",
      tags: ["technical interview", "coding", "problem solving"],
      // Using a royalty-free demo video
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    },
    {
      id: 3,
      title: "Networking in the Digital Age",
      instructor: "Jessica Lee",
      role: "Career Consultant",
      date: "2023-07-25",
      time: "1:00 PM - 3:00 PM",
      duration: "2 hours",
      type: "live",
      category: "Networking",
      attendees: 112,
      status: "upcoming",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      description:
        "Discover effective strategies for building your professional network online. Learn to leverage LinkedIn and other platforms to connect with industry professionals.",
      tags: ["networking", "linkedin", "professional relationships"],
      // Using a royalty-free demo video
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 4,
      title: "Salary Negotiation Tactics",
      instructor: "Robert Williams",
      role: "Corporate Recruiter",
      date: "2023-08-05",
      time: "11:00 AM - 1:00 PM",
      duration: "2 hours",
      type: "live",
      category: "Career Development",
      attendees: 78,
      status: "upcoming",
      thumbnailUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      description:
        "Learn effective strategies for negotiating your salary and benefits package. This workshop provides practical advice for maximizing your compensation.",
      tags: ["salary negotiation", "career advancement", "benefits"],
      // Using a royalty-free demo video
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: 5,
      title: "Personal Branding for Professionals",
      instructor: "Emily Clarke",
      role: "Personal Brand Strategist",
      date: "2023-06-10",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      type: "recorded",
      category: "Career Development",
      attendees: 235,
      status: "completed",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
      description:
        "Develop a compelling personal brand that helps you stand out in your industry. Learn to communicate your value proposition effectively.",
      tags: ["personal branding", "professional identity", "online presence"],
      rating: 4.8,
      // Using a royalty-free demo video
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      hasCertificate: true,
    },
    {
      id: 6,
      title: "LinkedIn Profile Optimization",
      instructor: "David Park",
      role: "LinkedIn Specialist",
      date: "2023-06-20",
      time: "2:00 PM - 4:00 PM",
      duration: "2 hours",
      type: "recorded",
      category: "Job Search",
      attendees: 189,
      status: "completed",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21",
      description:
        "Optimize your LinkedIn profile to attract recruiters and expand your professional network. This workshop covers all aspects of creating an impactful LinkedIn presence.",
      tags: ["linkedin", "job search", "professional profile"],
      rating: 4.5,
      // Using a royalty-free demo video
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      hasCertificate: true,
    },
  ];

  // Update the hasCertificate property for all workshops based on whether they are completed
  const updatedWorkshops = workshops.map((workshop) => ({
    ...workshop,
    hasCertificate: completedWorkshops.includes(workshop.id),
  }));

  // Filter workshops based on tab, search query, and category filter
  const filteredWorkshops = updatedWorkshops.filter((workshop) => {
    // Filter by tab
    if (activeTab === "upcoming" && workshop.status !== "upcoming")
      return false;
    if (
      activeTab === "registered" &&
      !registeredWorkshops.includes(workshop.id)
    )
      return false;
    if (activeTab === "completed" && !completedWorkshops.includes(workshop.id))
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !workshop.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by category
    if (selectedFilter !== "all" && workshop.category !== selectedFilter)
      return false;

    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Career Workshops</h1>
      <p className="text-gray-400">
        Access exclusive professional development workshops to enhance your
        skills and career prospects.
      </p>

      {/* Tabs for navigation */}
      <div className="flex space-x-2 border-b border-gray-800">
        <button
          className={`pb-2 px-4 font-medium relative ${
            activeTab === "upcoming"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Workshops
          {activeTab === "upcoming" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"></div>
          )}
        </button>
        <button
          className={`pb-2 px-4 font-medium relative ${
            activeTab === "registered"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("registered")}
        >
          My Registrations
          {activeTab === "registered" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"></div>
          )}
        </button>
        <button
          className={`pb-2 px-4 font-medium relative ${
            activeTab === "completed"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Workshops
          {activeTab === "completed" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"></div>
          )}
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search workshops..."
            className="pl-10 bg-black border border-gray-800 text-white focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full bg-black border border-gray-800 text-white focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black border border-gray-800 text-white">
              <SelectItem
                value="all"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                All Categories
              </SelectItem>
              <SelectItem
                value="Job Search"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                Job Search
              </SelectItem>
              <SelectItem
                value="Interview Skills"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                Interview Skills
              </SelectItem>
              <SelectItem
                value="Networking"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                Networking
              </SelectItem>
              <SelectItem
                value="Career Development"
                className="focus:bg-gradient-to-r focus:from-[#EC1024]/20 focus:to-[#FF6F1B]/20"
              >
                Career Development
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Workshops will be listed here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <Card
              key={workshop.id}
              className="bg-black border-gray-800 shadow-sm hover:shadow-[#FF6F1B]/30 hover:border-[#FF6F1B]/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedWorkshop(workshop)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden h-40 w-full rounded-t-xl">
                  <img
                    src={workshop.thumbnailUrl}
                    alt={workshop.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <Badge
                      className={`${
                        workshop.type === "live"
                          ? "bg-[#FF6F1B]/20 text-[#FF6F1B]"
                          : "bg-black border border-gray-700 text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        {workshop.type === "live" ? (
                          <Video className="h-3 w-3 mr-1" />
                        ) : (
                          <Play className="h-3 w-3 mr-1" />
                        )}
                        <span>
                          {workshop.type === "live" ? "Live" : "Recorded"}
                        </span>
                      </div>
                    </Badge>
                    {registeredWorkshops.includes(workshop.id) && (
                      <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Registered</span>
                      </Badge>
                    )}
                  </div>

                  {/* Direct Access Buttons for Completed Workshops */}
                  {activeTab === "completed" && (
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {workshop.hasCertificate && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log("Certificate button clicked");
                            // Show certificate directly
                            setTimeout(() => {
                              setShowCertificate(true);
                            }, 50);
                          }}
                          className="p-2 bg-black/80 hover:bg-black rounded-full border border-[#FF6F1B]/50 hover:border-[#FF6F1B] text-[#FF6F1B] transition-all duration-200"
                        >
                          <Award className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          console.log("Rating button clicked");
                          // Show rating dialog directly
                          setTimeout(() => {
                            setShowRatingDialog(true);
                          }, 50);
                        }}
                        className="p-2 bg-black/80 hover:bg-black rounded-full border border-gray-700 hover:border-[#FF6F1B] text-gray-300 hover:text-[#FF6F1B] transition-all duration-200"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FF6F1B] transition-colors">
                    {workshop.title}
                  </h3>

                  <div className="mb-3 flex flex-col space-y-1">
                    <p className="text-gray-400 text-sm">
                      {workshop.instructor}
                    </p>
                    <p className="text-gray-500 text-xs italic">
                      {workshop.role}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1 text-[#FF6F1B]" />
                    <span>
                      {new Date(workshop.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1 text-[#FF6F1B]" />
                    <span>{workshop.time}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {workshop.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs bg-black text-gray-300 border-gray-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {workshop.attendees} attendees
                      </span>
                    </div>

                    {workshop.status === "completed" && (
                      <div className="flex items-center">
                        <Star className="h-3.5 w-3.5 text-[#FF6F1B]" />
                        <span className="text-white ml-1">
                          {workshop.rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <Video className="h-12 w-12 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              No workshops found
            </h3>
            <p className="text-center max-w-md">
              {activeTab === "upcoming"
                ? "There are no upcoming workshops matching your search criteria."
                : activeTab === "registered"
                ? "You haven't registered for any workshops yet."
                : "You haven't completed any workshops yet."}
            </p>
          </div>
        )}
      </div>

      {/* Workshop Details Dialog */}
      {selectedWorkshop && (
        <Dialog
          open={
            !!selectedWorkshop &&
            !selectedWorkshop.isWatching &&
            !showCertificate &&
            !showRatingDialog
          }
          onOpenChange={(open) => {
            if (!open) {
              // Don't reset selectedWorkshop if other dialogs are open
              if (!showCertificate && !showRatingDialog) {
                setSelectedWorkshop(null);
              }
            }
          }}
        >
          <DialogContent className="bg-black text-white border border-gray-800 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedWorkshop.title}
              </DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <div className="relative overflow-hidden h-64 w-full rounded-lg mb-6">
                <img
                  src={selectedWorkshop.thumbnailUrl}
                  alt={selectedWorkshop.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge
                    className={`${
                      selectedWorkshop.type === "live"
                        ? "bg-[#FF6F1B]/20 text-[#FF6F1B]"
                        : "bg-black border border-gray-700 text-white"
                    }`}
                  >
                    {selectedWorkshop.type === "live"
                      ? "Live Workshop"
                      : "Recorded Workshop"}
                  </Badge>
                  <Badge className="bg-black border border-gray-800 text-white">
                    {selectedWorkshop.category}
                  </Badge>
                </div>
                {selectedWorkshop.status === "completed" && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B] px-3 py-1">
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Completed
                    </Badge>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      About this workshop
                    </h3>
                    <p className="text-gray-400">
                      {selectedWorkshop.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Instructor
                    </h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#EC1024]/60 to-[#FF6F1B]/60 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedWorkshop.instructor
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {selectedWorkshop.instructor}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {selectedWorkshop.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedWorkshop.status === "completed" && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Workshop Rating
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(Math.floor(selectedWorkshop.rating))].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 text-[#FF6F1B]"
                              />
                            )
                          )}
                          {selectedWorkshop.rating % 1 !== 0 && (
                            <StarHalf className="h-5 w-5 text-[#FF6F1B]" />
                          )}
                        </div>
                        <span className="text-white font-medium">
                          {selectedWorkshop.rating} / 5
                        </span>
                        <span className="text-gray-400">
                          ({selectedWorkshop.attendees} attendees)
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {selectedWorkshop.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-black text-gray-300 border-gray-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-gray-900/20 p-4 rounded-lg border border-gray-800">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Workshop Details
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-[#FF6F1B] mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="text-white">
                            {new Date(selectedWorkshop.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-[#FF6F1B] mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Time</p>
                          <p className="text-white">{selectedWorkshop.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Video className="h-5 w-5 text-[#FF6F1B] mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Duration</p>
                          <p className="text-white">
                            {selectedWorkshop.duration}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users className="h-5 w-5 text-[#FF6F1B] mt-0.5 mr-3" />
                        <div>
                          <p className="text-sm text-gray-400">Attendees</p>
                          <p className="text-white">
                            {selectedWorkshop.attendees} registered
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    {selectedWorkshop.status === "upcoming" ? (
                      registeredWorkshops.includes(selectedWorkshop.id) ? (
                        <div className="space-y-3">
                          <div className="bg-[#FF6F1B]/10 border border-[#FF6F1B]/30 rounded-lg p-3">
                            <p className="text-white text-sm flex items-center mb-1">
                              <CheckCircle className="h-4 w-4 text-[#FF6F1B] mr-2" />
                              You're registered for this workshop
                            </p>
                            <p className="text-gray-400 text-xs">
                              You'll receive a notification before it starts
                            </p>
                          </div>

                          <Button
                            className="w-full relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent dialog interaction
                              // Simulate starting a live workshop session
                              setSelectedWorkshop({
                                ...selectedWorkshop,
                                isWatching: true,
                                type: "live", // Ensure it's treated as a live workshop
                              });

                              // Display chat after a delay to simulate real activity
                              setTimeout(() => {
                                setShowChatNotification(true);
                              }, 5000);
                            }}
                          >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                              <Video className="h-5 w-5" />
                            </span>
                            <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                              Join Live Session
                            </span>
                            <span className="relative invisible">
                              Join Live Session
                            </span>
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full border-gray-700 bg-black text-white hover:bg-black hover:text-[#FF6F1B]"
                            onClick={() => {
                              setRegisteredWorkshops(
                                registeredWorkshops.filter(
                                  (id) => id !== selectedWorkshop.id
                                )
                              );
                              setSelectedWorkshop(null);
                            }}
                          >
                            Cancel Registration
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                          onClick={() => {
                            setRegisteredWorkshops([
                              ...registeredWorkshops,
                              selectedWorkshop.id,
                            ]);
                          }}
                        >
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                            <Bookmark className="h-5 w-5" />
                          </span>
                          <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                            Register Now
                          </span>
                          <span className="relative invisible">
                            Register Now
                          </span>
                        </Button>
                      )
                    ) : selectedWorkshop.status === "completed" ? (
                      <div className="space-y-3">
                        <Button
                          className="w-full relative inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg group"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dialog interaction
                            // In a real application, this would start the recorded workshop
                            setSelectedWorkshop({
                              ...selectedWorkshop,
                              isWatching: true,
                            });
                          }}
                        >
                          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-l from-[#EC1024] to-[#FF6F1B] group-hover:translate-x-0 ease">
                            <Play className="h-5 w-5" />
                          </span>
                          <span className="absolute flex items-center justify-center font-bold w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                            Watch Recording
                          </span>
                          <span className="relative invisible">
                            Watch Recording
                          </span>
                        </Button>

                        {selectedWorkshop.hasCertificate && (
                          <div
                            className="w-full p-3 bg-black border border-[#FF6F1B] rounded-md text-[#FF6F1B] hover:bg-[#FF6F1B]/10 flex items-center justify-center space-x-2 cursor-pointer"
                            onClick={() => {
                              alert("Opening certificate...");
                              setShowCertificate(true);
                            }}
                          >
                            <Award className="h-4 w-4" />
                            <span>View Certificate</span>
                          </div>
                        )}

                        <div
                          className="w-full p-3 bg-black border border-gray-700 rounded-md text-white hover:text-[#FF6F1B] hover:border-[#FF6F1B] flex items-center justify-center space-x-2 cursor-pointer"
                          onClick={() => {
                            alert("Opening rating dialog...");
                            setShowRatingDialog(true);
                          }}
                        >
                          <Star className="h-4 w-4" />
                          <span>Rate This Workshop</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Video Player for Recorded Workshop */}
      {selectedWorkshop && selectedWorkshop.isWatching && (
        <Dialog
          open={!!selectedWorkshop.isWatching}
          onOpenChange={(open) =>
            !open &&
            setSelectedWorkshop({ ...selectedWorkshop, isWatching: false })
          }
        >
          <DialogContent className="bg-black text-white border border-gray-800 max-w-5xl p-0 overflow-hidden">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedWorkshop.title} - Video Player</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-[80vh]">
              {/* Video Player */}
              <div className="relative bg-black flex-grow flex flex-col">
                <div className="relative flex-grow">
                  <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
                    {/* Mock video placeholder instead of actual video */}
                    <div className="w-full h-full flex items-center justify-center relative">
                      <img
                        src={selectedWorkshop.thumbnailUrl}
                        alt={selectedWorkshop.title}
                        className="w-full h-full object-cover opacity-50"
                      />

                      {/* Workshop Title Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {selectedWorkshop.title}
                        </h2>
                        <p className="text-gray-300">
                          {selectedWorkshop.instructor} -{" "}
                          {selectedWorkshop.role}
                        </p>
                      </div>

                      {/* Play/Pause overlay button - only show when paused */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <button
                            className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white rounded-full p-6 hover:opacity-90 transition-opacity"
                            onClick={() => setIsPlaying(true)}
                          >
                            <Play className="h-10 w-10" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="bg-[#111] p-4 border-t border-gray-800">
                  <div className="flex flex-col space-y-3">
                    {/* Progress bar */}
                    <div
                      ref={progressBarRef}
                      className="relative w-full h-2 bg-gray-800 rounded-full cursor-pointer overflow-hidden"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const position = (e.clientX - rect.left) / rect.width;
                        setVideoProgress(position * 100);
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] rounded-full"
                        style={{ width: `${videoProgress}%` }}
                      ></div>
                      <div
                        className="absolute top-0 h-4 w-4 bg-white rounded-full -mt-1 cursor-pointer transform -translate-x-1/2 border-2 border-[#FF6F1B]"
                        style={{ left: `${videoProgress}%` }}
                      ></div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <button
                          className="text-white hover:text-[#FF6F1B] transition-colors p-2 rounded-full hover:bg-[#222]"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </button>

                        <button
                          className="text-white hover:text-[#FF6F1B] transition-colors p-2 rounded-full hover:bg-[#222]"
                          onClick={() => {
                            // Simulate going back
                            setVideoProgress((p) => Math.max(0, p - 10));
                          }}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>

                        <button
                          className="text-white hover:text-[#FF6F1B] transition-colors p-2 rounded-full hover:bg-[#222]"
                          onClick={() => {
                            // Simulate going forward
                            setVideoProgress((p) => Math.min(100, p + 10));
                          }}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>

                        <div className="text-white text-sm font-medium">
                          {formatTime((videoProgress / 100) * 3600)} / 1:00:00
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Mark as Completed Button - Only show for registered workshops */}
                        {registeredWorkshops.includes(selectedWorkshop?.id) &&
                          videoProgress >= 90 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#FF6F1B] text-[#FF6F1B] hover:bg-[#FF6F1B]/10 hover:border-[#FF6F1B] px-3"
                              onClick={() =>
                                markWorkshopAsCompleted(selectedWorkshop.id)
                              }
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Mark as
                              Completed
                            </Button>
                          )}

                        <button
                          className="text-white hover:text-[#FF6F1B] transition-colors p-2 rounded-full hover:bg-[#222]"
                          onClick={() => setShowNotes(!showNotes)}
                        >
                          <PenLine className="h-5 w-5" />
                        </button>

                        <button
                          className="text-white hover:text-[#FF6F1B] transition-colors p-2 rounded-full hover:bg-[#222]"
                          onClick={() => setShowChatWindow(!showChatWindow)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          {!showChatWindow && showChatNotification && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-[#EC1024] rounded-full"></span>
                          )}
                        </button>

                        <button
                          className="text-white hover:text-[#FF6F1B] transition-colors p-2 rounded-full hover:bg-[#222]"
                          onClick={() => setShowRatingDialog(true)}
                        >
                          <Star className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              {showNotes && (
                <div className="h-64 bg-[#111] border-t border-gray-800 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-medium">My Notes</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 border-[#FF6F1B] text-[#FF6F1B] hover:bg-[#FF6F1B]/10 hover:border-[#FF6F1B]"
                      onClick={() => {
                        // Save notes
                        setWorkshopNotes({
                          ...workshopNotes,
                          [selectedWorkshop.id]: currentNote,
                        });
                      }}
                    >
                      Save Notes
                    </Button>
                  </div>

                  <Textarea
                    placeholder="Take notes while watching the workshop..."
                    className="bg-black border-gray-800 text-white h-32 resize-none focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B]"
                    value={
                      currentNote || workshopNotes[selectedWorkshop.id] || ""
                    }
                    onChange={(e) => setCurrentNote(e.target.value)}
                  />
                </div>
              )}

              {/* Chat Section - Inside Video Player */}
              {showChatWindow && (
                <div className="h-64 bg-[#111] border-t border-gray-800">
                  <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Live Chat</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                        <Users className="h-3 w-3 mr-1" />
                        <span>42 online</span>
                      </Badge>
                      <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          setShowChatWindow(false);
                          setShowChatNotification(false);
                        }}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div
                    ref={chatContainerRef}
                    className="h-full max-h-[125px] overflow-y-auto p-3 space-y-3"
                  >
                    {/* Dynamic chat messages */}
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start mb-2">
                        <div
                          className={`bg-gradient-to-br ${msg.color} rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-xs mr-2 flex-shrink-0`}
                        >
                          {msg.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <p
                              className={`${
                                msg.sender === "Instructor"
                                  ? "text-[#FF6F1B]"
                                  : msg.color.includes("purple")
                                  ? "text-blue-400"
                                  : msg.color.includes("green")
                                  ? "text-green-400"
                                  : msg.color.includes("yellow")
                                  ? "text-yellow-400"
                                  : "text-[#FF6F1B]"
                              } text-xs font-medium truncate`}
                            >
                              {msg.sender}
                            </p>
                            <p className="text-gray-500 text-xs ml-2 flex-shrink-0">
                              {new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <p className="text-white text-sm break-words">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t border-gray-800">
                    <div className="flex items-center">
                      <Input
                        placeholder="Type a message..."
                        className="bg-black border-gray-800 text-white focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newMessage.trim()) {
                            // Add user message to chat
                            const newUserMessage = {
                              id: Date.now(),
                              sender: "You",
                              initial: "Y",
                              color: "from-blue-600/60 to-indigo-600/60",
                              message: newMessage.trim(),
                              timestamp: new Date().toISOString(),
                            };
                            setChatMessages([...chatMessages, newUserMessage]);
                            setNewMessage("");

                            // Simulate instructor or other attendee response after delay
                            setTimeout(() => {
                              // Random selection between instructor and participant responses
                              const isInstructor = Math.random() > 0.5;
                              const response = {
                                id: Date.now() + 1,
                                sender: isInstructor
                                  ? "Instructor"
                                  : "Sara Lee",
                                initial: isInstructor ? "I" : "S",
                                color: isInstructor
                                  ? "from-[#EC1024]/60 to-[#FF6F1B]/60"
                                  : "from-purple-500/60 to-blue-500/60",
                                message: isInstructor
                                  ? "Thanks for your question! I'll address that in just a moment."
                                  : "Great question! I was wondering about that too.",
                                timestamp: new Date().toISOString(),
                              };
                              setChatMessages((prev) => [...prev, response]);

                              // Show notification if chat is closed
                              if (!showChatWindow) {
                                setShowChatNotification(true);
                              }
                            }, 3000);
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        className="ml-2 text-[#FF6F1B] hover:bg-[#FF6F1B]/10"
                        onClick={() => {
                          if (newMessage.trim()) {
                            // Add user message to chat
                            const newUserMessage = {
                              id: Date.now(),
                              sender: "You",
                              initial: "Y",
                              color: "from-blue-600/60 to-indigo-600/60",
                              message: newMessage.trim(),
                              timestamp: new Date().toISOString(),
                            };
                            setChatMessages([...chatMessages, newUserMessage]);
                            setNewMessage("");

                            // Simulate instructor or other attendee response after delay
                            setTimeout(() => {
                              // Random selection between instructor and participant responses
                              const isInstructor = Math.random() > 0.5;
                              const response = {
                                id: Date.now() + 1,
                                sender: isInstructor
                                  ? "Instructor"
                                  : "Sara Lee",
                                initial: isInstructor ? "I" : "S",
                                color: isInstructor
                                  ? "from-[#EC1024]/60 to-[#FF6F1B]/60"
                                  : "from-purple-500/60 to-blue-500/60",
                                message: isInstructor
                                  ? "Thanks for your question! I'll address that in just a moment."
                                  : "Great question! I was wondering about that too.",
                                timestamp: new Date().toISOString(),
                              };
                              setChatMessages((prev) => [...prev, response]);

                              // Show notification if chat is closed
                              if (!showChatWindow) {
                                setShowChatNotification(true);
                              }
                            }, 3000);
                          }
                        }}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Standalone Certificate Modal */}
              {showCertificate && (
                <div
                  className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
                  onClick={() => setShowCertificate(false)}
                >
                  <div
                    className="bg-[#111] border border-gray-700 rounded-lg max-w-2xl p-6 w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-white">
                        Certificate of Completion
                      </h2>
                      <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => setShowCertificate(false)}
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="relative border-8 border-[#FF6F1B]/30 p-8 bg-gradient-to-b from-black to-gray-900 rounded-lg mb-6">
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-5">
                        <Award className="h-64 w-64 text-[#FF6F1B]" />
                      </div>

                      <div className="relative text-center space-y-6">
                        <div>
                          <h2 className="text-[#FF6F1B] text-xl font-bold tracking-wider">
                            CERTIFICATE OF COMPLETION
                          </h2>
                          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] my-2"></div>
                        </div>

                        <p className="text-gray-400">
                          This certificate is awarded to
                        </p>
                        <h3 className="text-white text-2xl font-bold">
                          Omar Hesham
                        </h3>

                        <p className="text-gray-400">
                          for successfully completing the workshop
                        </p>
                        <h4 className="text-white text-xl font-semibold">
                          "Personal Branding for Professionals"
                        </h4>

                        <div className="flex justify-between items-center pt-6">
                          <div className="text-left">
                            <p className="text-gray-400 text-sm">Date</p>
                            <p className="text-white">
                              {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] flex items-center justify-center text-white">
                              <Sparkles className="h-8 w-8" />
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-gray-400 text-sm">Issued By</p>
                            <p className="text-white">
                              7areefa Career Services
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        className="px-4 py-2 border border-gray-700 bg-black text-white rounded-md hover:text-[#FF6F1B]"
                        onClick={() => setShowCertificate(false)}
                      >
                        Close
                      </button>

                      <button
                        className="px-4 py-2 flex items-center bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white rounded-md hover:opacity-90"
                        onClick={() => {
                          alert("Certificate downloaded!");
                          setShowCertificate(false);
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Notification */}
              {showChatNotification && !showChatWindow && (
                <div className="absolute bottom-4 right-4 bg-[#111] border border-[#FF6F1B] rounded-lg p-4 shadow-lg max-w-xs z-50">
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-[#EC1024]/60 to-[#FF6F1B]/60 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mr-3">
                      S
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Sara Lee</p>
                      <p className="text-gray-400 text-sm">
                        Great question! I was wondering about that too.
                      </p>
                    </div>
                    <button
                      className="text-gray-500 hover:text-white"
                      onClick={() => setShowChatNotification(false)}
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-gray-700 bg-black hover:bg-black hover:text-[#FF6F1B]"
                      onClick={() => setShowChatNotification(false)}
                    >
                      Dismiss
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                      onClick={() => {
                        setShowChatNotification(false);
                        setShowChatWindow(true);
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Rating Dialog - Standalone */}
      {showRatingDialog && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <div className="relative bg-[#111] border border-gray-800 rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">
                Rate This Workshop
              </h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowRatingDialog(false)}
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-medium mb-2">
                Personal Branding for Professionals
              </h3>
              <p className="text-gray-400 mb-4">
                Share your feedback to help us improve
              </p>

              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`p-2 rounded-full transition-colors ${
                      ratingValue >= star
                        ? "text-[#FF6F1B]"
                        : "text-gray-600 hover:text-gray-400"
                    }`}
                    onClick={() => setRatingValue(star)}
                  >
                    <Star className="h-8 w-8" />
                  </button>
                ))}
              </div>

              <Textarea
                placeholder="Share your thoughts about the workshop content, instructor, etc."
                className="bg-black border-gray-800 text-white resize-none focus:border-[#FF6F1B] focus:ring-1 focus:ring-[#FF6F1B] w-full h-24 mt-2"
                value={ratingFeedback}
                onChange={(e) => setRatingFeedback(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                className="border-gray-700 bg-black text-white hover:bg-black hover:text-[#FF6F1B]"
                onClick={() => setShowRatingDialog(false)}
              >
                Cancel
              </Button>

              <Button
                className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:opacity-90"
                onClick={() => {
                  // Here would be the logic to submit the rating
                  setShowRatingDialog(false);

                  // Show success notification
                  alert("Thank you for rating this workshop!");
                }}
                disabled={ratingValue === 0}
              >
                Submit Rating
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to format time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
