"use client";

import { useState, useEffect, useRef } from "react";
import {
  Video,
  Mic,
  MicOff,
  MonitorOff,
  Monitor,
  Phone,
  Settings,
  MessageCircle,
  X,
  Info,
  AlertCircle,
  CheckCircle,
  VideoOff,
  UserX,
  ArrowLeftCircle,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callId = searchParams.get("id");
  const isIncoming = searchParams.get("incoming") === "true";

  // State for call details
  const [callDetails, setCallDetails] = useState(null);

  // State for call controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [participantLeft, setParticipantLeft] = useState(false);
  const [callTime, setCallTime] = useState(0);

  // References
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Load call details from localStorage on component mount
  useEffect(() => {
    try {
      const storedCallDetails = JSON.parse(localStorage.getItem("currentCall"));
      if (storedCallDetails && storedCallDetails.id.toString() === callId) {
        setCallDetails(storedCallDetails);
      } else {
        // Handle error - redirect back if no matching call details
        window.close();
      }
    } catch (error) {
      console.error("Error loading call details:", error);
      window.close();
    }

    // Start call timer
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);

    // Simulate student leaving call after random time (2-5 minutes) for demo
    const participantLeaveTimer = setTimeout(() => {
      if (Math.random() > 0.5) {
        // 50% chance
        setParticipantLeft(true);
        showNotification(
          "Student left the call",
          `${callDetails?.student || "Student"} has left the meeting`
        );
      }
    }, (120 + Math.random() * 180) * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(participantLeaveTimer);
    };
  }, [callId, callDetails?.student]);

  // Format call time
  const formatCallTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Show notification
  const [notification, setNotification] = useState(null);
  const showNotification = (title, message) => {
    setNotification({ title, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Handle microphone toggle
  const toggleMicrophone = () => {
    setIsMuted(!isMuted);
    showNotification(
      !isMuted ? "Microphone Muted" : "Microphone Unmuted",
      !isMuted
        ? "Your microphone has been turned off"
        : "Your microphone has been turned on"
    );
    // In a real app, this would interact with WebRTC
  };

  // Handle video toggle
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    showNotification(
      !isVideoEnabled ? "Camera Enabled" : "Camera Disabled",
      !isVideoEnabled
        ? "Your camera has been turned on"
        : "Your camera has been turned off"
    );
    // In a real app, this would interact with WebRTC
  };

  // Handle screen sharing
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    showNotification(
      !isScreenSharing ? "Screen Sharing Started" : "Screen Sharing Stopped",
      !isScreenSharing
        ? "You are now sharing your screen"
        : "You have stopped sharing your screen"
    );
    // In a real app, this would interact with WebRTC
  };

  // Handle ending the call
  const endCall = () => {
    setIsCallActive(false);
    showNotification("Call Ended", "You have left the meeting");

    // In a real app, this would close the WebRTC connection
    setTimeout(() => {
      window.close();
    }, 3000);
  };

  if (!callDetails) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#FF6F1B] border-opacity-50 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-black border border-gray-700 rounded-lg shadow-lg p-4 max-w-md animate-in slide-in-from-right">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-gray-800/40">
              <Info className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">{notification.title}</h4>
              <p className="text-sm text-gray-400">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Call ended notification */}
      {!isCallActive && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <Card className="bg-black border-gray-800 max-w-lg w-full">
            <CardContent className="p-6 text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-500/20 mb-4">
                <Phone className="h-8 w-8 text-red-400 transform rotate-135" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Call Ended</h2>
              <p className="text-gray-400 mb-6">
                You have left the call. The window will close automatically.
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() => window.close()}
                  className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white"
                >
                  Close Window
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student left notification */}
      {participantLeft && isCallActive && (
        <div className="fixed top-0 inset-x-0 z-40 bg-yellow-500/10 border-b border-yellow-500/30 p-3 flex items-center justify-center">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
          <p className="text-yellow-400 text-sm">
            {callDetails.student} has left the call. You can leave the call or
            wait for them to rejoin.
          </p>
        </div>
      )}

      {/* Main call content */}
      <div className="flex-1 flex flex-col">
        {/* Call info header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-[#FF6F1B]/20 flex items-center justify-center mr-3">
              <Video className="h-5 w-5 text-[#FF6F1B]" />
            </div>
            <div>
              <h1 className="text-lg font-medium text-white">
                Call with {callDetails.student}
                {callDetails.type === "company" && " (Company)"}
              </h1>
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-3">{formatCallTime(callTime)}</span>
                <Badge className="bg-green-500/20 text-green-400">
                  Active Call
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Video area */}
        <div className="flex-1 grid grid-cols-4 gap-4 p-4 relative">
          {/* Main video (student) */}
          <div className="col-span-3 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative">
            {isScreenSharing ? (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="h-16 w-16 text-[#FF6F1B] mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium">
                    You are sharing your screen
                  </h3>
                </div>
              </div>
            ) : (
              <>
                {participantLeft ? (
                  <div className="text-center">
                    <UserX className="h-16 w-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium">
                      {callDetails.student} has left the call
                    </h3>
                  </div>
                ) : (
                  <div className="text-center">
                    <VideoOff className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-medium">
                      {callDetails.student || "Student"}
                    </h3>
                  </div>
                )}
              </>
            )}

            <div className="absolute top-4 left-4 flex items-center">
              <div className="px-2 py-1 rounded-md bg-black/50 text-white text-sm backdrop-blur-sm">
                {callDetails.student}
              </div>
            </div>
          </div>

          {/* Self view */}
          <div className="col-span-1 bg-gray-900 rounded-lg overflow-hidden relative">
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                isVideoEnabled ? "hidden" : "block"
              } bg-gray-800`}
            >
              <VideoOff className="h-8 w-8 text-gray-500" />
            </div>
            <div
              className={`w-full h-full flex items-center justify-center ${
                isVideoEnabled ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[#FF6F1B]/20 flex items-center justify-center mx-auto mb-2">
                  <span className="text-[#FF6F1B] text-xl font-bold">S</span>
                </div>
                <p className="text-white text-sm">SCAD Officer</p>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              {isMuted && (
                <div className="p-1 rounded-full bg-red-500/80">
                  <MicOff className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/50 text-white text-xs backdrop-blur-sm">
              You
            </div>
          </div>
        </div>

        {/* Call controls */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-center space-x-4">
          <Button
            onClick={toggleMicrophone}
            className={`rounded-full w-12 h-12 flex items-center justify-center ${
              isMuted
                ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            {isMuted ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <Button
            onClick={toggleVideo}
            className={`rounded-full w-12 h-12 flex items-center justify-center ${
              isVideoEnabled
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
            }`}
          >
            {isVideoEnabled ? (
              <Video className="h-5 w-5" />
            ) : (
              <VideoOff className="h-5 w-5" />
            )}
          </Button>

          <Button
            onClick={toggleScreenShare}
            className={`rounded-full w-12 h-12 flex items-center justify-center ${
              isScreenSharing
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20"
                : "bg-gray-800 hover:bg-gray-700 text-white"
            }`}
          >
            {isScreenSharing ? (
              <MonitorOff className="h-5 w-5" />
            ) : (
              <Share2 className="h-5 w-5" />
            )}
          </Button>

          <Button
            onClick={endCall}
            className="rounded-full w-12 h-12 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white"
          >
            <Phone className="h-5 w-5 transform rotate-135" />
          </Button>
        </div>

        {/* Call details sidebar */}
        <div className="fixed right-0 top-0 h-full w-80 bg-black border-l border-gray-800 p-4 flex flex-col">
          <div className="pb-4 border-b border-gray-800">
            <h2 className="text-lg font-medium text-white mb-2">
              Call Details
            </h2>
            <p className="text-sm text-gray-400">
              {callDetails.reason} Meeting
            </p>
          </div>

          <div className="py-4 border-b border-gray-800">
            <h3 className="text-sm font-medium text-white mb-2">Student</h3>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-[#FF6F1B]/20 flex items-center justify-center mr-2">
                <span className="text-[#FF6F1B] text-xs font-bold">
                  {callDetails.student.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm text-white">{callDetails.student}</p>
                <div className="flex items-center text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      !participantLeft ? "bg-green-500" : "bg-gray-500"
                    } mr-1`}
                  ></span>
                  <span
                    className={`${
                      !participantLeft ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {!participantLeft ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4">
            <h3 className="text-sm font-medium text-white mb-2">
              Meeting Details
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Date & Time</p>
                <p className="text-white">
                  {new Date(callDetails.date).toLocaleDateString()} at{" "}
                  {callDetails.time}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Duration</p>
                <p className="text-white">
                  {callDetails.duration || "30"} minutes
                </p>
              </div>
              <div>
                <p className="text-gray-400">Topic</p>
                <p className="text-white">{callDetails.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
