import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Award, Clock, CheckCircle, TrendingUp, BookOpen, ArrowRight, Target, Zap } from "lucide-react";


export default function IndustrialTrainingPartner() {
  const trainingPrograms = [
    {
      title: "Internship Programs",
      duration: "3-6 months",
      description: "Hands-on industry experience with real projects",
      features: ["Live projects", "Mentorship", "Certificate", "Stipend available"]
    },
    {
      title: "Skill Development",
      duration: "1-3 months",
      description: "Industry-relevant skill enhancement programs",
      features: ["Practical training", "Expert faculty", "Industry tools", "Placement support"]
    },
    {
      title: "Corporate Training",
      duration: "Customizable",
      description: "Tailored programs for corporate needs",
      features: ["Custom curriculum", "Corporate projects", "Certification", "Networking"]
    }
  ];

  const industries = [
    "IT & Software Development",
    "Data Science & AI",
    "Digital Marketing",
    "Finance & Accounting",
    "HR & Management",
    "Engineering & Manufacturing"
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0a2a48] to-[#0d2f52] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Industrial Training Partner
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Bridging the Gap Between Academia and Industry
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                Partner With Us <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-4">
                Empower Your Career with Industry-Ready Skills
              </h2>
              <p className="text-gray-600 text-lg">
                As a leading Industrial Training Partner, we connect students with real-world industry experiences, ensuring they graduate with practical skills and professional exposure.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
                <Target size={48} className="text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0a2a48] mb-2">500+</h3>
                <p className="text-gray-600">Partner Companies</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
                <Users size={48} className="text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0a2a48] mb-2">10,000+</h3>
                <p className="text-gray-600">Students Trained</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
                <Zap size={48} className="text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0a2a48] mb-2">85%</h3>
                <p className="text-gray-600">Placement Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-4">
                Our Training Programs
              </h2>
              <p className="text-gray-600 text-lg">
                Comprehensive programs designed to meet industry standards
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {trainingPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4">
                    <h3 className="text-xl font-bold text-white">{program.title}</h3>
                    <p className="text-white/90 text-sm">{program.duration}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={16} className="text-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      to="/contact" 
                      className="mt-6 inline-flex items-center gap-2 text-yellow-600 font-semibold hover:text-yellow-700"
                    >
                      Learn More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-4">
                Industries We Serve
              </h2>
              <p className="text-gray-600 text-lg">
                Partnering with top companies across diverse sectors
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-yellow-50 transition-colors">
                  <CheckCircle size={20} className="text-yellow-500" />
                  <span className="text-gray-700">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-xl text-gray-300">
                For Companies and Educational Institutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">For Companies</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">✓ Access to trained, industry-ready talent</li>
                  <li className="flex items-center gap-3">✓ Reduced hiring and training costs</li>
                  <li className="flex items-center gap-3">✓ Corporate branding among students</li>
                  <li className="flex items-center gap-3">✓ Customized training programs</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">For Institutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">✓ Enhanced placement records</li>
                  <li className="flex items-center gap-3">✓ Industry-aligned curriculum</li>
                  <li className="flex items-center gap-3">✓ Guest lectures from industry experts</li>
                  <li className="flex items-center gap-3">✓ Real-world project opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-6">
              Ready to Build Your Career?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our training programs and get industry-ready
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Enroll Now <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}