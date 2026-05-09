import React from "react";
import { Link } from "react-router-dom";
import { FlaskConical, Users, Award, BookOpen, CheckCircle, TrendingUp, ArrowRight, Microscope, FileText, Globe } from "lucide-react";


export default function ResearchAssociate() {
  const researchAreas = [
    {
      title: "Educational Research",
      description: "Innovative approaches to learning and teaching methodologies",
      icon: <BookOpen size={32} />
    },
    {
      title: "Market Research",
      description: "Analysis of educational trends and market demands",
      icon: <TrendingUp size={32} />
    },
    {
      title: "Policy Research",
      description: "In-depth study of education policies and reforms",
      icon: <FileText size={32} />
    },
    {
      title: "International Collaboration",
      description: "Global research partnerships and cross-cultural studies",
      icon: <Globe size={32} />
    }
  ];

  const opportunities = [
    "Research Publications",
    "Conference Presentations",
    "Grant Writing Support",
    "Data Analysis Training",
    "Collaborative Projects",
    "Mentorship Programs"
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
                Research Associate
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Driving Innovation Through Collaborative Research
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                Join Research Team <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-4">
                Advancing Knowledge Through Research
              </h2>
              <p className="text-gray-600 text-lg">
                Our Research Associate program offers unique opportunities for scholars, researchers, and academic professionals to engage in cutting-edge research projects.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-yellow-500 mb-2">50+</div>
                <p className="text-gray-600">Research Projects</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-yellow-500 mb-2">100+</div>
                <p className="text-gray-600">Publications</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-yellow-500 mb-2">25+</div>
                <p className="text-gray-600">Partner Institutions</p>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-yellow-500 mb-2">15+</div>
                <p className="text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-4">
                Research Focus Areas
              </h2>
              <p className="text-gray-600 text-lg">
                Exploring diverse domains to create meaningful impact
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-yellow-500 mb-4 flex justify-center">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0a2a48] mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a2a48] mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 text-lg">
                Our structured approach to research collaboration
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold text-[#0a2a48] mb-2">Proposal Submission</h3>
                <p className="text-gray-600">Submit your research proposal and area of interest</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold text-[#0a2a48] mb-2">Review & Approval</h3>
                <p className="text-gray-600">Our expert committee reviews and approves proposals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold text-[#0a2a48] mb-2">Research Execution</h3>
                <p className="text-gray-600">Conduct research with our support and resources</p>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities */}
        <section className="py-16 bg-gradient-to-br from-[#0a2a48] to-[#0d2f52] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-gray-300">
                Comprehensive support for research associates
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                  <CheckCircle size={24} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-white text-lg">{opportunity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-[#0a2a48] mb-6">
                    Become a Research Associate
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Join a vibrant community of researchers and contribute to meaningful research that shapes the future of education and industry.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-yellow-500" />
                      <span>Access to research databases and tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-yellow-500" />
                      <span>Mentorship from experienced researchers</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-yellow-500" />
                      <span>Publication opportunities in reputed journals</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-yellow-500" />
                      <span>Networking with global experts</span>
                    </li>
                  </ul>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 mt-6"
                  >
                    Apply for Research Position <ArrowRight size={20} />
                  </Link>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1532619675605-1ede6c7ed2b5?ixlib=rb-4.0.3" 
                    alt="Research Collaboration" 
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Ready to Make an Impact Through Research?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Join our research team and contribute to meaningful discoveries
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Get in Touch
              </Link>
              <Link 
                to="/application-form" 
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Submit Research Proposal
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}