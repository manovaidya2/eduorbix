import React from 'react';
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