"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  DownloadCloud,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Briefcase,
  Mail,
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

export default function CompaniesPage() {
  // Mock data - In a real app, this would come from a database
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "ABC Corporation",
      status: "verified",
      location: "Cairo, Egypt",
      industry: "Technology",
      contactEmail: "hr@abccorp.com",
      phone: "+20 1234 567 890",
      website: "https://www.abccorp.com",
      submissionDate: "2025-01-05",
      activePosts: 3,
      totalInterns: 5,
    },
    {
      id: 2,
      name: "XYZ Solutions",
      status: "pending",
      location: "Alexandria, Egypt",
      industry: "Marketing",
      contactEmail: "careers@xyz.net",
      phone: "+20 9876 543 210",
      website: "https://www.xyz.net",
      submissionDate: "2025-01-10",
      activePosts: 0,
      totalInterns: 0,
    },
    {
      id: 3,
      name: "Tech Innovators Ltd",
      status: "rejected",
      location: "Giza, Egypt",
      industry: "Software",
      contactEmail: "jobs@techinnovators.com",
      phone: "+20 5555 123 456",
      website: "https://www.techinnovators.com",
      submissionDate: "2025-01-02",
      activePosts: 0,
      totalInterns: 0,
    },
    {
      id: 4,
      name: "Global Finance Group",
      status: "reconsideration",
      location: "Cairo, Egypt",
      industry: "Finance",
      contactEmail: "hr@gfg.org",
      phone: "+20 1122 334 455",
      website: "https://www.gfg.org",
      submissionDate: "2025-01-08",
      activePosts: 0,
      totalInterns: 0,
    },
    {
      id: 5,
      name: "Delta Engineering",
      status: "verified",
      location: "Mansoura, Egypt",
      industry: "Engineering",
      contactEmail: "careers@deltaeng.com",
      phone: "+20 4455 667 788",
      website: "https://www.deltaeng.com",
      submissionDate: "2024-12-20",
      activePosts: 2,
      totalInterns: 3,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterParams, setFilterParams] = useState({
    industry: "all",
    status: "all",
  });

  // Helper Functions
  const handleCompanySearch = () => {
    let filtered = [...companies];

    // Filter by industry
    if (filterParams.industry !== "all") {
      filtered = filtered.filter(
        (company) => company.industry === filterParams.industry
      );
    }

    // Filter by status
    if (filterParams.status !== "all") {
      filtered = filtered.filter(
        (company) => company.status === filterParams.status
      );
    }

    // Filter by activeTab (custom views)
    if (activeTab === "pending") {
      filtered = filtered.filter(
        (company) =>
          company.status === "pending" || company.status === "reconsideration"
      );
    }

    // Search by name or location
    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      case "reconsideration":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 mr-2" />;
      case "pending":
        return <Clock className="h-4 w-4 mr-2" />;
      case "rejected":
        return <XCircle className="h-4 w-4 mr-2" />;
      case "reconsideration":
        return <AlertTriangle className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending Approval";
      case "rejected":
        return "Rejected";
      case "reconsideration":
        return "Under Reconsideration";
      default:
        return "Unknown";
    }
  };

  const updateCompanyStatus = (companyId, newStatus) => {
    // Update company status
    const updatedCompanies = companies.map((company) =>
      company.id === companyId ? { ...company, status: newStatus } : company
    );
    setCompanies(updatedCompanies);

    if (selectedCompany && selectedCompany.id === companyId) {
      setSelectedCompany({ ...selectedCompany, status: newStatus });
    }
  };

  // Get unique industries for the filter
  const industries = [
    "All",
    ...new Set(companies.map((company) => company.industry)),
  ];

  return (
    <div className="space-y-6">
      {/* Tabs and filters */}
      <div className="bg-black rounded-lg border border-gray-800 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-black border border-gray-800 text-gray-400">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
              >
                All Companies
              </TabsTrigger>
              <TabsTrigger
                value="verified"
                className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
              >
                Verified
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
              >
                Pending
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={filterParams.industry}
              onValueChange={(value) =>
                setFilterParams({
                  ...filterParams,
                  industry: value,
                })
              }
            >
              <SelectTrigger className="w-[180px] bg-black border-gray-700 text-white">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700 text-white">
                <SelectItem value="all">All Industries</SelectItem>
                {industries
                  .filter((i) => i !== "All")
                  .map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Companies list and detail view */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* List of companies */}
        <Card
          className={`bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] ${
            selectedCompany ? "w-full md:w-1/3" : "w-full"
          }`}
        >
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-white">
                {activeTab === "verified"
                  ? "Verified Companies"
                  : activeTab === "pending"
                  ? "Pending Approvals"
                  : "All Companies"}
              </h3>
              <p className="text-sm text-gray-400">
                {handleCompanySearch().length} companies found
              </p>
            </div>

            <div className="divide-y divide-gray-800 max-h-[700px] overflow-y-auto">
              {handleCompanySearch().length > 0 ? (
                handleCompanySearch().map((company) => (
                  <div
                    key={company.id}
                    className={`p-4 cursor-pointer hover:bg-gray-800/50 ${
                      selectedCompany?.id === company.id
                        ? "bg-gray-800/80 border-l-4 border-l-[#FF6F1B]"
                        : ""
                    }`}
                    onClick={() => setSelectedCompany(company)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{company.name}</h4>
                      <Badge className={getStatusColor(company.status)}>
                        {getStatusLabel(company.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">
                      {company.industry}
                    </p>
                    <p className="text-gray-500 text-xs">{company.location}</p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                  <h4 className="text-lg font-medium text-white mb-1">
                    No companies found
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Company details */}
        {selectedCompany && (
          <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] w-full md:w-2/3">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedCompany.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedCompany.industry} • {selectedCompany.location}
                  </p>
                </div>
                <Badge className={getStatusColor(selectedCompany.status)}>
                  {getStatusLabel(selectedCompany.status)}
                </Badge>
              </div>

              {/* Company Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black border border-gray-800 p-4 rounded-lg mb-6">
                <div>
                  <p className="text-sm text-gray-500">Contact Email</p>
                  <p className="text-white">{selectedCompany.contactEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-white">{selectedCompany.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="text-white">{selectedCompany.website}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="text-white">{selectedCompany.submissionDate}</p>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-black border-gray-800">
                  <CardContent className="p-4">
                    <h4 className="text-gray-400 text-sm mb-1">
                      Active Internship Posts
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {selectedCompany.activePosts}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black border-gray-800">
                  <CardContent className="p-4">
                    <h4 className="text-gray-400 text-sm mb-1">
                      Total Interns
                    </h4>
                    <p className="text-2xl font-bold text-white">
                      {selectedCompany.totalInterns}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Documents and Actions */}
              <div className="space-y-4">
                <h3 className="font-medium text-white">Company Documents</h3>
                <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
                  <div className="flex items-center">
                    <DownloadCloud className="text-[#FF6F1B] mr-3 h-5 w-5" />
                    <span className="text-white">
                      Business Documents Package
                    </span>
                  </div>
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Eye className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Eye className="h-4 w-4 mr-2" /> View Documents
                    </span>
                    <span className="relative invisible">View Documents</span>
                  </a>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800">
                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Briefcase className="h-4 w-4 mr-2" /> View Internships
                    </span>
                    <span className="relative invisible">View Internships</span>
                  </a>

                  <a
                    href="#"
                    className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                      <Mail className="h-4 w-4 mr-2" /> Contact
                    </span>
                    <span className="relative invisible">Contact</span>
                  </a>
                </div>

                {/* Status Actions */}
                {selectedCompany.status === "pending" && (
                  <div className="flex justify-end gap-3 pt-4">
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCompanyStatus(selectedCompany.id, "rejected");
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                        <XCircle className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Reject
                      </span>
                      <span className="relative invisible">Reject</span>
                    </a>

                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCompanyStatus(selectedCompany.id, "verified");
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Approve
                      </span>
                      <span className="relative invisible">Approve</span>
                    </a>
                  </div>
                )}

                {selectedCompany.status === "reconsideration" && (
                  <div className="flex justify-end gap-3 pt-4">
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCompanyStatus(selectedCompany.id, "rejected");
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                        <XCircle className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Reject
                      </span>
                      <span className="relative invisible">Reject</span>
                    </a>

                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCompanyStatus(selectedCompany.id, "verified");
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Approve
                      </span>
                      <span className="relative invisible">Approve</span>
                    </a>
                  </div>
                )}

                {selectedCompany.status === "rejected" && (
                  <div className="flex justify-end gap-3 pt-4">
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                      onClick={(e) => {
                        e.preventDefault();
                        updateCompanyStatus(
                          selectedCompany.id,
                          "reconsideration"
                        );
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Reconsider Application
                      </span>
                      <span className="relative invisible">
                        Reconsider Application
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
