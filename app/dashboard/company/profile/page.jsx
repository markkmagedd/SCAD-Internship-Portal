"use client";

import { useState } from "react";
import {
  Edit,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  FileText,
  Eye,
  Save,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  // Mock data - In a real app, this would come from a database
  const [companyProfile, setCompanyProfile] = useState({
    name: "ABC Corporation",
    industry: "Technology",
    size: "medium",
    email: "hr@abccorp.com",
    phone: "+20 1234 567 890",
    website: "https://www.abccorp.com",
    location: "Cairo, Egypt",
    founded: "2010",
    about:
      "ABC Corporation is a leading technology company specializing in innovative software solutions for businesses. We provide cutting-edge products and services to help our clients achieve their goals.",
    logo: "/placeholder-logo.png",
    verified: true,
  });

  const [companyDocuments, setCompanyDocuments] = useState([
    {
      id: 1,
      name: "Business Registration",
      fileUrl: "/documents/business-reg.pdf",
      uploadDate: "2025-01-05",
      status: "verified",
    },
    {
      id: 2,
      name: "Tax Certificate",
      fileUrl: "/documents/tax-cert.pdf",
      uploadDate: "2025-01-05",
      status: "verified",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(companyProfile);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleSaveProfile = () => {
    setCompanyProfile(editableProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditableProfile(companyProfile);
    setIsEditing(false);
  };

  const handleDeleteDocument = (docId) => {
    setCompanyDocuments(companyDocuments.filter((doc) => doc.id !== docId));
  };

  return (
    <div className="space-y-8">
      {/* Company Information */}
      <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Company Information
            </h3>
            {!isEditing ? (
              <a
                href="#"
                className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                  <Edit className="h-4 w-4" />
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </span>
                <span className="relative invisible">Edit Profile</span>
              </a>
            ) : (
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCancelEdit();
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                    <AlertCircle className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Cancel
                  </span>
                  <span className="relative invisible">Cancel</span>
                </a>

                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveProfile();
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                    <Save className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    <Save className="h-4 w-4 mr-2" /> Save
                  </span>
                  <span className="relative invisible">Save</span>
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="md:w-1/3">
              <div className="aspect-square w-full max-w-[200px] mx-auto md:mx-0 bg-black rounded-xl flex items-center justify-center border border-gray-700 overflow-hidden relative">
                {companyProfile.logo ? (
                  <div className="relative w-full h-full">
                    {/* This would be an actual image in production */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                      {companyProfile.name.charAt(0)}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2" />
                    <span>Upload Logo</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-center md:justify-start">
                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-5 py-2 w-full max-w-[200px] bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    <Upload className="h-4 w-4 mr-2" /> Change Logo
                  </span>
                  <span className="relative invisible">Change Logo</span>
                </a>
              </div>

              <div className="mt-6">
                {companyProfile.verified ? (
                  <div className="flex items-center bg-[#FF6F1B]/10 text-[#FF6F1B] p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Verified Company</span>
                  </div>
                ) : (
                  <div className="flex items-center bg-[#EC1024]/10 text-[#EC1024] p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Verification Pending</span>
                  </div>
                )}
              </div>
            </div>

            {/* Company details */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Company Name
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="name"
                      value={editableProfile.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.name}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Industry
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="industry"
                      value={editableProfile.industry}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.industry}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Company Size
                  </label>
                  {isEditing ? (
                    <Select
                      value={editableProfile.size}
                      onValueChange={(value) =>
                        setEditableProfile({ ...editableProfile, size: value })
                      }
                    >
                      <SelectTrigger className="bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-700 text-white">
                        <SelectItem value="small">
                          Small (50 employees or less)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (51-100 employees)
                        </SelectItem>
                        <SelectItem value="large">
                          Large (101-500 employees)
                        </SelectItem>
                        <SelectItem value="corporate">
                          Corporate (500+ employees)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={
                        companyProfile.size === "small"
                          ? "Small (50 employees or less)"
                          : companyProfile.size === "medium"
                          ? "Medium (51-100 employees)"
                          : companyProfile.size === "large"
                          ? "Large (101-500 employees)"
                          : "Corporate (500+ employees)"
                      }
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Company Email
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="email"
                      type="email"
                      value={editableProfile.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.email}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="phone"
                      value={editableProfile.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.phone}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Website
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="website"
                      value={editableProfile.website}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.website}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="location"
                      value={editableProfile.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.location}
                      readOnly
                    />
                  )}
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Founded
                  </label>
                  {isEditing ? (
                    <Input
                      className="bg-black border-gray-700 text-white focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                      name="founded"
                      value={editableProfile.founded}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Input
                      className="bg-black border-gray-700 text-white"
                      value={companyProfile.founded}
                      readOnly
                    />
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm text-gray-400 block mb-1">
                  Company Description
                </label>
                {isEditing ? (
                  <Textarea
                    className="bg-black border-gray-700 text-white h-32 focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                    name="about"
                    value={editableProfile.about}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Textarea
                    className="bg-black border-gray-700 text-white h-32"
                    value={companyProfile.about}
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Documents */}
      <Card className="bg-black border-gray-800 hover:shadow-[#FF6F1B] shadow-s">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Company Documents</h3>
            <a
              href="#"
              className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
              onClick={(e) => {
                e.preventDefault();
                setShowUploadModal(true);
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                <Upload className="h-4 w-4" />
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                <Upload className="h-4 w-4 mr-2" /> Upload Document
              </span>
              <span className="relative invisible">Upload Document</span>
            </a>
          </div>

          <div className="space-y-4">
            {companyDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between bg-black p-4 rounded-lg border border-gray-700"
              >
                <div className="flex items-center">
                  <FileText className="text-gray-400 mr-3 h-5 w-5" />
                  <div>
                    <p className="text-white">{doc.name}</p>
                    <p className="text-xs text-gray-400">
                      Uploaded on {doc.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {doc.status === "verified" && (
                    <Badge className="bg-green-500/20 text-green-400">
                      Verified
                    </Badge>
                  )}
                  {doc.status === "pending" && (
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      Pending
                    </Badge>
                  )}

                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Download className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Download className="h-4 w-4" />
                    </span>
                    <span className="relative invisible">View</span>
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteDocument(doc.id);
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Trash2 className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Trash2 className="h-4 w-4" />
                    </span>
                    <span className="relative invisible">Delete</span>
                  </a>
                </div>
              </div>
            ))}

            {companyDocuments.length === 0 && (
              <div className="text-center py-10 bg-gray-800/30 rounded-lg">
                <FileText className="h-10 w-10 mx-auto text-gray-600 mb-2" />
                <h4 className="text-white text-lg font-medium mb-1">
                  No Documents Uploaded
                </h4>
                <p className="text-gray-400 text-sm">
                  Upload your business registration and tax documents for
                  verification.
                </p>
                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-6 py-2 mt-4 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUploadModal(true);
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    <Upload className="h-4 w-4 mr-2" /> Upload Document
                  </span>
                  <span className="relative invisible">Upload Document</span>
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Document Modal - conditional rendering */}
      {showUploadModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowUploadModal(false)}
          ></div>
          <div className="bg-black rounded-xl border border-gray-800 p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-bold text-white mb-6">
              Upload Document
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400 block mb-2">
                  Document Type
                </label>
                <Select>
                  <SelectTrigger className="bg-black border-gray-700 text-white">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gray-700 text-white">
                    <SelectItem value="business">
                      Business Registration
                    </SelectItem>
                    <SelectItem value="tax">Tax Certificate</SelectItem>
                    <SelectItem value="other">Other Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400 block mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center bg-gray-800/50">
                  <Upload className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400 mb-2">
                    Drag & drop your file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports PDF, JPG, PNG (Max. 5MB)
                  </p>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 mt-4 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Upload className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      Browse Files
                    </span>
                    <span className="relative invisible">Browse Files</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUploadModal(false);
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                    <AlertCircle className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Cancel
                  </span>
                  <span className="relative invisible">Cancel</span>
                </a>

                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add document upload logic here
                    setCompanyDocuments([
                      ...companyDocuments,
                      {
                        id: companyDocuments.length + 1,
                        name: "New Document",
                        fileUrl: "/documents/new-doc.pdf",
                        uploadDate: new Date().toISOString().split("T")[0],
                        status: "pending",
                      },
                    ]);
                    setShowUploadModal(false);
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                    <Upload className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    Upload Document
                  </span>
                  <span className="relative invisible">Upload Document</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
