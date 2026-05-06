import React from 'react';
import { Helmet } from "react-helmet-async";

import ServicesHero from '../services/ServicesHero';
import ServicesList from '../services/ServicesList';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Education Services | Study Abroad & Admission Support | EduOrbix</title>

        <meta
          name="description"
          content="Explore EduOrbix education services including study abroad guidance, study in India support, university admissions, scholarships, visa guidance, and career counselling."
        />

        <meta
          name="keywords"
          content="EduOrbix services, study abroad services, university admission support, scholarship assistance, student visa guidance, career counselling, education consultancy"
        />

        <meta name="author" content="EduOrbix" />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://eduorbix.com/services" />

        <meta
          property="og:title"
          content="Education Services | EduOrbix"
        />

        <meta
          property="og:description"
          content="Study abroad guidance, admissions, scholarships, visa support, and student counselling services."
        />

        <meta property="og:url" content="https://eduorbix.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://eduorbix.com/favicon.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EduOrbix Education Services" />
        <meta
          name="twitter:description"
          content="Complete support for admissions, scholarships, visas, and study abroad guidance."
        />
        <meta name="twitter:image" content="https://eduorbix.com/favicon.png" />
      </Helmet>

      <ServicesHero />
      <ServicesList />
    </>
  );
}