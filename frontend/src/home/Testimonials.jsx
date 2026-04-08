import { FaStar } from "react-icons/fa";
import React from "react";

export default function Testimonials() {
  const data = [
    {
      name: "Rohan Sharma",
      initials: "RS",
      course: "MBA — IIM Lucknow",
      text: "Eduorbix helped me secure admission in a top MBA college with scholarship support. Their counsellors were incredibly knowledgeable and patient.",
    },
    {
      name: "Anjali Mehta",
      initials: "AM",
      course: "MSc — University of Manchester, UK",
      text: "The visa assistance team made my UK study process smooth and stress-free. I couldn't have done it without Eduorbix's expert guidance.",
    },
    {
      name: "Priya Singh",
      initials: "PS",
      course: "B.Tech — VIT Vellore",
      text: "From shortlisting universities to completing applications, Eduorbix handled everything professionally. Highly recommended for all students!",
    },
  ];

  return (
    <section className="bg-[#f8f7f3] py-10 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[#c5a46d] tracking-widest text-sm font-semibold uppercase mb-2">
          Testimonials
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-[#1e2a38] mb-3">
          Student <span className="text-[#c5a46d]">Success Stories</span>
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto mb-12">
          Hear from students who achieved their dreams with Eduorbix.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 text-left relative"
            >
              {/* Stars */}
              <div className="flex text-[#c5a46d] mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="mr-1" />
                ))}
              </div>

              {/* Quote */}
              <div className="absolute top-6 right-6 text-[#e9e1d2] text-5xl font-serif">
                “ ”
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{item.text}"
              </p>

              <div className="border-t pt-4 flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f4ead7] text-[#c5a46d] font-semibold">
                  {item.initials}
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-semibold text-[#1e2a38] text-sm">
                    {item.name}
                  </h4>
                  <p className="text-[#c5a46d] text-xs">
                    {item.course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
