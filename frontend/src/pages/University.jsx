import React from 'react';
import { Helmet } from "react-helmet-async";

import PartnerUniversities from '../university/PartnerUniversities';
import Universitylist from '../university/Universitylist';

export default function University() {
  return (
    <>
      <Helmet>
        <title>
          Top Universities & Global Education Partners | EduOrbix
        </title>

        <meta
          name="description"
          content="Explore top universities and global education partners with EduOrbix. Find the best universities for study abroad, admissions, scholarships, and international education opportunities."
        />

        <meta
          name="keywords"
          content="top universities, partner universities, study abroad universities, international universities, global education partners, university admission, EduOrbix"
        />

        <meta name="author" content="EduOrbix" />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://eduorbix.com/universities"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Top Universities & Global Education Partners | EduOrbix"
        />

        <meta
          property="og:description"
          content="Discover leading universities and global academic partners for your study abroad journey."
        />

        <meta
          property="og:url"
          content="https://eduorbix.com/universities"
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
          content="EduOrbix Partner Universities"
        />

        <meta
          name="twitter:description"
          content="Explore top universities and international education opportunities with EduOrbix."
        />

        <meta
          name="twitter:image"
          content="https://eduorbix.com/favicon.png"
        />
      </Helmet>

      <PartnerUniversities />
      <Universitylist />
    </>
  );
}