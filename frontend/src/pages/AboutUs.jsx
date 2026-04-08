import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Globe, 
  Award, 
  School, 
  ChevronRight, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Star,
  Quote
} from "lucide-react";
import img from "../images/hero-bg.jpg";

export default function AboutUs() {
  const navigate = useNavigate();

  const leadershipTeam = [
    {
      name: "Rajesh Mehta",
      designation: "Founder & CEO",
      image: "/api/placeholder/160/160",
      description: "15+ years in education consulting",
      bio: "Former admissions director with a vision to democratize global education access."
    },
    {
      name: "Priya Sharma",
      designation: "Director - Admissions",
      image: "/api/placeholder/160/160",
      description: "Former university admissions head",
      bio: "Expert in international admissions with 1000+ successful placements."
    },
    {
      name: "Dr. Vikram Singh",
      designation: "Head - Academic Partnerships",
      image: "/api/placeholder/160/160",
      description: "PhD in Education Leadership",
      bio: "Building bridges with top universities across 15+ countries."
    }
  ];

  const networkLocations = [
    "Delhi NCR", "Mumbai", "Bengaluru", "Pune",
    "Ahmedabad", "Hyderabad", "Chennai", "Kolkata",
    "London (UK)", "Dubai (UAE)", "Toronto (Canada)"
  ];

  const certifications = [
    "ISO 9001:2015 Certified",
    "Member - AIEC",
    "British Council Certified Agent",
    "ICEF Trained Counsellor"
  ];

  const accreditations = [
    "Registered with Ministry of Corporate Affairs",
    "PSARA Certified",
    "UAE KHDA Approved Partner",
    "Australian Education Association Member"
  ];

  const stats = [
    { value: "15+", label: "Years of Excellence", icon: Star },
    { value: "25k+", label: "Students Placed", icon: GraduationCap },
    { value: "100+", label: "University Partners", icon: School },
    { value: "15+", label: "Countries", icon: Globe }
  ];

  const values = [
    { title: "Transparency", description: "Complete honesty in every interaction and process." },
    { title: "Excellence", description: "Committed to delivering the highest quality guidance." },
    { title: "Student First", description: "Every decision prioritizes student success." },
    { title: "Innovation", description: "Embracing new technologies to enhance learning." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Section - Centered with Background Image */}
      <div className="relative bg-gradient-to-r from-[#0A1F44] via-[#143472] to-[#1F3A6E] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        {/* Animated overlay pattern */}
        <div className="absolute inset-0 opacity-20 z-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A227] rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15 lg:py-25">
          <div className="text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white/90 text-xs">
                <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-pulse"></span>
                Trusted Since 2015
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Empowering Futures,
                <span className="text-[#C9A227]"> One Student at a Time</span>
              </h1>
              <p className="text-sm text-white/80 max-w-xl mx-auto">
                Eduorbix is a professional education consultancy platform dedicated to helping students secure admission 
                in reputed colleges and universities across India and globally.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button 
                  onClick={() => navigate("/contact")}
                  className="group px-5 py-1.5 bg-[#C9A227] text-[#0A1F44] font-semibold text-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg flex items-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-5 py-1.5 border-2 border-white/30 text-white font-semibold text-sm rounded-full hover:bg-white/10 transition-all duration-300">
                  Watch Video
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L60 42.7C120 53 240 75 360 74.7C480 75 600 53 720 48C840 43 960 53 1080 58.7C1200 64 1320 64 1380 64L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V32Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Vision & Mission - Modern Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-7 h-7 text-[#C9A227]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A1F44] mb-3">Our Vision</h2>
            <div className="w-12 h-1 bg-[#C9A227] mb-5"></div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become a globally trusted education advisory platform that bridges the gap between 
              aspiring students and their dream academic institutions worldwide.
            </p>
          </div>

          <div className="group bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div className="w-14 h-14 bg-[#C9A227]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7 text-[#C9A227]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A1F44] mb-3">Our Mission</h2>
            <div className="w-12 h-1 bg-[#C9A227] mb-5"></div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To empower students with the right information, personalized guidance, and structured 
              support systems that enable academic success and career growth.
            </p>
          </div>
        </div>

        {/* Stats Section - Animated */}
        <div className="bg-gradient-to-r from-[#0A1F44] to-[#1F3A6E] rounded-3xl shadow-2xl p-10 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#C9A227]/20 transition-all duration-300">
                      <Icon className="w-8 h-8 text-[#C9A227]" />
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#C9A227] mb-2">{stat.value}</div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team - Modern Grid */}
        {/* <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-3">Meet Our Leadership</h2>
            <div className="w-20 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate experts committed to guiding students toward their academic dreams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#C9A227] fill-[#C9A227]" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#0A1F44] mb-1">{leader.name}</h3>
                  <p className="text-[#C9A227] font-semibold text-sm mb-3">{leader.designation}</p>
                  <p className="text-gray-500 text-sm mb-3">{leader.description}</p>
                  <p className="text-gray-600 text-sm">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Our Network */}
<div className="bg-gray-50 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-10 mb-14 md:mb-20">

  {/* Heading */}
  <div className="text-center mb-8 md:mb-10">
    <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1F44] mb-2 md:mb-3">
      Our Global Network
    </h2>

    <div className="w-16 md:w-20 h-1 bg-[#C9A227] mx-auto mb-3 md:mb-4"></div>

    <p className="text-gray-600 text-sm sm:text-base max-w-xl md:max-w-2xl mx-auto">
      Connecting students to opportunities across the world
    </p>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
    {networkLocations.map((location, index) => (
      <div
        key={index}
        className="flex items-center gap-3 bg-white rounded-lg md:rounded-xl p-3 md:p-3.5 shadow-sm hover:shadow-md transition-all"
      >
        <div className="w-7 h-7 md:w-8 md:h-8 bg-[#C9A227]/10 rounded-md md:rounded-lg flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4 text-[#C9A227]" />
        </div>

        <span className="text-gray-700 text-sm md:text-base font-medium truncate">
          {location}
        </span>
      </div>
    ))}
  </div>

  {/* Bottom Card */}
  <div className="bg-gradient-to-r from-[#0A1F44] to-[#1F3A6E] rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 text-center">
    <p className="text-white text-sm sm:text-base leading-relaxed">
      <span className="font-bold text-[#C9A227]">Plus:</span>{" "}
      Global partner network across 15+ countries with 100+ university collaborations
    </p>
  </div>
</div>

        {/* Certifications & Accreditations */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1F44]">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1F44]">Accreditations</h3>
            </div>
            <div className="space-y-4">
              {accreditations.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0A1F44] mb-3">Our Core Values</h2>
            <div className="w-20 h-1 bg-[#C9A227] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A227] transition-all duration-300">
                  <Quote className="w-8 h-8 text-[#C9A227] group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-[#0A1F44] mb-2">{value.title}</h4>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative bg-gradient-to-r from-[#0A1F44] to-[#1F3A6E] rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227] rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative p-10 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Educational Journey?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who trusted Eduorbix for their academic future
            </p>
            <button 
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 px-8 py-3 bg-[#C9A227] text-[#0A1F44] font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-lg"
            >
              Connect With Our Team
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}