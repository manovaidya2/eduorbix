import React from "react";
import {
  DollarSign,
  RefreshCw,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  ArrowRight,
  CreditCard,
  Banknote,
  Gavel,
  Heart,
  FileText,
  Zap,
  Users,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Send,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-white to-[#F6F1E3]">
      {/* Responsive container */}
      <div className="mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-12">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#071A3D] via-[#0D2C63] to-[#071A3D] rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 text-white shadow-xl border border-[#D4AF37]/30">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#D4AF37]" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Refund Policy
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[#F5E6A9] mt-2 border-l-4 border-[#D4AF37] pl-3 sm:pl-4">
            Clear, transparent, and fair refund guidelines for our professional services
          </p>

          <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
            <span>📅</span>
            <span className="text-[#FFE7A3]">Effective Date: 01/09/2025</span>
          </div>
        </div>

        {/* Company Intro */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-sm border border-[#D4AF37]/20 mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-slate-700">
            <strong className="text-[#071A3D]">EduOrbix </strong>{" "}
            aims to provide high-quality professional services. Since our work involves consultancy, planning, 
            and institutional support, our refund policy is simple and transparent.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <FeatureCard 
            icon={FileText}
            title="Transparent Process"
            description="Clear and straightforward refund guidelines"
            gradient="from-blue-50 to-blue-100"
            iconColor="text-blue-600"
          />
          <FeatureCard 
            icon={Zap}
            title="Quick Processing"
            description="7-21 working days for refund processing"
            gradient="from-emerald-50 to-emerald-100"
            iconColor="text-emerald-600"
          />
          <FeatureCard 
            icon={Heart}
            title="Fair Approach"
            description="We believe in fairness and transparency"
            gradient="from-amber-50 to-amber-100"
            iconColor="text-amber-600"
          />
        </div>

        {/* Section 1 - General Rule */}
        <PolicySection icon={AlertCircle} title="1. General Rule">
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg mb-3">
            <p className="text-sm sm:text-base font-semibold text-red-700">Most of our services are non-refundable</p>
          </div>
          <p className="text-sm sm:text-base text-slate-700 mb-2">Because:</p>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700">
            {[
              "Work starts immediately after confirmation",
              "Time, expertise, and resources are committed",
              "Services are customized for each client",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 2 - When Can You Get a Refund */}
        <PolicySection icon={RefreshCw} title="2. When Can You Get a Refund?">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <RefundEligibilityCard 
              icon={CreditCard}
              title="Double Charging"
              description="You were charged twice by mistake"
              color="blue"
            />
            <RefundEligibilityCard 
              icon={AlertTriangle}
              title="Technical Error"
              description="Payment was made due to a technical error"
              color="purple"
            />
            <RefundEligibilityCard 
              icon={Calendar}
              title="Service Delay"
              description="We are unable to start the service within the agreed time"
              color="amber"
            />
          </div>
        </PolicySection>

        {/* Section 3 - Partial Refunds */}
        <PolicySection icon={ArrowRight} title="3. Partial Refunds (If Applicable)">
          <p className="text-sm sm:text-base text-slate-700 mb-2">If work has started but is not completed:</p>
          <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700">
            {[
              "You may receive a partial refund",
              "The amount will depend on how much work has already been done",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </PolicySection>

        {/* Section 4 - When Refunds Are Not Applicable */}
        <PolicySection icon={XCircle} title="4. When Refunds Are Not Applicable">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { icon: HelpCircle, text: "Change of Mind", desc: "After payment is completed" },
              { icon: Clock, text: "Client Delay", desc: "Delay or non-cooperation from the client side" },
              { icon: AlertCircle, text: "Expectation Mismatch", desc: "Results not meeting expectations" },
              { icon: Users, text: "Third-Party Issues", desc: "Issues related to third-party institutions or partners" },
            ].map((item) => (
              <div key={item.text} className="bg-red-50 border border-red-200 rounded-lg p-3 flex-1 min-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-red-700 text-sm">{item.text}</span>
                </div>
                <p className="text-xs text-red-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </PolicySection>

        {/* Section 5 - How to Request a Refund */}
        <PolicySection icon={Mail} title="5. How to Request a Refund">
          <div className="bg-[#071A3D]/5 rounded-lg p-4 sm:p-5 mb-3">
            <p className="text-sm sm:text-base text-slate-700 mb-3">To request a refund:</p>
            <ol className="space-y-2 text-sm sm:text-base text-slate-700 list-decimal ml-5">
              <li>Email us at: <strong className="text-[#071A3D]">business@eduorbix.com</strong></li>
              <li>Share your:
                <ul className="list-disc ml-5 mt-1">
                  <li>Payment details</li>
                  <li>Reason for refund</li>
                </ul>
              </li>
            </ol>
          </div>
          <div className="bg-[#D4AF37]/10 rounded-lg p-3 sm:p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-sm sm:text-base text-[#071A3D] font-medium">Processing Time:</span>
            </div>
            <span className="bg-[#D4AF37] text-[#071A3D] px-3 py-1 rounded-full text-sm font-bold">7–21 working days</span>
          </div>
        </PolicySection>

        {/* Section 6 - Refund Method */}
        <PolicySection icon={Banknote} title="6. Refund Method">
          <p className="text-sm sm:text-base text-slate-700 mb-2">Refunds will be made through:</p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: CreditCard, text: "Original payment method" },
              { icon: Banknote, text: "Bank transfer" },
            ].map((item) => (
              <span key={item.text} className="bg-[#071A3D]/5 border border-[#D4AF37]/20 px-3 py-1.5 rounded-full text-sm text-slate-700 flex items-center gap-2">
                <item.icon className="w-4 h-4 text-[#D4AF37]" />
                {item.text}
              </span>
            ))}
          </div>
        </PolicySection>

        {/* Section 7 - Final Decision */}
        <PolicySection icon={Gavel} title="7. Final Decision">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
            <p className="text-sm sm:text-base text-amber-800">
              All refund decisions will be made by <strong>EduOrbix</strong> based on the situation.
            </p>
          </div>
        </PolicySection>

        {/* Our Promise Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mt-6 border border-emerald-200">
          <div className="flex items-center gap-3 justify-center mb-3 flex-wrap">
            <ThumbsUp className="w-8 h-8 text-emerald-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 text-center">🤝 Our Promise</h3>
          </div>
          <p className="text-emerald-700 text-center text-sm sm:text-base">
            We believe in fairness and transparency. If there's any issue, we'll always try to resolve it in the best possible way.
          </p>
          <p className="text-emerald-600 text-center text-xs sm:text-sm mt-3">
            Your trust matters to us
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#071A3D] to-[#0D2C63] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mt-6 sm:mt-8 text-white border border-[#D4AF37]/30 shadow-lg">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2">
            Have questions about our Refund Policy?
          </h3>

          <p className="text-sm sm:text-base text-[#F5E6A9] text-center mb-4 sm:mb-6">
            We're here to help clarify any concerns you may have.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C89B1E] text-[#071A3D] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold transition text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4" />
              Email Support Team
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-[#D4AF37]/20 text-sm sm:text-base w-full sm:w-auto justify-center transition"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
              Submit Refund Request
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#D4AF37]/30 text-slate-500 text-xs sm:text-sm">
          <p>© 2025 Eduglobe Services FZ LLC. All rights reserved.</p>
          <p className="mt-1">
            Committed to fair and transparent business practices.
          </p>
        </footer>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient, iconColor }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-4 text-center border border-[#D4AF37]/20 shadow-sm`}>
      <div className={`inline-flex items-center justify-center p-2 rounded-full bg-white shadow-sm mb-2`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <h3 className="font-bold text-slate-800 text-sm sm:text-base">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-600 mt-1">{description}</p>
    </div>
  );
};

// Refund Eligibility Card
const RefundEligibilityCard = ({ icon: Icon, title, description, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
  };
  
  return (
    <div className={`${colorClasses[color]} border rounded-lg p-3`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" />
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <p className="text-xs opacity-90">{description}</p>
    </div>
  );
};

// Reusable PolicySection Component
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

export default RefundPolicy;