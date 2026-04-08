// import React from "react";

// export default function AboutEduorbix() {
//   return (
//     <section className="bg-[#f8f7f3] py-20 px-4 relative overflow-hidden">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a46d]/5 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c5a46d]/5 rounded-full blur-3xl"></div>
      
//       {/* Geometric Patterns */}
//       <div className="absolute top-20 left-10 w-20 h-20 border border-[#c5a46d]/10 rounded-lg rotate-12"></div>
//       <div className="absolute bottom-20 right-10 w-32 h-32 border border-[#c5a46d]/10 rounded-full"></div>
      
//       <div className="max-w-5xl mx-auto relative">
//         {/* Header with decorative line */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="h-px w-12 bg-[#c5a46d]/30"></div>
//             <span className="text-[#c5a46d] uppercase tracking-[0.3em] text-sm font-semibold">
//               About Us
//             </span>
//             <div className="h-px w-12 bg-[#c5a46d]/30"></div>
//           </div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e2a38] mb-6">
//             About <span className="text-[#c5a46d] relative inline-block">Eduorbix
//               <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 120 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M2 6C32.5 2 87.5 2 118 6" stroke="#c5a46d" strokeWidth="3" strokeLinecap="round"/>
//               </svg>
//             </span>
//           </h2>
//         </div>

//         {/* Main Content Card */}
//         <div className="relative">
//           {/* Background Card */}
//           <div className="absolute inset-0 bg-[#c5a46d] rounded-3xl transform rotate-1 scale-105 opacity-20"></div>
          
//           {/* Main Card */}
//           <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-[#c5a46d]/10">
//             {/* Quote Icon */}
//             <div className="absolute -top-5 -left-5 w-16 h-16 bg-[#c5a46d] rounded-2xl rotate-12 flex items-center justify-center shadow-xl">
//               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//               </svg>
//             </div>

//             {/* Content */}
//             <div className="space-y-8">
//               {/* First Paragraph - Highlighted */}
//               <div className="flex items-start gap-4">
//                 <div className="w-1 h-16 bg-[#c5a46d] rounded-full hidden sm:block"></div>
//                 <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
//                   <span className="font-bold text-[#c5a46d] text-2xl">Eduorbix</span> is a professional 
//                   education consultancy platform dedicated to helping students secure admission in 
//                   reputed colleges and universities across India and globally.
//                 </p>
//               </div>

//               {/* Second Paragraph - With Icon Grid */}
//               <div className="grid md:grid-cols-5 gap-6 items-center">
//                 <div className="md:col-span-3">
//                   <div className="flex gap-4">
//                     <div className="flex-shrink-0">
//                       <div className="w-10 h-10 bg-[#c5a46d]/10 rounded-lg flex items-center justify-center">
//                         <svg className="w-5 h-5 text-[#c5a46d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                         </svg>
//                       </div>
//                     </div>
//                     <p className="text-gray-600 leading-relaxed">
//                       We simplify the entire admission journey — from course selection and profile 
//                       evaluation to documentation, applications, scholarships, and visa guidance.
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Mini Visual Element */}
//                 <div className="md:col-span-2 flex justify-center">
//                   <div className="relative">
//                     <div className="w-20 h-20 rounded-full bg-[#c5a46d]/10 flex items-center justify-center">
//                       <div className="w-12 h-12 rounded-full bg-[#c5a46d]/20 flex items-center justify-center">
//                         <div className="w-6 h-6 rounded-full bg-[#c5a46d]"></div>
//                       </div>
//                     </div>
//                     <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1e2a38] rounded-lg flex items-center justify-center text-white text-xs font-bold">
//                       10k+
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Third Paragraph - With Border */}
//               <div className="relative pl-8 border-l-4 border-[#c5a46d] bg-[#c5a46d]/5 p-6 rounded-r-2xl">
//                 <p className="text-gray-700 italic">
//                   "Whether you are planning to study in India or abroad, Eduorbix ensures a smooth, 
//                   transparent, and result-oriented process."
//                 </p>
                
//                 {/* Decorative Dots */}
//                 <div className="absolute bottom-2 right-2 flex gap-1">
//                   <div className="w-2 h-2 rounded-full bg-[#c5a46d]"></div>
//                   <div className="w-2 h-2 rounded-full bg-[#c5a46d]/60"></div>
//                   <div className="w-2 h-2 rounded-full bg-[#c5a46d]/30"></div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Decorative Line */}
//             <div className="mt-8 flex items-center gap-2">
//               <div className="h-2 w-2 rounded-full bg-[#c5a46d]"></div>
//               <div className="h-2 w-2 rounded-full bg-[#c5a46d]/60"></div>
//               <div className="h-2 w-2 rounded-full bg-[#c5a46d]/30"></div>
//               <div className="flex-1 h-px bg-gradient-to-r from-[#c5a46d] to-transparent"></div>
//             </div>
//           </div>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex flex-wrap gap-4 justify-center mt-12">
//           <button className="group relative px-8 py-4 bg-[#1e2a38] text-white rounded-full font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
//             <span className="relative z-10 flex items-center gap-2">
//               Explore Programs
//               <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </span>
//             <div className="absolute inset-0 bg-[#c5a46d] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//           </button>
          
//           <button className="px-8 py-4 border-2 border-[#c5a46d] text-[#c5a46d] rounded-full font-semibold hover:bg-[#c5a46d] hover:text-white transition-all duration-300 flex items-center gap-2">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             Book Free Consultation
//           </button>
//         </div>

//         {/* Trust Indicators */}
//         <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-[#c5a46d]/20">
//           <div className="flex items-center gap-3">
//             <svg className="w-6 h-6 text-[#c5a46d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//             </svg>
//             <span className="text-sm text-gray-600">ISO Certified</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <svg className="w-6 h-6 text-[#c5a46d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span className="text-sm text-gray-600">10+ Years Experience</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <svg className="w-6 h-6 text-[#c5a46d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//             </svg>
//             <span className="text-sm text-gray-600">Global Network</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





import React from "react";
import { Link } from "react-router-dom"; // Remove Navigate if not needed

export default function AboutEduorbix() {
  return (
    <section className="min-h-screen py-16 px-4 flex items-center relative overflow-hidden">
      {/* Modern Abstract Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#c5a46d]/[0.02]"></div>
        <svg className="absolute top-0 right-0 w-96 h-96 text-[#c5a46d]/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M47.1,-57.2C60.1,-47.1,69.4,-31.1,73.2,-13.5C77,4.2,75.3,23.6,66.1,39.3C56.9,55,40.2,67,21.7,72.6C3.2,78.2,-17,77.4,-34.6,69.1C-52.2,60.8,-67.1,45,-74.1,26.5C-81.1,8,-80.1,-13.2,-71.1,-31.1C-62.1,-49,-45.1,-63.6,-27.1,-70.8C-9.1,-78,9.9,-77.8,26.4,-69.8C42.9,-61.8,56.9,-46.2,47.1,-57.2Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-80 h-80 text-[#c5a46d]/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M42.5,-52.2C53.8,-42.7,60.7,-27.4,63.2,-11.1C65.7,5.2,63.9,22.6,55.3,36.8C46.7,51,31.3,62,13.6,67.4C-4.1,72.8,-24.1,72.6,-40.1,64.5C-56.1,56.4,-68.1,40.4,-73.6,22C-79.1,3.6,-78.1,-17.1,-68.8,-33.8C-59.5,-50.5,-41.9,-63.2,-23.7,-68.1C-5.5,-73,13.3,-70.1,28.8,-61.2C44.3,-52.3,56.5,-37.3,42.5,-52.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="max-w-1xl mx-auto relative">
        {/* Header with decorative line */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#c5a46d]/30"></div>
            <span className="text-[#c5a46d] uppercase tracking-[0.3em] text-sm font-semibold">
              About Us
            </span>
            <div className="h-px w-12 bg-[#c5a46d]/30"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#1e2a38] mb-6">
            About <span className="text-[#c5a46d] relative inline-block">Eduorbix
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 120 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6C32.5 2 87.5 2 118 6" stroke="#c5a46d" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column - Main Message */}
          <div className="space-y-6">
            {/* Primary Statement */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-[#c5a46d]/10 group">
              <div className="w-12 h-12 bg-[#c5a46d] rounded-xl mb-6 group-hover:rotate-6 transition-transform"></div>
              <p className="text-xl text-gray-700 leading-relaxed">
                <span className="text-1xl font-bold text-[#c5a46d]">Eduorbix</span> 
                <span className="block mt-2">is a professional education consultancy platform dedicated to helping students secure admission in reputed colleges and universities across India and globally.</span>
              </p>
            </div>

            {/* Process Pills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-[#c5a46d]/10">
              <h3 className="text-sm uppercase tracking-wider text-[#c5a46d] font-semibold mb-4">Our Process</h3>
              <div className="flex flex-wrap gap-3">
                {["Course Selection", "Profile Evaluation", "Documentation", "Applications", "Scholarships", "Visa Guidance"].map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-[#f8f7f3] rounded-full text-sm text-gray-600 border border-[#c5a46d]/20 hover:bg-[#c5a46d] hover:text-white transition-all duration-300 cursor-default">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mt-6 leading-relaxed">
                We simplify the entire admission journey — from course selection and profile evaluation to documentation, applications, scholarships, and visa guidance.
              </p>
            </div>
          </div>

          {/* Right Column - Visual & Quote */}
          <div className="space-y-6">
            {/* Image Placeholder / Visual Block */}
            <div className="bg-gradient-to-br from-[#1e2a38] to-[#2c3a4a] rounded-3xl p-8 h-64 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 20L80 80M80 20L20 80" stroke="white" strokeWidth="2"/>
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <div className="relative z-10 h-full flex items-end">
                <div>
                  <p className="text-white/60 text-sm mb-2">Global Reach</p>
                  <h4 className="text-white text-3xl font-light">India +</h4>
                  <h4 className="text-[#c5a46d] text-4xl font-bold">Abroad</h4>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#c5a46d]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform"></div>
            </div>

            {/* Testimonial/Quote Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#c5a46d]/10 relative">
              <svg className="absolute top-6 right-6 w-12 h-12 text-[#c5a46d]/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-600 text-lg italic leading-relaxed mb-6">
                "Whether you are planning to study in India or abroad, Eduorbix ensures a smooth, transparent, and result-oriented process."
              </p>
              
              {/* Promise Badges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c5a46d]"></div>
                  <span className="text-sm text-gray-600">Smooth Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c5a46d]"></div>
                  <span className="text-sm text-gray-600">100% Transparent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c5a46d]"></div>
                  <span className="text-sm text-gray-600">Result Oriented</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - FIXED BUTTON */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-[#c5a46d]/10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#c5a46d]/20 border-2 border-white flex items-center justify-center text-[#c5a46d] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-600">Trusted by 5000+ students</span>
          </div>
          
          <Link 
            to="/about-us" 
            className="group flex items-center gap-3 px-6 py-3 bg-[#1e2a38] text-white rounded-full hover:bg-[#c5a46d] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>About More</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#c5a46d]/20 rounded-full animate-pulse hidden xl:block"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-[#c5a46d]/20 rounded-full animate-pulse delay-1000 hidden xl:block"></div>
      </div>
    </section>
  );
}