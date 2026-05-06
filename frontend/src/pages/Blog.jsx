import React from 'react';
import { Helmet } from "react-helmet-async";

import BlogPage from '../blog/BlogPage';

export default function Blog() {
  return (
    <>
      <Helmet>
        {/* Title */}
        <title>
          Education Blogs & Study Abroad Guides | EduOrbix
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Read the latest education blogs, study abroad guides, scholarship updates, visa tips, university admission advice, and career counselling insights from EduOrbix."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="study abroad blogs, education blogs, scholarship guide, student visa tips, university admission blogs, overseas education, EduOrbix blogs"
        />

        {/* Author */}
        <meta name="author" content="EduOrbix" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://eduorbix.com/blogs"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Education Blogs & Study Abroad Guides | EduOrbix"
        />

        <meta
          property="og:description"
          content="Explore study abroad tips, scholarships, admissions, visa guidance, and education updates."
        />

        <meta
          property="og:url"
          content="https://eduorbix.com/blogs"
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
          content="EduOrbix Education Blogs"
        />

        <meta
          name="twitter:description"
          content="Latest education updates, study abroad guidance, scholarships, and admission tips."
        />

        <meta
          name="twitter:image"
          content="https://eduorbix.com/favicon.png"
        />
      </Helmet>

      <BlogPage />
    </>
  );
}