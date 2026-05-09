import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  BookOpen, 
  GraduationCap, 
  Banknote, 
  Building2, 
  CreditCard,
  ChevronRight,
  CheckCircle,
  ExternalLink,
  Eye,
  Calendar,
  Users,
  Award
} from "lucide-react";

export default function AdmissionConsultant() {
  const [hoveredDoc, setHoveredDoc] = useState(null);

  const documents = [
    {
      id: 1,
      name: "Center Procedure",
      file: "/admission%20cunsltant/Procedure.pdf",
      icon: <FileText size={24} />,
      color: "from-blue-500 to-blue-600",
      description: "Complete procedure guidelines for admission centers"
    },
    {
      id: 2,
      name: "EduOrbix Admission Partner Form",
      file: "/admission%20cunsltant/EduOrbix%20Admission%20Partner%20Form.pdf",
      icon: <FileText size={24} />,
      color: "from-green-500 to-green-600",
      description: "Official partnership application form"
    },
    {
      id: 3,
      name: "EduOrbix Affiliation Letter",
      file: "/admission%20cunsltant/EduOrbix%20Affiliation%20Letter.pdf",
      icon: <FileText size={24} />,
      color: "from-purple-500 to-purple-600",
      description: "Official affiliation documentation"
    },
    // {
    //   id: 4,
    //   name: "Information Brochure",
    //   file: "/admission%20cunsltant/Information_Brochure_-compressed.pdf-1775216845626.pdf",
    //   icon: <BookOpen size={24} />,
    //   color: "from-orange-500 to-orange-600",
    //   description: "Complete university information guide"
    // },
    // {
    //   id: 5,
    //   name: "NECU Application Form",
    //   file: "/admission%20cunsltant/NECU%20Application%20form%20(2).pdf",
    //   icon: <FileText size={24} />,
    //   color: "from-red-500 to-red-600",
    //   description: "Official application form for admission"
    // },
    // {
    //   id: 6,
    //   name: "NECU Fee Details",
    //   file: "/admission%20cunsltant/NECU%20FEE%20ALL.pdf",
    //   icon: <Banknote size={24} />,
    //   color: "from-emerald-500 to-emerald-600",
    //   description: "Complete fee structure and payment information"
    // },
    // {
    //   id: 7,
    //   name: "NECU Degree Form",
    //   file: "/admission%20cunsltant/NECU%20Degree%20Form.pdf",
    //   icon: <GraduationCap size={24} />,
    //   color: "from-indigo-500 to-indigo-600",
    //   description: "Degree application and registration form"
    // },
    {
      id: 8,
      name: "Bank Account Details",
      file: "/admission%20cunsltant/Account%20Details.pdf",
      icon: <CreditCard size={24} />,
      color: "from-cyan-500 to-cyan-600",
      description: "Bank account information for fee payment"
    },
    // {
    //   id: 9,
    //   name: "Admission Consultants",
    //   file: "/admission%20cunsltant/Admission%20consultants%20(1).pdf",
    //   icon: <Users size={24} />,
    //   color: "from-rose-500 to-rose-600",
    //   description: "List of authorized admission consultants"
    // },
    {
      id: 10,
      name: "Admission Process",
      file: "/admission%20cunsltant/Admission%20Process.pdf",
      icon: <Calendar size={24} />,
      color: "from-teal-500 to-teal-600",
      description: "Step-by-step admission process guide"
    },
  ];

  const bankDetails = {
    accountName: "North East Christian University",
    accountNumber: "0686073000000369",
    ifscCode: "SIBL0000686",
    bankName: "South Indian Bank",
    branch: "Dimapur Branch"
  };

  const features = [
    "Easy document download",
    "Secure & verified files",
    "Always up-to-date",
    "Instant access"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2a48] via-[#0d2f52] to-[#123b60] text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-5">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-yellow-500/30">
              <Award size={18} className="text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm">Admission Consultant Program</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
             Admission Consultant
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your complete resource hub for admission documents, application forms, 
              fee details, and payment information all in one place.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle size={16} className="text-yellow-400" />
                <span className="text-sm">10+ Documents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle size={16} className="text-yellow-400" />
                <span className="text-sm">Instant Download</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle size={16} className="text-yellow-400" />
                <span className="text-sm">Secure Access</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#f9fafb" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="px-4 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                <FileText className="text-yellow-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">10+</div>
              <div className="text-sm text-gray-600">Documents Available</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <Download className="text-green-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">Instant</div>
              <div className="text-sm text-gray-600">Download Access</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <Building2 className="text-purple-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">24/7</div>
              <div className="text-sm text-gray-600">Availability</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Partner Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Details Section - Modern Card Design */}
      {/* <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#0a2a48] to-[#0d2f52] rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
              <div className="relative p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-yellow-500/20 rounded-xl">
                    <CreditCard className="text-yellow-400" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Bank Account Details</h2>
                    <p className="text-gray-300 mt-1">For fee payment and transactions</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <p className="text-yellow-400 text-sm font-semibold mb-2">Account Name</p>
                    <p className="text-white font-medium text-lg">{bankDetails.accountName}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <p className="text-yellow-400 text-sm font-semibold mb-2">Account Number</p>
                    <p className="text-white font-medium text-lg">{bankDetails.accountNumber}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <p className="text-yellow-400 text-sm font-semibold mb-2">IFSC Code</p>
                    <p className="text-white font-medium text-lg">{bankDetails.ifscCode}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <p className="text-yellow-400 text-sm font-semibold mb-2">Bank Name</p>
                    <p className="text-white font-medium text-lg">{bankDetails.bankName}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 md:col-span-2 lg:col-span-1">
                    <p className="text-yellow-400 text-sm font-semibold mb-2">Branch</p>
                    <p className="text-white font-medium text-lg">{bankDetails.branch}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Documents Section - Modern Grid Design */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
              <FileText size={18} className="text-yellow-600" />
              <span className="text-yellow-700 font-semibold text-sm">Resource Library</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Download Admission Documents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access all your required documents in one place. Click download to get instant access.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                onMouseEnter={() => setHoveredDoc(doc.id)}
                onMouseLeave={() => setHoveredDoc(null)}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${doc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} style={{ padding: '2px' }}>
                  <div className="absolute inset-0 bg-white rounded-2xl m-[2px]"></div>
                </div>
                
                <div className="relative p-6">
                  {/* Icon with animated background */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${doc.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {doc.icon}
                  </div>
                  
                  {/* Document Name */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
                    {doc.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {doc.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={doc.file}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0a2a48] to-[#0d2f52] text-white px-4 py-2.5 rounded-lg font-semibold hover:from-[#0d2f52] hover:to-[#123b60] transition-all duration-300 group/btn"
                    >
                      <Download size={18} className="group-hover/btn:animate-bounce" />
                      Download
                    </a>
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2.5 border-2 border-gray-300 rounded-lg text-gray-600 hover:border-yellow-500 hover:text-yellow-600 transition-all duration-300"
                    >
                      <Eye size={18} />
                    </a>
                  </div>
                </div>
                
                {/* Hover Info Bar */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${doc.color} h-1 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <CheckCircle size={18} className="text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Everything You Need in One Place
              </h2>
              <p className="text-gray-600 mb-6">
                We've organized all admission-related documents to make your application process smooth and hassle-free.
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Need Assistance?</h3>
                    <p className="text-gray-600 text-sm">Our team is here to help</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  If you have any questions or need clarification about the admission process, 
                  please don't hesitate to contact our support team.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-700 transition-colors group"
                >
                  Contact Support
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      {/* <section className="py-16 px-4 bg-gradient-to-r from-[#0a2a48] to-[#0d2f52]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Download all necessary documents and begin your admission process today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href={documents[4].file}
              download
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              <FileText size={20} />
              Download Application Form
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <Users size={20} />
              Talk to Consultant
            </a>
          </div>
        </div>
      </section> */}
    </main>
  );
}