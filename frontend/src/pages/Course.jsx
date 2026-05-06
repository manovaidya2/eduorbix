import React from 'react';
import { Helmet } from "react-helmet-async";

import ProgramsHeroSection from '../course/ProgramsHeroSection';
import CourseCategoryCard from '../course/CoursesSection';

export default function Course() {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>
          Courses & Programs | Study Abroad Courses | EduOrbix
        </title>

        {/* DESCRIPTION */}
        <meta
          name="description"
          content="Explore top courses and academic programs with EduOrbix. Find undergraduate, postgraduate, diploma, MBA, engineering, medical, and international study programs."
        />

        {/* KEYWORDS */}
        <meta
          name="keywords"
          content="study abroad courses, university programs, MBA abroad, engineering courses, medical courses, diploma programs, undergraduate courses, EduOrbix"
        />

        {/* AUTHOR */}
        <meta
          name="author"
          content="EduOrbix"
        />

        {/* ROBOTS */}
        <meta
          name="robots"
          content="index, follow"
        />

        {/* CANONICAL */}
        <link
          rel="canonical"
          href="https://eduorbix.com/courses"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Courses & Programs | EduOrbix"
        />

        <meta
          property="og:description"
          content="Explore top academic programs and international study courses with EduOrbix."
        />

        <meta
          property="og:url"
          content="https://eduorbix.com/courses"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="https://eduorbix.com/favicon.png"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Courses & Programs | EduOrbix"
        />

        <meta
          name="twitter:description"
          content="Find top university programs and study abroad courses with EduOrbix."
        />

        <meta
          name="twitter:image"
          content="https://eduorbix.com/favicon.png"
        />
      </Helmet>

      <ProgramsHeroSection />
      <CourseCategoryCard />
    </>
  );
}