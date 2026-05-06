import React from 'react';
import { Helmet } from "react-helmet-async";

import Hero from '../home/Hero';
import Services from '../home/Services';
import Programs from '../home/Programs';
import StudyDestinations from '../home/StudyDestinations';
import WhyChoose from '../home/WhyChoose';
import Testimonials from '../home/Testimonials';
import CTASection from '../home/CTASection';
import AboutEduorbix from '../home/AboutEduorbix';

export default function Homepage() {
  return (
    <>
      <Helmet>
        {/* Title */}
        <title>
          EduOrbix | Study Abroad & Study in India Consultants
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="EduOrbix helps students with Study Abroad, Study in India, Scholarships, Visa Guidance, Career Counselling, and University Admissions."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="EduOrbix, Study Abroad, Study in India, Overseas Education, Scholarships, Student Visa, University Admission, Career Counselling, Education Consultant"
        />

        {/* Author */}
        <meta name="author" content="EduOrbix" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://eduorbix.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="EduOrbix | Study Abroad & Study in India Consultants"
        />

        <meta
          property="og:description"
          content="Apply to top universities in India & Abroad with EduOrbix."
        />

        <meta
          property="og:url"
          content="https://eduorbix.com/"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="https://eduorbix.com/favicon.png"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="EduOrbix | Study Abroad & Study in India"
        />

        <meta
          name="twitter:description"
          content="Admissions, Scholarships & Visa Guidance with EduOrbix."
        />

        <meta
          name="twitter:image"
          content="https://eduorbix.com/favicon.png"
        />
      </Helmet>

      <Hero />
      <AboutEduorbix />
      <Services />
      <Programs />
      <StudyDestinations />
      <WhyChoose />
      <Testimonials />
      <CTASection />
    </>
  );
}