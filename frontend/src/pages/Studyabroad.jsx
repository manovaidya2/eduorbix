import React from 'react';
import { Helmet } from "react-helmet-async";

import StudyInAbroad from '../studyabroad/StudyInabroad';
import WhatWeDo from '../studyabroad/WhatWeDo';
import TopDestinations from '../studyabroad/TopDestinations';

export default function Studyabroad() {
  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>
          Study Abroad | Global University Admissions | EduOrbix
        </title>

        {/* DESCRIPTION */}
        <meta
          name="description"
          content="Study abroad with EduOrbix. Get expert guidance for admissions, scholarships, visas, and top universities in the UK, USA, Canada, Australia, Europe, and more."
        />

        {/* KEYWORDS */}
        <meta
          name="keywords"
          content="study abroad, overseas education, international universities, student visa, scholarships abroad, UK study, Canada study, USA universities, EduOrbix"
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
          href="https://eduorbix.com/study-abroad"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Study Abroad | EduOrbix"
        />

        <meta
          property="og:description"
          content="Explore global study destinations with admissions, scholarships, and visa support from EduOrbix."
        />

        <meta
          property="og:url"
          content="https://eduorbix.com/study-abroad"
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
          content="Study Abroad | EduOrbix"
        />

        <meta
          name="twitter:description"
          content="Admissions, scholarships, and visa guidance for studying abroad."
        />

        <meta
          name="twitter:image"
          content="https://eduorbix.com/favicon.png"
        />
      </Helmet>

      <StudyInAbroad />
      <WhatWeDo />
      <TopDestinations />
    </>
  );
}