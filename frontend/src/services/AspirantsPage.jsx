import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, MessageCircle, Target } from "lucide-react";

export default function AspirantsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#c5a46d] hover:underline mb-6">
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Aspirants Community</h1>
        <p className="text-gray-600 mb-8">Join a community of ambitious students aiming to study abroad.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <MessageCircle className="text-[#c5a46d] mb-3" size={28} />
            <h3 className="text-xl font-semibold mb-2">Connect with Peers</h3>
            <p className="text-gray-600">Share experiences, ask questions, and grow together.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <Target className="text-[#c5a46d] mb-3" size={28} />
            <h3 className="text-xl font-semibold mb-2">Mentorship Program</h3>
            <p className="text-gray-600">Get guidance from successful study abroad alumni.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <Users className="text-[#c5a46d] mb-3" size={28} />
            <h3 className="text-xl font-semibold mb-2">Exclusive Webinars</h3>
            <p className="text-gray-600">Attend sessions with university representatives.</p>
          </div>
        </div>
      </div>
    </div>
  );
}