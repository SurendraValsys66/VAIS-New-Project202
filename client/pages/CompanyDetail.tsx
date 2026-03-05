import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Building,
  Users,
  Briefcase,
  DollarSign,
  Globe,
  Share2,
  Download,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface Prospect {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  profileImageUrl?: string;
  city?: string;
  country?: string;
  jobLevel?: string;
  jobFunction?: string;
  industry?: string;
  companySize?: string;
  revenue?: string;
  yearsAtCompany?: number;
  intentSignal?: string;
  engagementScore?: number;
}

type Tab = "overview" | "employees" | "org-chart" | "technologies" | "insights" | "locations" | "news" | "webhooks";

const CompanyDetail: React.FC = () => {
  const { companyId } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  // Mock data - in real app this would come from API
  const prospect: Prospect = {
    id: companyId || "1",
    fullName: "John Doe",
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Chief Executive Officer",
    companyName: "Conway",
    email: "john@conway.com",
    phone: "+1-800-123-4567",
    linkedinUrl: "https://linkedin.com/company/conway",
    profileImageUrl: "",
    city: "Fort Lauderdale",
    country: "United States",
    jobLevel: "Executive",
    jobFunction: "Operations",
    industry: "Healthcare Software",
    companySize: "1,000 - 5,000",
    revenue: "$50-100 Million",
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "employees", label: "Employees" },
    { id: "org-chart", label: "Org Chart" },
    { id: "technologies", label: "Technologies" },
    { id: "insights", label: "Insights" },
    { id: "locations", label: "Locations & Hierarchy" },
    { id: "news", label: "News" },
    { id: "webhooks", label: "Webhooks" },
  ];

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-6 py-3">
            {/* Header with stacked layout */}
            <div className="flex items-start justify-between gap-6">
              {/* Left: Prospect Info */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">KB</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{prospect.fullName}</p>
                  <p className="text-xs text-gray-600">{prospect.jobTitle}</p>
                </div>
              </div>

              {/* Center: Company Info (Stacked) */}
              <div className="flex-1 flex flex-col gap-2 text-xs">
                {/* Company Logo and Links */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                    <div className="grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="w-1 h-1 bg-white rounded-sm"></div>
                      <div className="w-1 h-1 bg-white rounded-sm"></div>
                      <div className="w-1 h-1 bg-white rounded-sm"></div>
                      <div className="w-1 h-1 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{prospect.companyName}</p>
                  <div className="flex gap-1 ml-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Globe className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Building className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Users className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Website */}
                <div>
                  <p className="text-gray-600">Website</p>
                  <a href="https://conway.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium text-xs">
                    www.conway.com
                  </a>
                </div>

                {/* Industry */}
                <div>
                  <p className="text-gray-600">Industry</p>
                  <p className="font-medium text-gray-900">{prospect.industry}</p>
                </div>
              </div>

              {/* Right: Employees and Revenue (Stacked) */}
              <div className="flex flex-col gap-3 text-xs flex-shrink-0">
                <div>
                  <p className="text-gray-600">Employees</p>
                  <p className="font-medium text-gray-900">{prospect.companySize}</p>
                </div>
                <div>
                  <p className="text-gray-600">Revenue</p>
                  <p className="font-medium text-gray-900">{prospect.revenue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 overflow-x-auto border-b">
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition",
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Left Sidebar */}
              <div className="space-y-4">
                {/* Company Details Card */}
                <Card className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Company Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase mb-1">
                        Location
                      </p>
                      <p className="text-gray-900">{prospect.city}, {prospect.country}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase mb-1">
                        Industry
                      </p>
                      <p className="text-gray-900">{prospect.industry}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase mb-1">
                        Employees
                      </p>
                      <p className="text-gray-900">{prospect.companySize}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase mb-1">
                        Revenue
                      </p>
                      <p className="text-gray-900">{prospect.revenue}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase mb-1">
                        HQ Phone
                      </p>
                      <a
                        href={`tel:${prospect.phone}`}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {prospect.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase mb-1">
                        Domain
                      </p>
                      <a
                        href="https://conway.com"
                        className="text-blue-600 hover:text-blue-700 break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        conway.com
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Tags */}
                <Card className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    Add tag
                  </button>
                </Card>

                {/* Similar Companies */}
                <Card className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Similar Companies</h3>
                  <div className="space-y-3">
                    {["Pentavis", "Cognowhere", "Citadesh"].map((company, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                      >
                        <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0"></div>
                        {company}
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 text-sm font-medium mt-3 hover:text-blue-700">
                    Show more Companies
                  </button>
                </Card>
              </div>

              {/* Center Content */}
              <div className="col-span-2">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Company Description */}
                    <Card className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Description</h3>
                      <p className="text-sm text-gray-700 mb-3">
                        {prospect.companyName} Health Solutions, founded in 2001 and headquartered in
                        Fort Lauderdale, Florida, develops and provides web-based healthcare
                        technology solutions for processing, telephonic inbound enrollment, outbound campaigns,
                        workflows, and digital communications, health plans, and providers.
                      </p>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                        Show More <ChevronDown className="w-3 h-3" />
                      </button>
                    </Card>

                    {/* Intelligence Feed */}
                    <Card className="p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">Intelligence Feed</h3>
                      <div className="space-y-4">
                        <div className="border-l-2 border-gray-200 pl-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Conway Health Solutions builds relationships with healthcare advisors
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                InvestorConnection report demonstrates expanding healthcare technology offerings...
                              </p>
                            </div>
                            <p className="text-xs text-gray-600">Feb 5, 2024</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {activeTab !== "overview" && (
                  <Card className="p-6">
                    <p className="text-gray-600">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} section content coming soon
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDetail;
