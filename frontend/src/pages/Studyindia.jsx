import React from 'react';
import { Helmet } from "react-helmet-async";

import StudyInIndia from '../studyindia/StudyInIndia';
import WhatWeDo from '../studyindia/WhatWeDo';
import PopularPrograms from '../studyindia/PopularPrograms';
import ApplySection from '../studyindia/ApplySection';

export default function Studyindia() {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>
          Study in India | Top Universities & Admission Guidance | EduOrbix
        </title>

        {/* DESCRIPTION */}
        <meta
          name="description"
          content="Explore top colleges and universities in India with EduOrbix. Get admission guidance, career counselling, scholarships, and support for studying in India."
        />

        {/* KEYWORDS */}
        <meta
          name="keywords"
          content="study in India, Indian universities, college admissions India, higher education India, scholarships India, EduOrbix"
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
          href="https://eduorbix.com/study-in-india"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Study in India | EduOrbix"
        />

        <meta
          property="og:description"
          content="Find the best universities and colleges in India with complete admission support from EduOrbix."
        />

        <meta
          property="og:url"
          content="https://eduorbix.com/study-in-india"
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
          content="Study in India | EduOrbix"
        />

        <meta
          name="twitter:description"
          content="Admissions, scholarships, and guidance for studying in India."
        />

        <meta
          name="twitter:image"
          content="https://eduorbix.com/favicon.png"
        />
      </Helmet>

      <StudyInIndia />
      <WhatWeDo />
      <PopularPrograms />
      <ApplySection />
    </>
  );
}