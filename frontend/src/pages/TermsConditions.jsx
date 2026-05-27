import React from "react";
import {
  FileText,
  Briefcase,
  UserCheck,
  Shield,
  FileSignature,
  AlertTriangle,
  ExternalLink,
  XCircle,
  Scale,
  RefreshCw,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  Building,
  GraduationCap,
  Handshake,
  PenTool,
  Users,
  Globe,
} from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F6F1E3]">
      {/* Responsive container padding with top margin for mobile */}
      <div className="mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-12">
        
        {/* Hero Section - Fully Responsive */}
        <div className="bg-gradient-to-br from-[#071A3D] via-[#0D2C63] to-[#071A3D] rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 text-white shadow-xl border border-[#D4AF37]/30">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#D4AF37]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Terms & Conditions
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#F5E6A9] mt-2 border-l-4 border-[#D4AF37] pl-3 sm:pl-4">
            Please read these terms carefully before using our services.
          </p>

          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
            <span>📅</span>
            <span className="text-[#FFE7A3]">Effective Date: 01/09/2025</span>
          </div>
        </div>

        {/* Company Welcome - Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-[#D4AF37]/20 mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-slate-700">
            <strong className="text-[#071A3D]">EduOrbix Services FZ LLC</strong>{" "}
            ("Company", "we", "our", "us"). By accessing or using our website and services, 
            you agree to comply with the following Terms and Conditions.
          </p>
        </div>

        {/* Section 1 - Nature of Services */}
        <PolicySection icon={Briefcase} title="1. Nature of Services">
          <p className="text-sm sm:text-base text-slate-700 mb-3">
            EduOrbix operates as an Education Business Development & Institutional Management Company. 
            Our services include:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              "Institutional setup and management",
              "Academic consultancy and curriculum development",
              "Business development for educational institutions",
              "Training program structuring and implementation",
              "Strategic partnerships and collaborations",
            ].map((item) => (
              <span
                key={item}
                className="bg-[#071A3D]/5 border border-[#D4AF37]/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm text-slate-700 flex items-center gap-1"
              >
                <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
                {item}
              </span>
            ))}
          </div>
        </PolicySection>

        {/* Section 2 - User Responsibilities */}
        <PolicySection icon={UserCheck} title="2. User Responsibilities">
          <p className="text-sm sm:text-base text-slate-700 mb-2">By using our website, you agree to:</p>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700">
            {[
              "Provide accurate and complete information",
              "Not misuse or attempt to disrupt the website",
              "Not engage in unauthorized data access or scraping",
              "Use services only for lawful purposes",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 3 - Intellectual Property */}
        <PolicySection icon={Shield} title="3. Intellectual Property">
          <p className="text-sm sm:text-base text-slate-700 mb-3">
            All content on this website (including text, logos, branding, designs, and documents) 
            is the intellectual property of EduOrbix Services FZ LLC.
          </p>
          <div className="bg-[#071A3D]/5 border-l-4 border-[#D4AF37] p-2.5 sm:p-3 rounded-r-lg">
            <p className="text-xs sm:text-sm text-[#071A3D] font-medium mb-2">You may not:</p>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-700 ml-3 sm:ml-4">
              <li className="flex items-center gap-2">
                <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C89B1E]" />
                Copy, reproduce, or distribute content without permission
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C89B1E]" />
                Use branding or materials for commercial purposes
              </li>
            </ul>
          </div>
        </PolicySection>

        {/* Section 4 - Service Agreements */}
        <PolicySection icon={FileSignature} title="4. Service Agreements">
          <p className="text-sm sm:text-base text-slate-700 mb-2">All services offered by EduOrbix are governed by:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
            {["Separate agreements", "MOUs (Memorandum of Understanding)", "Commercial contracts"].map((item) => (
              <span key={item} className="bg-[#071A3D]/5 border border-[#D4AF37]/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
          <div className="bg-[#D4AF37]/10 p-2.5 sm:p-3 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C89B1E] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#071A3D]">
              Website content does not constitute a legally binding service agreement.
            </p>
          </div>
        </PolicySection>

        {/* Section 5 - Limitation of Liability */}
        <PolicySection icon={AlertTriangle} title="5. Limitation of Liability">
          <p className="text-sm sm:text-base text-slate-700 mb-2">EduOrbix shall not be liable for:</p>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700">
            {[
              "Any indirect or consequential damages",
              "Business losses arising from third-party partnerships",
              "Outcomes of institutional collaborations",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 6 - Third-Party Links */}
        <PolicySection icon={ExternalLink} title="6. Third-Party Links">
          <p className="text-sm sm:text-base text-slate-700 mb-2">
            Our website may contain links to third-party websites. We are not responsible for:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {["Their content", "Their privacy practices", "Their service outcomes"].map((item) => (
              <span key={item} className="bg-[#071A3D]/5 border border-[#D4AF37]/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-slate-700">
                {item}
              </span>
            ))}
          </div>
        </PolicySection>

        {/* Section 7 - Termination of Access */}
        <PolicySection icon={XCircle} title="7. Termination of Access">
          <p className="text-sm sm:text-base text-slate-700">We reserve the right to:</p>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700 mt-2">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              Restrict or terminate access
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
              Remove any user violating these terms
            </li>
          </ul>
        </PolicySection>

        {/* Section 8 - Governing Law */}
        <PolicySection icon={Scale} title="8. Governing Law">
          <p className="text-sm sm:text-base text-slate-700">
            These Terms shall be governed by the laws of the United Arab Emirates (UAE) 
            and applicable Free Zone regulations.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-[#071A3D]/5 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-[#D4AF37]/30">
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
            <span>UAE Jurisdiction</span>
          </div>
        </PolicySection>

        {/* Section 9 - Amendments */}
        <PolicySection icon={RefreshCw} title="9. Amendments">
          <p className="text-sm sm:text-base text-slate-700">
            We reserve the right to update these Terms at any time. Continued use of the website 
            constitutes acceptance of the updated terms.
          </p>
        </PolicySection>

        {/* Agreement Confirmation - Responsive */}
        <div className="bg-gradient-to-r from-[#071A3D] to-[#0D2C63] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mt-6 text-white border border-[#D4AF37]/30 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3 justify-center mb-3 flex-wrap text-center">
            <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF37]" />
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-center">
              By using EduOrbix Services, you agree to these Terms & Conditions
            </h3>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#F5E6A9] text-center">
            If you do not agree with any part of these terms, please do not use our website or services.
          </p>
          <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-[#F5E6A9]/70">
            Last reviewed: September 2025
          </div>
        </div>

        {/* Contact Section - Fully Responsive */}
        <div className="bg-gradient-to-r from-[#071A3D] to-[#0D2C63] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mt-6 sm:mt-8 text-white border border-[#D4AF37]/30 shadow-lg">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2">
            Have questions about our Terms & Conditions?
          </h3>

          <p className="text-sm sm:text-base text-[#F5E6A9] text-center mb-4 sm:mb-6">
            Our legal team is here to address your concerns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C89B1E] text-[#071A3D] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold transition text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4" />
              Contact Legal Team
            </a>

            <div className="inline-flex items-center gap-2 bg-white/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-[#D4AF37]/20 text-sm sm:text-base w-full sm:w-auto justify-center">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>+971 4 123 4567</span>
            </div>
          </div>
        </div>

        {/* Footer - Responsive */}
        <footer className="text-center mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#D4AF37]/30 text-slate-500 text-xs sm:text-sm">
          <p>© 2025 EduOrbix Services FZ LLC. All rights reserved.</p>
          <p className="mt-1">
            Committed to transparency and legal compliance across all jurisdictions.
          </p>
        </footer>
      </div>
    </div>
  );
};

// Reusable PolicySection Component - Responsive
const PolicySection = ({ icon: Icon, title, children }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#D4AF37]/20 mb-4 sm:mb-5 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-[#D4AF37]/20 bg-[#071A3D]/5">
        <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white shadow-sm text-[#D4AF37] border border-[#D4AF37]/20">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#071A3D]">
          {title}
        </h2>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
};

export default TermsConditions;