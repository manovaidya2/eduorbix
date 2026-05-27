import React from "react";
import {
  Shield,
  Database,
  Users,
  Share2,
  Lock,
  Cookie,
  Clock,
  UserCheck,
  Globe,
  RefreshCw,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F6F1E3]">
      {/* Responsive container padding with top margin for mobile */}
      <div className="mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-12">
        
        {/* Hero Section - Fully Responsive */}
        <div className="bg-gradient-to-br from-[#071A3D] via-[#0D2C63] to-[#071A3D] rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 text-white shadow-xl border border-[#D4AF37]/30">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#D4AF37]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Privacy First
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#F5E6A9] mt-2 border-l-4 border-[#D4AF37] pl-3 sm:pl-4">
            Your trust is our priority. Learn how we protect and manage your data.
          </p>

          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
            <span>📅</span>
            <span className="text-[#FFE7A3]">Effective Date: 01/09/2025</span>
          </div>
        </div>

        {/* Intro Section - Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-[#D4AF37]/20 mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-slate-700">
            <strong className="text-[#071A3D]">EduOrbix</strong>{" "}
            respects your privacy and is committed to protecting your personal
            data. This privacy policy explains how we collect, use, and
            safeguard your information when you interact with our services.
          </p>
        </div>

        {/* Policy Sections */}
        <PolicySection icon={Database} title="1. Information We Collect">
          <div className="space-y-3 sm:space-y-4">
            <InfoBlock
              title="a) Personal Information"
              items={["Name", "Email address", "Phone number", "Company/Institution details"]}
            />
            <InfoBlock
              title="b) Technical Information"
              items={["IP address", "Browser type", "Device information", "Website usage data"]}
            />
          </div>
        </PolicySection>

        <PolicySection icon={Users} title="2. How We Use Information">
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700">
            {[
              "Respond to inquiries",
              "Provide consultancy and business services",
              "Improve website functionality",
              "Send business-related communications",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PolicySection>

        <PolicySection icon={Share2} title="3. Data Sharing">
          <div className="mb-3 inline-flex items-center gap-2 bg-[#071A3D]/5 text-[#071A3D] px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-[#D4AF37]/30 flex-wrap">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <span className="font-medium">We do NOT sell your data</span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 mt-3">We may share information with:</p>

          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700 mt-2">
            {[
              "Partner institutions (only when required)",
              "Legal authorities (if required by law)",
              "Service providers (hosting, CRM tools, etc.)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PolicySection>

        <PolicySection icon={Lock} title="4. Data Protection">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            {["Secure servers", "Encrypted communications", "Access controls"].map(
              (item) => (
                <span
                  key={item}
                  className="bg-[#071A3D]/5 text-[#071A3D] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 border border-[#D4AF37]/30"
                >
                  <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37]" /> {item}
                </span>
              )
            )}
          </div>

          <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] p-2.5 sm:p-3 rounded-r-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C89B1E] flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#071A3D]">
              However, no online system is 100% secure.
            </p>
          </div>
        </PolicySection>

        <PolicySection icon={Cookie} title="5. Cookies Policy">
          <p className="text-sm sm:text-base text-slate-700 mb-2">Our website may use cookies to:</p>
          <ul className="space-y-1 text-sm sm:text-base text-slate-700 ml-4 sm:ml-5 list-disc">
            <li>Enhance user experience</li>
            <li>Track website analytics</li>
          </ul>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 bg-[#071A3D]/5 p-2 sm:p-2.5 rounded-lg">
            💡 You can disable cookies via browser settings.
          </p>
        </PolicySection>

        <PolicySection icon={Clock} title="6. Data Retention">  
          <p className="text-sm sm:text-base text-slate-700">We retain data:</p>
          <ul className="space-y-1 text-sm sm:text-base text-slate-700 ml-4 sm:ml-5 list-disc mt-2">
            <li>Only as long as necessary</li>
            <li>For legal, contractual, or operational purposes</li>
          </ul>
        </PolicySection>

        <PolicySection icon={UserCheck} title="7. Your Rights">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              "Access your data",
              "Request correction",
              "Request deletion (subject to legal obligations)",
            ].map((text) => (
              <span
                key={text}
                className="bg-[#071A3D]/5 text-[#071A3D] px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 border border-[#D4AF37]/30"
              >
                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
                {text}
              </span>
            ))}
          </div>
        </PolicySection>

        <PolicySection icon={Globe} title="8. International Data Transfers">
          <p className="text-sm sm:text-base text-slate-700">
            As a UAE-based company working globally, your data may be processed
            across different jurisdictions.
          </p>
        </PolicySection>

        <PolicySection icon={RefreshCw} title="9. Updates to Policy">
          <p className="text-sm sm:text-base text-slate-700">
            We may update this Privacy Policy from time to time. Please check
            back periodically for any changes.
          </p>
        </PolicySection>

        {/* Contact Section - Fully Responsive */}
        <div className="bg-gradient-to-r from-[#071A3D] to-[#0D2C63] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mt-6 sm:mt-8 text-white border border-[#D4AF37]/30 shadow-lg">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2">
            Have questions about our Privacy Policy?
          </h3>

          <p className="text-sm sm:text-base text-[#F5E6A9] text-center mb-4 sm:mb-6">
            Our team is here to help you understand how we protect your data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C89B1E] text-[#071A3D] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold transition text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4" />
              Contact Privacy Team
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
            Committed to protecting your privacy across all jurisdictions.
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

// Reusable InfoBlock Component - Responsive
const InfoBlock = ({ title, items }) => {
  return (
    <div>
      <h4 className="font-semibold text-[#071A3D] mb-2 text-sm sm:text-base">{title}</h4>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="bg-[#071A3D]/5 border border-[#D4AF37]/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;