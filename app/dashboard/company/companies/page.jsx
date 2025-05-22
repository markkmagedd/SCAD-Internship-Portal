"use client";

import { useState } from "react";
import {
  Search,
  Building,
  Briefcase,
  MapPin,
  Globe,
  Mail,
  Phone,
  Eye,
  Calendar,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
      industry: "Technology",
      location: "Cairo, Egypt",
      logo: "/company-logos/abc.png",
      website: "https://www.abccorp.com",
      email: "careers@abccorp.com",
      phone: "+20 1234 567 890",
      description:
        "ABC Corporation is a leading technology company specializing in software solutions for businesses of all sizes. We create innovative products to help our clients achieve their goals.",
      openPositions: 3,
      interns: 5,
      positions: [
        {
          id: 101,
          title: "Frontend Developer Intern",
          duration: "3 months",
          isPaid: true,
          compensation: "$800/month",
          startDate: "2025-03-15",
          requirements: "HTML, CSS, JavaScript, React",
        },
        {
          id: 102,
          title: "Backend Developer Intern",
          duration: "6 months",
          isPaid: true,
          compensation: "$1000/month",
          startDate: "2025-04-01",
          requirements: "Node.js, Express, MongoDB",
        },
        {
          id: 103,
          title: "UI/UX Design Intern",
          duration: "3 months",
          isPaid: true,
          compensation: "$750/month",
          startDate: "2025-03-15",
          requirements: "Figma, Adobe XD, Design Principles",
        },
      ],
    },
    {
      id: 2,
      name: "Delta Engineering",
      industry: "Engineering",
      location: "Mansoura, Egypt",
      logo: "/company-logos/delta.png",
      website: "https://www.deltaeng.com",
      email: "careers@deltaeng.com",
      phone: "+20 4455 667 788",
      description:
        "Delta Engineering is an innovative engineering firm providing solutions in civil, mechanical, and electrical engineering. We work on major infrastructure projects in Egypt and the Middle East.",
      openPositions: 2,
      interns: 3,
      positions: [
        {
          id: 201,
          title: "Civil Engineering Intern",
          duration: "4 months",
          isPaid: true,
          compensation: "$850/month",
          startDate: "2025-03-01",
          requirements: "AutoCAD, Structural Analysis",
        },
        {
          id: 202,
          title: "Mechanical Engineering Intern",
          duration: "6 months",
          isPaid: true,
          compensation: "$900/month",
          startDate: "2025-04-15",
          requirements: "SolidWorks, Thermodynamics Knowledge",
        },
      ],
    },
    {
      id: 3,
      name: "Global Finance Group",
      industry: "Finance",
      location: "Cairo, Egypt",
      logo: "/company-logos/gfg.png",
      website: "https://www.gfg.org",
      email: "hr@gfg.org",
      phone: "+20 1122 334 455",
      description:
        "Global Finance Group is a financial services firm providing banking, investment, and advisory services to clients across the Middle East and North Africa.",
      openPositions: 2,
      interns: 0,
      positions: [
        {
          id: 301,
          title: "Financial Analyst Intern",
          duration: "3 months",
          isPaid: true,
          compensation: "$950/month",
          startDate: "2025-03-15",
          requirements: "Excel, Financial Modeling, Business Knowledge",
        },
        {
          id: 302,
          title: "Investment Banking Intern",
          duration: "6 months",
          isPaid: true,
          compensation: "$1200/month",
          startDate: "2025-04-01",
          requirements: "Finance Degree, Analytical Skills, Excel",
        },
      ],
    },
    {
      id: 4,
      name: "Creative Media Solutions",
      industry: "Marketing",
      location: "Alexandria, Egypt",
      logo: "/company-logos/cms.png",
      website: "https://www.creativemediasolutions.com",
      email: "jobs@cms.net",
      phone: "+20 9876 543 210",
      description:
        "Creative Media Solutions is a full-service marketing and advertising agency helping brands connect with their audiences through innovative campaigns and strategies.",
      openPositions: 4,
      interns: 2,
      positions: [
        {
          id: 401,
          title: "Graphic Design Intern",
          duration: "3 months",
          isPaid: true,
          compensation: "$700/month",
          startDate: "2025-03-01",
          requirements: "Adobe Creative Suite, Design Portfolio",
        },
        {
          id: 402,
          title: "Social Media Marketing Intern",
          duration: "4 months",
          isPaid: true,
          compensation: "$750/month",
          startDate: "2025-03-15",
          requirements: "Experience with social platforms, content creation",
        },
        {
          id: 403,
          title: "Digital Marketing Intern",
          duration: "6 months",
          isPaid: true,
          compensation: "$800/month",
          startDate: "2025-04-01",
          requirements: "Google Analytics, SEO knowledge, Content Writing",
        },
        {
          id: 404,
          title: "Video Production Intern",
          duration: "3 months",
          isPaid: true,
          compensation: "$750/month",
          startDate: "2025-03-15",
          requirements: "Video editing skills, After Effects, Premiere Pro",
        },
      ],
    },
    {
      id: 5,
      name: "HealthTech Innovations",
      industry: "Healthcare",
      location: "Giza, Egypt",
      logo: "/company-logos/healthtech.png",
      website: "https://www.healthtechinnovations.org",
      email: "careers@healthtech.org",
      phone: "+20 5555 123 456",
      description:
        "HealthTech Innovations develops software and technology solutions for healthcare providers, improving patient care and healthcare delivery in Egypt and beyond.",
      openPositions: 1,
      interns: 0,
      positions: [
        {
          id: 501,
          title: "Healthcare Software Developer Intern",
          duration: "6 months",
          isPaid: true,
          compensation: "$950/month",
          startDate: "2025-04-01",
          requirements: "Java, Python, Healthcare Knowledge",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterParams, setFilterParams] = useState({
    industry: "all",
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

    // Search by name or location
    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Get unique industries for the filter
  const industries = [...new Set(companies.map((company) => company.industry))];

  return (
    <div className="space-y-6">
      <div className="bg-black rounded-lg border border-gray-800 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl font-bold text-white">Verified Companies</h2>

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
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Companies grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {handleCompanySearch().map((company) => (
          <Card
            key={company.id}
            className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:translate-y-[-4px]"
            onClick={() => setSelectedCompany(company)}
          >
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70 flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">
                      {company.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {company.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{company.industry}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-400 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{company.location}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {company.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-800/30 p-2 rounded-md text-center">
                    <p className="text-gray-400 text-xs">Open Positions</p>
                    <p className="text-white font-bold">
                      {company.openPositions}
                    </p>
                  </div>
                  <div className="bg-gray-800/30 p-2 rounded-md text-center">
                    <p className="text-gray-400 text-xs">Current Interns</p>
                    <p className="text-white font-bold">{company.interns}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 p-4 flex justify-between">
                <a
                  href={`mailto:${company.email}`}
                  className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#242424] to-[#3A3A3A] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-gray-700 shadow-lg border-[1px] group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#FF6F1B]/25 group-hover:translate-x-0 ease">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    <Mail className="h-4 w-4 mr-2" /> Contact
                  </span>
                  <span className="relative invisible">Contact</span>
                </a>

                <a
                  href="#"
                  className="relative inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompany(company);
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                    <Eye className="h-4 w-4" />
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                    <Briefcase className="h-4 w-4 mr-2" /> View Positions
                  </span>
                  <span className="relative invisible">View Positions</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {handleCompanySearch().length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <Building className="h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            No companies found
          </h3>
          <p className="text-gray-400 text-center mb-6">
            {searchTerm
              ? "No results match your search criteria."
              : "There are no companies available yet."}
          </p>
        </div>
      )}

      {/* Company detail modal - conditional rendering */}
      {selectedCompany && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setSelectedCompany(null)}
          ></div>
          <div className="bg-black rounded-xl border border-gray-800 p-6 w-full max-w-4xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-md bg-gradient-to-br from-[#EC1024]/70 to-[#FF6F1B]/70 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-2xl">
                    {selectedCompany.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCompany.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedCompany.industry} • {selectedCompany.location}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-white bg-black border border-gray-800 hover:bg-[#FF6F1B]/25 hover:cursor-pointer rounded-full"
                onClick={() => setSelectedCompany(null)}
              >
                ✕
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-white font-medium mb-2">About Company</h3>
                <p className="text-gray-400 text-sm">
                  {selectedCompany.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Globe className="h-4 w-4 mr-3" />
                  <a
                    href={selectedCompany.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF6F1B] hover:underline flex items-center"
                  >
                    {selectedCompany.website}{" "}
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </a>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-3" />
                  <a
                    href={`mailto:${selectedCompany.email}`}
                    className="hover:text-[#FF6F1B]"
                  >
                    {selectedCompany.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>{selectedCompany.phone}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>{selectedCompany.location}</span>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              Open Internship Positions
            </h3>

            <div className="space-y-4">
              {selectedCompany.positions.map((position) => (
                <div
                  key={position.id}
                  className="bg-black border border-gray-800 rounded-lg p-5 hover:shadow-[#FF6F1B] hover:border-[#FF6F1B]/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-semibold text-white">
                      {position.title}
                    </h4>
                    <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                      {position.duration}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Compensation</p>
                      <p className="text-white">
                        {position.isPaid ? position.compensation : "Unpaid"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-[#FF6F1B]" />
                        <p className="text-white">{position.startDate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Requirements</p>
                      <p className="text-white text-sm">
                        {position.requirements}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="relative inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] hover:cursor-pointer text-white rounded-md overflow-hidden font-medium transition duration-300 ease-out border-black shadow-lg border-2 group"
                    >
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange group-hover:translate-x-0 ease">
                        <Users className="h-4 w-4" />
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                        Apply Now
                      </span>
                      <span className="relative invisible">Apply Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
