import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Download,
  MoreVertical,
  ExternalLink,
  Building,
  Users,
  Briefcase,
  DollarSign,
  Globe,
  ChevronDown,
  Twitter,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

interface QuickViewPanelProps {
  prospect: Prospect;
  onExport?: () => void;
  onTag?: () => void;
  onMoreOptions?: () => void;
  maskEmail?: (email: string) => string;
}

const defaultMaskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return email;
  return localPart.substring(0, 2) + "***@" + domain;
};

interface ContactItemProps {
  value: string | React.ReactNode;
  label?: string;
  isLink?: boolean;
  href?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  value,
  label,
  isLink,
  href,
}) => {
  return (
    <div className="mb-2 last:mb-0">
      {isLink && href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium break-all hover:underline"
        >
          {value} {label && <span className="text-gray-600 font-normal">({label})</span>}
        </a>
      ) : (
        <p className="text-sm text-gray-900">
          {value} {label && <span className="text-gray-600 ml-1">({label})</span>}
        </p>
      )}
    </div>
  );
};

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, icon }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
      <div
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-gray-400">{icon}</div>}
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform",
            isExpanded ? "rotate-180" : ""
          )}
        />
      </div>
      {isExpanded && <div>{children}</div>}
    </div>
  );
};

export const QuickViewPanel: React.FC<QuickViewPanelProps> = ({
  prospect,
  onExport,
  onTag,
  onMoreOptions,
  maskEmail = defaultMaskEmail,
}) => {
  const navigate = useNavigate();

  const handleExternalLink = () => {
    navigate(`/company/${prospect.id}`);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Quick View</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={handleExternalLink}
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Button>
        </div>

        {/* Prospect Header */}
        <div className="px-4 py-3 border-t">
          <div className="flex gap-3 mb-3">
            <Avatar className="h-14 w-14 flex-shrink-0">
              <AvatarImage
                src={prospect.profileImageUrl}
                alt={prospect.fullName}
              />
              <AvatarFallback className="bg-blue-500 text-white text-sm font-semibold">
                {prospect.firstName[0]}
                {prospect.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {prospect.fullName}
                </h3>
                {prospect.linkedinUrl && (
                  <a
                    href={prospect.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition flex-shrink-0"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-xs text-gray-600">
                {prospect.jobTitle}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {prospect.companyName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-6 text-xs"
              onClick={onExport}
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-6 text-xs"
              onClick={onTag}
            >
              Tag
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 flex-shrink-0"
              onClick={onMoreOptions}
            >
              <MoreVertical className="w-3 h-3 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Contact Information Card - Combined */}
        <Card title="Contact Information" icon={<Mail className="w-4 h-4" />}>
          <div className="space-y-4">
            {/* Main Contact Details Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                Main Contact Details
              </h4>
              <div className="space-y-2">
                <ContactItem
                  value={maskEmail(prospect.email)}
                  label="B"
                  isLink={true}
                  href={`mailto:${prospect.email}`}
                />
                {prospect.phone && (
                  <ContactItem
                    value={prospect.phone}
                    label="M"
                  />
                )}
                {/* Social Links with Icons */}
                <div className="flex gap-3 mt-2">
                  {prospect.linkedinUrl && (
                    <a
                      href={prospect.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {/* Twitter Icon (placeholder - no URL yet) */}
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-500 transition cursor-not-allowed"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Contact Details Section */}
            {prospect.phone && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                  Additional Contact Details
                </h4>
                <div className="space-y-2">
                  <ContactItem
                    value={prospect.phone}
                    label="HQ"
                  />
                </div>
              </div>
            )}

            {/* Location Section */}
            {prospect.city && prospect.country && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                  Location
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">
                    Local: {prospect.city}, {prospect.country}
                  </p>
                </div>
              </div>
            )}

            {/* CRM Section */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                CRM
              </h4>
              <div className="text-sm text-gray-600">
                No CRM contact or account owner
              </div>
            </div>
          </div>
        </Card>

        {/* Company Details Card */}
        <Card title="Company Details" icon={<Building className="w-4 h-4" />}>
          <div className="space-y-5">
            {/* Company Name with Logo */}
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                <div className="grid grid-cols-2 gap-1 p-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                {prospect.companyName}
              </a>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-500 font-semibold uppercase">Description</p>
              </div>
              <p className="text-sm text-gray-700 ml-6">
                {prospect.companyName} Health Solutions, founded in 2001 and headquartered in Fort Lauderdale, Florida...
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 ml-6 flex items-center gap-1">
                Show More <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* HQ Location */}
            {prospect.city && prospect.country && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">HQ Location</p>
                </div>
                <div className="flex items-start justify-between gap-2 ml-6">
                  <p className="text-sm text-gray-700">
                    {prospect.city}, {prospect.country}
                  </p>
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                </div>
              </div>
            )}

            {/* Employees */}
            {prospect.companySize && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">Employees</p>
                </div>
                <p className="text-sm text-blue-600 font-medium ml-6">{prospect.companySize}</p>
              </div>
            )}

            {/* Revenue */}
            {prospect.revenue && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">Revenue</p>
                </div>
                <p className="text-sm text-gray-900 font-medium ml-6">{prospect.revenue}</p>
              </div>
            )}

            {/* Industry */}
            {prospect.industry && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">Industry</p>
                </div>
                <div className="ml-6 space-y-1">
                  <p className="text-xs text-gray-600">Primary Industries</p>
                  <p className="text-sm text-gray-700 font-medium">{prospect.industry}</p>
                  <p className="text-xs text-gray-600 mt-2">Additional Industries</p>
                  <p className="text-sm text-gray-700 font-medium">Healthcare Services</p>
                </div>
              </div>
            )}

            {/* Technologies */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-500 font-semibold uppercase">Technologies</p>
              </div>
              <div className="ml-6 space-y-1">
                <p className="text-sm text-gray-700">
                  API Management, Ad Exchanges, Advertising Networks, Applicant Tracking Systems...
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  See all
                </button>
              </div>
            </div>

            {/* HQ Phone */}
            {prospect.phone && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <p className="text-xs text-gray-500 font-semibold uppercase">HQ Phone</p>
                </div>
                <a
                  href={`tel:${prospect.phone}`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium ml-6"
                >
                  {prospect.phone} <span className="text-gray-600 font-normal">(HQ)</span>
                </a>
              </div>
            )}
          </div>
        </Card>

        {/* Job Level Card */}
        {prospect.jobLevel && (
          <Card title="Job Level">
            <p className="text-sm text-gray-900">{prospect.jobLevel}</p>
          </Card>
        )}
      </div>
    </div>
  );
};
