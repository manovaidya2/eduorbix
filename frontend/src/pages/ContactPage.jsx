import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

import axiosInstance from '../api/axiosInstance';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    type: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (formStatus.message) {
      setFormStatus({
        type: '',
        message: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    const emailRegex =
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        '/contact',
        formData
      );

      if (response.data.success) {
        setFormStatus({
          type: 'success',
          message:
            response.data.message ||
            "Message sent successfully! We'll get back to you soon."
        });

        setSubmitted(true);

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });

        setTimeout(() => {
          setSubmitted(false);

          setFormStatus({
            type: '',
            message: ''
          });
        }, 5000);
      } else {
        setFormStatus({
          type: 'error',
          message:
            response.data.message ||
            'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error(
        'Error submitting contact form:',
        error
      );

      setFormStatus({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Network error. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const socialLinks = [
    {
      icon: <Facebook size={18} />,
      href: 'https://facebook.com',
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700'
    },
    {
      icon: <Twitter size={18} />,
      href: 'https://twitter.com',
      bg: 'bg-sky-500',
      hover: 'hover:bg-sky-600'
    },
    {
      icon: <Linkedin size={18} />,
      href: 'https://linkedin.com',
      bg: 'bg-blue-700',
      hover: 'hover:bg-blue-800'
    },
    {
      icon: <Instagram size={18} />,
      href: 'https://instagram.com',
      bg: 'bg-pink-600',
      hover: 'hover:bg-pink-700'
    }
  ];

  const faqs = [
    {
      q: 'How quickly do you respond?',
      a: 'We typically respond within 2-4 hours during business hours.'
    },
    {
      q: 'Do you provide online counseling?',
      a: 'Yes, we offer online and offline consultation support.'
    },
    {
      q: 'Is there any consultation fee?',
      a: 'Initial consultation is completely free.'
    },
    {
      q: 'Which countries do you cover?',
      a: 'We cover UK, USA, Canada, Australia, Europe and UAE.'
    },
    {
      q: 'Do you help with visa applications?',
      a: 'Yes, we provide complete visa guidance and support.'
    }
  ];

  return (
    <>
      <Helmet>
        {/* TITLE */}
        <title>
          Contact EduGlobe | Study Abroad Consultants UAE
        </title>

        {/* META DESCRIPTION */}
        <meta
          name="description"
          content="Contact EduGlobe Services FZ-LLC for Study Abroad, Scholarships, University Admissions, Student Visa Guidance, and Career Counselling."
        />

        {/* KEYWORDS */}
        <meta
          name="keywords"
          content="EduGlobe contact, study abroad UAE, student visa support, scholarships, university admission, Dubai education consultant"
        />

        {/* AUTHOR */}
        <meta
          name="author"
          content="EduGlobe Services FZ-LLC"
        />

        {/* ROBOTS */}
        <meta
          name="robots"
          content="index, follow"
        />

        {/* CANONICAL */}
        <link
          rel="canonical"
          href="https://eduglobe.ae/contact"
        />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Contact EduGlobe UAE"
        />

        <meta
          property="og:description"
          content="Reach EduGlobe for study abroad admissions, scholarships and visa assistance."
        />

        <meta
          property="og:url"
          content="https://eduglobe.ae/contact"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="https://eduglobe.ae/favicon.png"
        />

        {/* TWITTER */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Contact EduGlobe UAE"
        />

        <meta
          name="twitter:description"
          content="Admissions, Scholarships & Student Visa Guidance."
        />

        <meta
          name="twitter:image"
          content="https://eduglobe.ae/favicon.png"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-x-hidden">

        {/* HERO */}
        <div className="relative bg-[#0b2a4a] text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

            <div className="text-center max-w-3xl mx-auto">

              <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Available 24/7 for you
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Reach Out
                <span className="text-[#c5a46d] block mt-2">
                  Get in Touch
                </span>
              </h1>

              <p className="text-lg text-gray-200">
                We'd love to hear from you. Reach out anytime.
              </p>

            </div>

          </div>
        </div>

        {/* CONTACT SECTION */}
        <div
          id="contact-form"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT */}
            <div className="space-y-8">

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-5">

                  <div className="flex gap-4">
                    <Phone className="text-[#c5a46d]" />
                    <div>
                      <h4 className="font-semibold">
                        Phone
                      </h4>
                      <p className="text-gray-600">
                        +971 528313726
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="text-[#c5a46d]" />
                    <div>
                      <h4 className="font-semibold">
                        Email
                      </h4>
                      <p className="text-gray-600">
                        business@eduglobe.ae
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin className="text-[#c5a46d]" />
                    <div>
                      <h4 className="font-semibold">
                        Office
                      </h4>
                      <p className="text-gray-600">
                        Dubai, UAE
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Clock className="text-[#c5a46d]" />
                    <div>
                      <h4 className="font-semibold">
                        Timing
                      </h4>
                      <p className="text-gray-600">
                        Mon - Sat : 9AM - 7PM
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* SOCIAL */}
              <div className="bg-[#0b2a4a] rounded-3xl p-8 text-white">

                <h3 className="text-2xl font-bold mb-4">
                  Connect With Us
                </h3>

                <div className="flex gap-3">

                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.bg} ${social.hover} w-12 h-12 rounded-xl flex items-center justify-center transition`}
                    >
                      {social.icon}
                    </a>
                  ))}

                </div>

              </div>

            </div>

            {/* RIGHT FORM */}
            <div className="bg-white rounded-3xl shadow-xl p-8">

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {formStatus.message && (
                <div
                  className={`mb-5 p-4 rounded-xl flex items-center gap-3 ${
                    formStatus.type === 'success'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  {formStatus.type === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}

                  <span>{formStatus.message}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>
                  <label className="font-medium text-sm">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b2a4a]"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b2a4a]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b2a4a]"
                    placeholder="+971 XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm">
                    Message
                  </label>

                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-2 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0b2a4a] resize-none"
                    placeholder="Write your message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#c5a46d] hover:bg-[#b8945d] text-white py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>

        {/* FAQ */}
        <div className="bg-white py-16 border-t border-gray-100">

          <div className="max-w-4xl mx-auto px-4">

            <div className="text-center mb-12">

              <h2 className="text-4xl font-bold text-gray-900">
                Frequently Asked
                <span className="text-[#c5a46d]">
                  {' '}Questions
                </span>
              </h2>

            </div>

            <div className="space-y-4">

              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >

                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >

                    <span className="font-semibold">
                      {faq.q}
                    </span>

                    <ChevronDown
                      className={`transition-transform ${
                        openFaq === index
                          ? 'rotate-180'
                          : ''
                      }`}
                    />

                  </button>

                  {openFaq === index && (
                    <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ContactPage;