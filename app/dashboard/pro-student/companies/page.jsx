"use client";

import { useState } from "react";
import {
  Building,
  MapPin,
  Star,
  StarHalf,
  Globe,
  Users,
  Briefcase,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterParams, setFilterParams] = useState({
    industry: "all",
    rating: "all",
    location: "all",
  });

  // Sample data for user's company history (moved evaluation-related states to internships page)
  const [userCompanyHistory, setUserCompanyHistory] = useState([
    { id: 1, companyId: 1, position: "Frontend Developer Intern" },
    { id: 2, companyId: 3, position: "Marketing Assistant" },
  ]);

  // Sample data for recommended companies
  const companies = [
    {
      id: 1,
      name: "Tech Solutions Egypt",
      logo: "/tech-solutions-logo.png",
      industry: "Software Development",
      location: "Cairo, Egypt",
      website: "https://techsolutions.example.com",
      description:
        "Tech Solutions is a leading software development company specializing in web and mobile applications. They offer a collaborative work environment with opportunities to work on cutting-edge technologies.",
      rating: 4.8,
      totalReviews: 45,
      recommendationPercent: 95,
      openPositions: [
        "Frontend Developer Intern",
        "Backend Developer Intern",
        "UI/UX Design Intern",
      ],
      match: 98,
      reviews: [
        {
          id: 1,
          studentName: "Ahmed M.",
          rating: 5,
          comment:
            "Great company to intern with! I learned a lot about modern web development practices and got to work on real projects. The mentors were very supportive.",
          date: "2024-12-10",
          recommended: true,
        },
        {
          id: 2,
          studentName: "Sara K.",
          rating: 4.5,
          comment:
            "Excellent work culture and learning opportunities. The projects were challenging but manageable with the support provided.",
          date: "2024-11-05",
          recommended: true,
        },
      ],
    },
    {
      id: 2,
      name: "Global Analytics Egypt",
      logo: "/global-analytics-logo.png",
      industry: "Data Science",
      location: "Smart Village, Cairo, Egypt",
      website: "https://globalanalytics.example.com",
      description:
        "Global Analytics specializes in data analysis and business intelligence. Interns work with experienced data scientists on real-world data challenges and gain hands-on experience with advanced analytics tools.",
      rating: 4.3,
      totalReviews: 28,
      recommendationPercent: 90,
      openPositions: ["Data Analyst Intern", "Business Intelligence Intern"],
      match: 92,
      reviews: [
        {
          id: 1,
          studentName: "Fatima H.",
          rating: 4,
          comment:
            "I gained valuable experience working with big data and analytics tools. The team was very knowledgeable and always willing to help.",
          date: "2024-10-15",
          recommended: true,
        },
      ],
    },
    {
      id: 3,
      name: "Creative Hub Egypt",
      logo: "/creative-hub-logo.png",
      industry: "Marketing",
      location: "New Cairo, Egypt",
      website: "https://creativehub.example.com",
      description:
        "Creative Hub is a digital marketing agency offering services in social media management, content creation, and brand strategy. Interns are exposed to various aspects of digital marketing and work closely with the creative team.",
      rating: "4.5",
      totalReviews: 32,
      recommendationPercent: 92,
      openPositions: ["Marketing Assistant", "Social Media Coordinator Intern"],
      match: 85,
      reviews: [
        {
          id: 1,
          studentName: "Omar A.",
          rating: 5,
          comment:
            "Amazing experience! I was given real responsibilities and learned a lot about social media strategy and content creation.",
          date: "2024-11-20",
          recommended: true,
        },
        {
          id: 2,
          studentName: "Layla M.",
          rating: 4,
          comment:
            "Great place to learn about digital marketing. Sometimes the workload can be heavy, but the team is supportive.",
          date: "2024-09-28",
          recommended: true,
        },
      ],
    },
    {
      id: 4,
      name: "Future Systems Egypt",
      logo: "/future-systems-logo.png",
      industry: "Software Development",
      location: "Maadi, Cairo, Egypt",
      website: "https://futuresystems.example.com",
      description:
        "Future Systems develops enterprise software solutions for various industries. Their internship program focuses on providing hands-on experience in software development lifecycle and team collaboration.",
      rating: 3.8,
      totalReviews: 15,
      recommendationPercent: 75,
      openPositions: ["Software Engineering Intern", "QA Testing Intern"],
      match: 79,
      reviews: [
        {
          id: 1,
          studentName: "Khalid J.",
          rating: 3.5,
          comment:
            "Decent learning opportunity but could use more structure in the internship program. The team was friendly though.",
          date: "2024-08-15",
          recommended: false,
        },
      ],
    },
    {
      id: 5,
      name: "Financial Partners Egypt",
      logo: "/financial-partners-logo.png",
      industry: "Finance",
      location: "Alexandria, Egypt",
      website: "https://financialpartners.example.com",
      description:
        "Financial Partners is a consulting firm providing financial advisory services. Interns work on research projects and gain insights into financial analysis and reporting.",
      rating: 4.2,
      totalReviews: 22,
      recommendationPercent: 85,
      openPositions: ["Financial Analyst Intern", "Research Assistant"],
      match: 72,
      reviews: [
        {
          id: 1,
          studentName: "Noor R.",
          rating: 4,
          comment:
            "Good exposure to financial analysis and research. The mentors were knowledgeable and took time to explain concepts.",
          date: "2024-10-05",
          recommended: true,
        },
      ],
    },
  ];

  // Check if user has interned at the selected company
  const hasInternedAtCompany = (companyId) => {
    return userCompanyHistory.some(
      (history) => history.companyId === companyId
    );
  };

  // Filter the companies based on search term and filter parameters
  const filteredCompanies = companies.filter((company) => {
    // Search term filter
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Industry filter
    const matchesIndustry =
      filterParams.industry === "all" ||
      company.industry === filterParams.industry;

    // Rating filter
    const matchesRating =
      filterParams.rating === "all" ||
      (filterParams.rating === "4+" && company.rating >= 4) ||
      (filterParams.rating === "3-4" &&
        company.rating >= 3 &&
        company.rating < 4) ||
      (filterParams.rating === "<3" && company.rating < 3);

    // Location filter
    const matchesLocation =
      filterParams.location === "all" ||
      company.location.startsWith(filterParams.location);

    return matchesSearch && matchesIndustry && matchesRating && matchesLocation;
  });

  // Sort companies by match percentage (highest first)
  const sortedCompanies = [...filteredCompanies].sort(
    (a, b) => b.match - a.match
  );

  // Get unique industries for filter dropdown
  const industries = [...new Set(companies.map((company) => company.industry))];

  // Get unique locations for filter dropdown
  const locations = [
    ...new Set(companies.map((company) => company.location.split(", ")[0])),
  ];

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 text-yellow-400" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-600" />);
    }

    return stars;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Suggested Companies</h1>
          <p className="text-gray-400">
            Companies matching your profile and interests
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black border-gray-800 shadow-s">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search companies by name"
                className="pl-10 bg-black border-gray-700 text-white rounded-lg focus:border-[#FF6F1B] focus:ring-[#FF6F1B]/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="w-full md:w-auto">
              <Select
                value={filterParams.industry}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    industry: value,
                  })
                }
              >
                <SelectTrigger className="w-full md:w-[180px] bg-black border-gray-700 text-white">
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

            <div className="w-full md:w-auto">
              <Select
                value={filterParams.location}
                onValueChange={(value) =>
                  setFilterParams({
                    ...filterParams,
                    location: value,
                  })
                }
              >
                <SelectTrigger className="w-full md:w-[180px] bg-black border-gray-700 text-white">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent className="bg-black border-gray-700 text-white">
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div
        className={`grid grid-cols-1 ${
          selectedCompany ? "md:grid-cols-12" : ""
        } gap-6`}
      >
        {/* Companies List */}
        <div
          className={selectedCompany ? "md:col-span-5 lg:col-span-4" : "w-full"}
        >
          <Card className="bg-black border-gray-800 shadow-s">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">
                  {sortedCompanies.length} Companies
                </h3>
              </div>
              <div className="divide-y divide-gray-800 max-h-[700px] overflow-y-auto">
                {sortedCompanies.length > 0 ? (
                  sortedCompanies.map((company) => (
                    <div
                      key={company.id}
                      className={`p-4 hover:bg-gray-800/20 cursor-pointer ${
                        selectedCompany && selectedCompany.id === company.id
                          ? "bg-gray-800/40 border-l-4 border-[#FF6F1B]"
                          : ""
                      }`}
                      onClick={() => handleSelectCompany(company)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">
                            {company.name}
                          </h4>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Building className="h-3 w-3 mr-1" />
                            <span>{company.industry}</span>
                          </div>
                        </div>
                        <Badge className="bg-[#FF6F1B]/20 text-[#FF6F1B]">
                          {company.match}% Match
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <div className="flex mr-3">
                          {renderStars(company.rating)}
                        </div>
                        <span>({company.totalReviews} reviews)</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Search className="mx-auto h-10 w-10 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white">
                      No companies found
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Details */}
        {selectedCompany && (
          <div className="md:col-span-7 lg:col-span-8">
            <Card className="bg-black border-gray-800 shadow-s">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedCompany.name}
                    </h2>
                    <div className="flex items-center text-gray-400 mt-1">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{selectedCompany.industry}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedCompany.location}</span>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20 text-[#FF6F1B]">
                    {selectedCompany.match}% Match
                  </Badge>
                </div>

                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-900/30 p-4 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Rating</span>
                    <div className="flex items-center">
                      <div className="flex">
                        {renderStars(selectedCompany.rating)}
                      </div>
                      <span className="ml-2 text-white font-medium">
                        {selectedCompany.rating} ({selectedCompany.totalReviews}
                        )
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">
                      Recommended By
                    </span>
                    <span className="text-white font-medium flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2 text-[#FF6F1B]" />
                      {selectedCompany.recommendationPercent}% of interns
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Website</span>
                    <a
                      href={selectedCompany.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF6F1B] font-medium flex items-center hover:underline"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    About the Company
                  </h3>
                  <p className="text-gray-300">{selectedCompany.description}</p>
                </div>

                {/* Open Positions */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Open Positions ({selectedCompany.openPositions.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCompany.openPositions.map((position, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-900/30 p-3 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-[#FF6F1B]" />
                          <span className="text-white">{position}</span>
                        </div>
                        <Button
                          variant="ghost"
                          className="h-8 text-white hover:bg-[#FF6F1B]/25 hover:text-white hover:cursor-pointer"
                        >
                          View
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Reviews & Evaluations */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-white">
                      Student Reviews
                    </h3>
                  </div>

                  {/* Other reviews */}
                  {selectedCompany.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {selectedCompany.reviews
                        .filter((review) => !review.isUserReview)
                        .map((review) => (
                          <div
                            key={review.id}
                            className="border border-gray-800 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-white">
                                {review.studentName}
                              </h4>
                              <Badge
                                className={
                                  review.recommended
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                }
                              >
                                {review.recommended ? (
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                ) : (
                                  <ThumbsDown className="h-3 w-3 mr-1" />
                                )}
                                {review.recommended
                                  ? "Recommended"
                                  : "Not Recommended"}
                              </Badge>
                            </div>
                            <div className="flex mb-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-300">{review.comment}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              Posted on:{" "}
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center bg-gray-900/30 p-6 rounded-lg">
                      <Users className="h-10 w-10 mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-300">
                        No reviews available for this company yet. Reviews can
                        be added after completing an internship.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
