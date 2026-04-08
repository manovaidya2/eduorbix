import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar component handles its own positioning and sidebar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main 
        className={`
          transition-all duration-300
          ${!isMobile ? 'md:ml-64' : ''}
pt-14 md:pt-1       
   px-4 md:px-6
          pb-8
        `}
      >
        {/* Content Container with proper spacing */}
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;