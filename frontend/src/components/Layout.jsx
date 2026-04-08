import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout({ children }) {
  return (
    <>
      {/* Scroll Top */}
      <ScrollToTop />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-[65px] sm:pt-[75px] md:pt-[105px] min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}