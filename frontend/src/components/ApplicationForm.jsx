import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { User, GraduationCap, Globe } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

const courses = [
  "Engineering - B.Tech / M.Tech / BE / UG/PG",
  "Management - MBA / BBA / PGDM / UG",
  "Medical - MBBS / BDS / BAMS / UG/PG",
  "Law - LLB / LLM / BA LLB / UG/PG",
  "Commerce - B.Com / M.Com / CA / UG/PG",
  "Science - B.Sc / M.Sc / BS / UG/PG",
  "Arts - BA / MA / BFA / UG/PG",
  "IT & Computer Science - BCA / MCA / B.Sc IT / UG/PG",
  "Design - B.Des / M.Des / UG/PG",
  "Hospitality - BHM / MHM / UG",
  "Aviation - B.Sc Aviation / Pilot Training",
  "Doctoral - PhD Programs / All disciplines",
];

const qualifications = [
  "10th",
  "12th",
  "Diploma",
  "Graduate",
  "Post Graduate",
];

const countries = [
  "India",
  "UK",
  "USA",
  "Canada",
  "Australia",
  "Germany",
];

const budgets = [
  "Below 5 Lakhs",
  "5 - 10 Lakhs",
  "10 - 20 Lakhs",
  "20+ Lakhs",
];

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    course: "",
    country: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.name && formData.phone && formData.email;
    }
    if (step === 2) {
      return formData.qualification && formData.course;
    }
    if (step === 3) {
      return formData.country && formData.budget;
    }
    return false;
  };

  const next = () => {
    if (isStepValid()) setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isStepValid()) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/applications", formData);
      
      if (response.data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          qualification: "",
          course: "",
          country: "",
          budget: "",
          message: "",
        });
        setStep(1);
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setError(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setError(error.response?.data?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <>
        <Helmet>
          <title>Application Submitted Successfully | Admission Application Received</title>
          <meta name="robots" content="noindex, follow" />
          <meta name="description" content="Your admission application has been submitted successfully. Our team will contact you within 24-48 hours regarding your course admission." />
        </Helmet>
        <section className="bg-[#f3f3f3] min-h-screen pb-20">
          <div className="bg-[#243b6b] text-center py-16 text-white">
            <p className="text-sm tracking-widest text-yellow-400 mb-2">
              APPLICATION SUBMITTED
            </p>
            <h1 className="text-4xl font-semibold">
              Thank You for <span className="text-yellow-400">Applying!</span>
            </h1>
            <p className="text-gray-200 mt-2">
              Our team will contact you within 24-48 hours.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
            <p className="text-gray-600 mb-6">We'll get back to you shortly.</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="bg-yellow-400 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              Submit Another Application
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Admission Application Form 2025-26 | Apply for Courses Online</title>
        <meta name="title" content="Admission Application Form 2025-26 | Apply for Courses Online" />
        <meta name="description" content="Fill out our online admission application form for Engineering, Medical, Management, Law, and more. Easy 3-step process. Apply now for 2025-26 admissions." />
        <meta name="keywords" content="admission application, online application form, course admission, college admission, engineering admission, medical admission, mba admission, law admission, study abroad application, education counseling" />
        <meta name="author" content="Your Institute Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com/application-form" />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/application-form" />
        <meta property="og:title" content="Admission Application Form 2025-26 | Apply for Courses Online" />
        <meta property="og:description" content="Fill out our online admission application form for Engineering, Medical, Management, Law, and more. Easy 3-step process. Apply now for 2025-26 admissions." />
        <meta property="og:image" content="https://yourdomain.com/images/application-form-og.jpg" />
        <meta property="og:site_name" content="Your Institute Name" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://yourdomain.com/application-form" />
        <meta name="twitter:title" content="Admission Application Form 2025-26 | Apply for Courses Online" />
        <meta name="twitter:description" content="Fill out our online admission application form for Engineering, Medical, Management, Law, and more. Easy 3-step process. Apply now for 2025-26 admissions." />
        <meta name="twitter:image" content="https://yourdomain.com/images/application-form-twitter.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Your City" />
        <meta name="geo.position" content="latitude;longitude" />
        <meta name="ICBM" content="latitude, longitude" />
        
        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Admission Application Form",
            "description": "Online admission application form for various courses including Engineering, Medical, Management, Law, and more.",
            "publisher": {
              "@type": "EducationalOrganization",
              "name": "Your Institute Name",
              "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/images/logo.png"
              }
            },
            "mainEntity": {
              "@type": "WebApplication",
              "name": "Admission Application Form",
              "description": "3-step online application process for course admissions",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              }
            }
          })}
        </script>
      </Helmet>
      
      <section className="bg-[#f3f3f3] min-h-screen pb-20">
        {/* Header */}
        <div className="bg-[#243b6b] text-center py-16 text-white">
          <p className="text-sm tracking-widest text-yellow-400 mb-2">
            GET STARTED
          </p>
          <h1 className="text-4xl font-semibold">
            Start Your <span className="text-yellow-400">Application</span>
          </h1>
          <p className="text-gray-200 mt-2">
            Complete the steps below to begin your admission journey.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-3xl mx-auto mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        )}

        {/* Stepper */}
        <div className="max-w-3xl mx-auto -mt-10 bg-white rounded-xl shadow p-4 flex justify-between items-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  step === s
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {s === 1 && <User size={18} />}
                {s === 2 && <GraduationCap size={18} />}
                {s === 3 && <Globe size={18} />}
              </div>
              <div className="text-sm">
                <p className="text-gray-400">Step {s}</p>
                <p
                  className={`font-medium ${
                    step === s ? "text-black" : "text-gray-400"
                  }`}
                >
                  {s === 1 && "Personal Details"}
                  {s === 2 && "Academic Info"}
                  {s === 3 && "Preferences"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl shadow p-8">
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your full name" 
                  className="w-full border rounded-lg px-4 py-3 mb-4"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+91 XXXXXXXXXX" 
                    className="border rounded-lg px-4 py-3"
                    required
                  />
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="your@email.com" 
                    type="email"
                    className="border rounded-lg px-4 py-3"
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Academic Information</h2>
                <select 
                  name="qualification" 
                  value={formData.qualification} 
                  onChange={handleChange} 
                  className="w-full border rounded-lg px-4 py-3 mb-4"
                  required
                >
                  <option value="">Select your qualification</option>
                  {qualifications.map((q, i) => (
                    <option key={i}>{q}</option>
                  ))}
                </select>

                <select 
                  name="course" 
                  value={formData.course} 
                  onChange={handleChange} 
                  className="w-full border rounded-lg px-4 py-3"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
                <select 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange} 
                  className="w-full border rounded-lg px-4 py-3 mb-4"
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((c, i) => (
                    <option key={i}>{c}</option>
                  ))}
                </select>

                <select 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange} 
                  className="w-full border rounded-lg px-4 py-3 mb-4"
                  required
                >
                  <option value="">Select budget</option>
                  {budgets.map((b, i) => (
                    <option key={i}>{b}</option>
                  ))}
                </select>

                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Tell us more about your goals..." 
                  className="w-full border rounded-lg px-4 py-3"
                  rows="4"
                />
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button 
                  type="button"
                  onClick={back} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!isStepValid()}
                  className={`px-6 py-2 rounded-lg ${
                    isStepValid()
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !isStepValid()}
                  className={`px-6 py-2 rounded-lg ${
                    loading || !isStepValid()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}