"use client";

import { useState } from "react";
import {
  BarChart3,
  PieChart,
  FileText,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Building,
  Award,
  Book,
  Star,
  Calendar,
  Download,
  Filter,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState("reports");
  const [cycleFilter, setCycleFilter] = useState("current");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Sample data for reports statistics
  const reportStatistics = {
    totalReports: 156,
    acceptedReports: 98,
    rejectedReports: 34,
    flaggedReports: 24,
    pendingReports: 0, // Calculated below
    averageReviewTime: "2.4 days",
  };

  // Calculate pending reports
  reportStatistics.pendingReports =
    reportStatistics.totalReports -
    (reportStatistics.acceptedReports +
      reportStatistics.rejectedReports +
      reportStatistics.flaggedReports);

  // Sample data for internship cycles
  const internshipCycles = [
    { id: "current", name: "Current Cycle (Feb 2025 - Aug 2025)" },
    { id: "previous", name: "Previous Cycle (Aug 2024 - Jan 2025)" },
    { id: "past2", name: "Past Cycle (Feb 2024 - Jul 2024)" },
  ];

  // Sample data for courses
  const topCourses = [
    { name: "Web Development", count: 45 },
    { name: "Database Systems", count: 38 },
    { name: "UI/UX Design", count: 35 },
    { name: "Software Engineering", count: 32 },
    { name: "Data Analysis", count: 28 },
    { name: "Digital Marketing", count: 24 },
    { name: "Mobile App Development", count: 22 },
    { name: "Project Management", count: 18 },
  ];

  // Sample data for top rated companies
  const topRatedCompanies = [
    { name: "Tech Solutions Inc.", rating: 4.8, count: 32 },
    { name: "Global Innovations", rating: 4.7, count: 28 },
    { name: "Future Systems", rating: 4.6, count: 24 },
    { name: "Digital Media Group", rating: 4.5, count: 18 },
    { name: "Eco Solutions", rating: 4.4, count: 15 },
  ];

  // Sample data for top companies by internship count
  const topInternshipCompanies = [
    { name: "Tech Solutions Inc.", count: 32 },
    { name: "Global Innovations", count: 28 },
    { name: "Future Systems", count: 24 },
    { name: "Digital Media Group", count: 18 },
    { name: "Eco Solutions", count: 15 },
    { name: "Creative Hub", count: 12 },
    { name: "Smart Finance Ltd", count: 10 },
  ];

  // Sample data for monthly report statistics
  const monthlyReportStats = [
    { month: "Jan", accepted: 18, rejected: 5, flagged: 3 },
    { month: "Feb", accepted: 15, rejected: 6, flagged: 4 },
    { month: "Mar", accepted: 22, rejected: 4, flagged: 3 },
    { month: "Apr", accepted: 19, rejected: 7, flagged: 5 },
    { month: "May", accepted: 24, rejected: 6, flagged: 4 },
    { month: "Jun", accepted: 0, rejected: 0, flagged: 0 },
    { month: "Jul", accepted: 0, rejected: 0, flagged: 0 },
    { month: "Aug", accepted: 0, rejected: 0, flagged: 0 },
    { month: "Sep", accepted: 0, rejected: 0, flagged: 0 },
    { month: "Oct", accepted: 0, rejected: 0, flagged: 0 },
    { month: "Nov", accepted: 0, rejected: 0, flagged: 0 },
    { month: "Dec", accepted: 0, rejected: 0, flagged: 0 },
  ];

  // Report review time trend
  const reviewTimeTrend = [
    { month: "Jan", days: 3.2 },
    { month: "Feb", days: 2.8 },
    { month: "Mar", days: 2.6 },
    { month: "Apr", days: 2.4 },
    { month: "May", days: 2.1 },
  ];

  // Placeholder for chart components (in a real app, you'd use a library like recharts, chart.js, etc.)
  const BarChartPlaceholder = ({ data, label, xKey, yKeys, colors }) => (
    <div className="relative pt-5">
      <div className="absolute top-0 left-0 text-sm font-medium text-gray-400">
        {label}
      </div>
      <div className="h-[220px] mt-6 flex items-end gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center items-end h-[180px]">
              {yKeys.map((key, i) => (
                <div
                  key={i}
                  className={`w-[20px] rounded-t-sm mx-[2px] ${colors[i]}`}
                  style={{
                    height: `${
                      (item[key] /
                        Math.max(
                          ...data.map((d) =>
                            Math.max(...yKeys.map((k) => d[k] || 0))
                          )
                        )) *
                      160
                    }px`,
                  }}
                ></div>
              ))}
            </div>
            <span className="text-xs text-gray-400 mt-2">{item[xKey]}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4">
        {yKeys.map((key, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-3 h-3 ${colors[i]} rounded-sm mr-1`}></div>
            <span className="text-xs text-gray-400">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const PieChartPlaceholder = ({ data, label, nameKey, valueKey }) => (
    <div className="relative pt-5">
      <div className="absolute top-0 left-0 text-sm font-medium text-gray-400">
        {label}
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="w-[120px] h-[120px] rounded-full border-8 border-gray-800 relative overflow-hidden">
          {data.map((item, index) => {
            // This is a very simplified pie chart visualization
            // In a real app, you'd use proper math to calculate segments
            const totalValue = data.reduce((sum, i) => sum + i[valueKey], 0);
            const percentage = (item[valueKey] / totalValue) * 100;
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: `hsl(${index * 30}, 80%, 50%)`,
                  clipPath: `polygon(50% 50%, ${
                    50 + 50 * Math.cos((index * Math.PI) / 2)
                  }% ${50 + 50 * Math.sin((index * Math.PI) / 2)}%, ${
                    50 + 50 * Math.cos(((index + 1) * Math.PI) / 2)
                  }% ${50 + 50 * Math.sin(((index + 1) * Math.PI) / 2)}%)`,
                }}
              ></div>
            );
          })}
        </div>
        <div className="flex-1 pl-4">
          <div className="space-y-2">
            {data.slice(0, 5).map((item, index) => {
              const totalValue = data.reduce((sum, i) => sum + i[valueKey], 0);
              const percentage = ((item[valueKey] / totalValue) * 100).toFixed(
                1
              );
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: `hsl(${index * 30}, 80%, 50%)`,
                      }}
                    ></div>
                    <span className="text-sm text-gray-300 truncate max-w-[150px]">
                      {item[nameKey]}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{percentage}%</div>
                </div>
              );
            })}
            {data.length > 5 && (
              <div className="text-sm text-gray-400 italic">
                +{data.length - 5} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const LineChartPlaceholder = ({ data, label, xKey, yKey }) => (
    <div className="relative pt-5">
      <div className="absolute top-0 left-0 text-sm font-medium text-gray-400">
        {label}
      </div>
      <div className="h-[220px] mt-6 relative">
        <div className="absolute inset-0 border-b border-l border-gray-800 flex items-end">
          <svg className="w-full h-full">
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#EC1024" />
                <stop offset="100%" stopColor="#FF6F1B" />
              </linearGradient>
            </defs>
            <polyline
              points={data
                .map(
                  (item, index) =>
                    `${(index / (data.length - 1)) * 100}%, ${
                      100 -
                      (item[yKey] / Math.max(...data.map((d) => d[yKey]))) * 80
                    }%`
                )
                .join(" ")}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              className="transition-all duration-500"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-400">
              {item[xKey]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const HorizontalBarChart = ({
    data,
    label,
    nameKey,
    valueKey,
    maxItems = 7,
  }) => {
    const sortedData = [...data]
      .sort((a, b) => b[valueKey] - a[valueKey])
      .slice(0, maxItems);
    const maxValue = Math.max(...sortedData.map((item) => item[valueKey]));

    return (
      <div className="relative pt-5">
        <div className="absolute top-0 left-0 text-sm font-medium text-gray-400">
          {label}
        </div>
        <div className="mt-6 space-y-4">
          {sortedData.map((item, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-white truncate max-w-[150px]">
                  {item[nameKey]}
                </span>
                <span className="text-sm text-gray-400">
                  {item[valueKey]} {valueKey === "rating" ? "★" : ""}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]"
                  style={{
                    width: `${(item[valueKey] / maxValue) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to handle report generation
  const handleGenerateReport = () => {
    setIsGeneratingReport(true);

    // Simulate report generation with a timeout
    setTimeout(() => {
      setIsGeneratingReport(false);
      // In a real app, this would trigger a download or open a new tab
      alert("Report generated successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Internship Statistics
          </h1>
          <p className="text-gray-400">
            View real-time statistics for internship reports and company
            performance
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-[#EC1024] to-[#FF6F1B] text-white hover:bg-gradient-to-l"
          onClick={handleGenerateReport}
          disabled={isGeneratingReport}
        >
          {isGeneratingReport ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating
              Report...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" /> Generate Report
            </>
          )}
        </Button>
      </div>

      {/* Internship Cycle Filter */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-black border border-gray-800 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">Internship Cycle:</span>
        </div>

        <div className="flex-1">
          <Select value={cycleFilter} onValueChange={setCycleFilter}>
            <SelectTrigger className="w-full md:w-auto bg-black border-gray-700 text-white">
              <SelectValue placeholder="Select cycle" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gray-700 text-white">
              {internshipCycles.map((cycle) => (
                <SelectItem key={cycle.id} value={cycle.id}>
                  {cycle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-xs">Total Reports</p>
                <h2 className="text-2xl font-bold text-white">
                  {reportStatistics.totalReports}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <FileText className="text-[#FF6F1B] h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-xs">Accepted</p>
                <h2 className="text-2xl font-bold text-green-400">
                  {reportStatistics.acceptedReports}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-green-500/20">
                <CheckCircle className="text-green-400 h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-xs">Rejected</p>
                <h2 className="text-2xl font-bold text-red-400">
                  {reportStatistics.rejectedReports}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-red-500/20">
                <XCircle className="text-red-400 h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-xs">Flagged</p>
                <h2 className="text-2xl font-bold text-orange-400">
                  {reportStatistics.flaggedReports}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-orange-500/20">
                <AlertTriangle className="text-orange-400 h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] hover:cursor-pointer transition-all hover:scale-[1.02]">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 mb-1 text-xs">Avg Review Time</p>
                <h2 className="text-2xl font-bold text-[#FF6F1B]">
                  {reportStatistics.averageReviewTime}
                </h2>
              </div>
              <div className="p-2 rounded-full bg-gradient-to-r from-[#EC1024]/20 to-[#FF6F1B]/20">
                <Clock className="text-[#FF6F1B] h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content tabs */}
      <div>
        <Tabs
          defaultValue="reports"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full bg-black border border-gray-800 text-gray-400 justify-start">
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
            >
              Report Statistics
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
            >
              Top Courses
            </TabsTrigger>
            <TabsTrigger
              value="companies"
              className="data-[state=active]:bg-[#FF6F1B] text-white cursor-pointer"
            >
              Company Ratings
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Report Statistics */}
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] col-span-2">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <FileCheck className="mr-2 h-5 w-5 text-[#FF6F1B]" />{" "}
                      Monthly Report Status
                    </h3>
                  </div>

                  <BarChartPlaceholder
                    data={monthlyReportStats}
                    label="Number of Reports"
                    xKey="month"
                    yKeys={["accepted", "rejected", "flagged"]}
                    colors={["bg-green-500", "bg-red-500", "bg-orange-500"]}
                  />
                </CardContent>
              </Card>

              {/* Report Status Distribution */}
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <PieChart className="mr-2 h-5 w-5 text-[#FF6F1B]" />{" "}
                      Report Status Distribution
                    </h3>
                  </div>

                  <PieChartPlaceholder
                    data={[
                      {
                        status: "Accepted",
                        count: reportStatistics.acceptedReports,
                      },
                      {
                        status: "Rejected",
                        count: reportStatistics.rejectedReports,
                      },
                      {
                        status: "Flagged",
                        count: reportStatistics.flaggedReports,
                      },
                      {
                        status: "Pending",
                        count: reportStatistics.pendingReports,
                      },
                    ]}
                    label="Reports by Status"
                    nameKey="status"
                    valueKey="count"
                  />
                </CardContent>
              </Card>

              {/* Average Review Time Trend */}
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-[#FF6F1B]" /> Average
                      Review Time
                    </h3>
                  </div>

                  <LineChartPlaceholder
                    data={reviewTimeTrend}
                    label="Days to Review"
                    xKey="month"
                    yKey="days"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Book className="mr-2 h-5 w-5 text-[#FF6F1B]" /> Most
                      Frequently Used Courses in Internships
                    </h3>
                  </div>

                  <HorizontalBarChart
                    data={topCourses}
                    label="Course Mentions in Reports"
                    nameKey="name"
                    valueKey="count"
                  />
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <PieChart className="mr-2 h-5 w-5 text-[#FF6F1B]" />{" "}
                      Course Distribution in Internships
                    </h3>
                  </div>

                  <PieChartPlaceholder
                    data={topCourses}
                    label="Most Relevant Courses"
                    nameKey="name"
                    valueKey="count"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Star className="mr-2 h-5 w-5 text-[#FF6F1B]" /> Top Rated
                      Companies
                    </h3>
                  </div>

                  <HorizontalBarChart
                    data={topRatedCompanies}
                    label="Student Ratings"
                    nameKey="name"
                    valueKey="rating"
                  />
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Building className="mr-2 h-5 w-5 text-[#FF6F1B]" /> Top
                      Companies by Internship Count
                    </h3>
                  </div>

                  <HorizontalBarChart
                    data={topInternshipCompanies}
                    label="Number of Internships"
                    nameKey="name"
                    valueKey="count"
                  />
                </CardContent>
              </Card>

              <Card className="bg-black border-gray-800 shadow-s hover:shadow-[#FF6F1B] col-span-2">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center">
                      <Award className="mr-2 h-5 w-5 text-[#FF6F1B]" /> Company
                      Participation Distribution
                    </h3>
                  </div>

                  <PieChartPlaceholder
                    data={topInternshipCompanies}
                    label="Internships by Company"
                    nameKey="name"
                    valueKey="count"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
