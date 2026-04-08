import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import AdminAddBlog from "./pages/AdminAddBlog";
import AdminAddCaseStudy from "./pages/AdminAddCaseStudy";
import AdminAppointments from "./pages/AdminAppointments";
import EditBlog from "./pages/EditBlog";
import BlogList from "./pages/BlogList";
import CaseStudiesList from "./pages/CaseStudiesList";
import EditCaseStudy from "./pages/CaseStudyEdit";
import CaseStudyEdit from "./pages/CaseStudyEdit";
import AdminStudyIndiaProgram from "./pages/AdminStudyIndiaProgram";
import AdminStudyIndiaPrograms from "./pages/AdminStudyIndiaDashboard";
import EditStudyIndiaProgram from "./pages/EditStudyIndiaProgram";
import AdminDestinations from "./studyabroad/AdminDestinations";
import AdminStudyAbroadDashboard from "./studyabroad/AdminStudyAbroadDashboard";
import EditStudyAbroad from "./studyabroad/EditStudyAbroad";
import AdminUniversity from "./university/AdminUniversity";
import BlogAdmin from "./blog/BlogAdmin";
import AdminDashboard from "./blog/AdminDashboard";
import AdminEditBlog from "./blog/AdminEditBlog";
import ContactAdminDashboard from "./contact/ContactAdminDashboard";
import ApplicationAdminDashboard from "./application/ApplicationAdminDashboard";
import AdminAgentDashboard from "./pages/AdminAgentDashboard";
import AdminPartnerDashboard from "./pages/AdminPartnerDashboard";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/add-blog" element={<Layout><AdminAddBlog /></Layout>} />
          <Route path="/add-casestudy" element={<Layout><AdminAddCaseStudy /></Layout>} />
          <Route path="/appointments" element={<Layout><AdminAppointments /></Layout>} />
          <Route path="/blogs/edit/:id" element={<Layout><EditBlog/></Layout>} />
          <Route path="/blog-list" element={<Layout><BlogList /></Layout>} />
           <Route path="/case-studies" element={<Layout><CaseStudiesList /></Layout>} />
 <Route path="/case-studies/edit/:id" element={<Layout><CaseStudyEdit /></Layout>} />


 
  <Route path="/study-india-program" element={<Layout><AdminStudyIndiaProgram /></Layout>} />
    <Route path="/study-india-dashboard" element={<Layout><AdminStudyIndiaPrograms /></Layout>} />
    <Route path="/admin/study-india-programs/edit/:id" element={<Layout><EditStudyIndiaProgram /></Layout>} />
    <Route path="/admin-destinations" element={<Layout><AdminDestinations /></Layout>} />
    <Route path="/admin-study-abroad" element={<Layout><AdminStudyAbroadDashboard /></Layout>} />
    <Route path="/admin/study-abroad/edit/:id" element={<Layout><EditStudyAbroad /></Layout>} />
    <Route path="/admin-universities" element={<Layout><AdminUniversity /></Layout>} />
    <Route path="/admin-blogs" element={<Layout><BlogAdmin /></Layout>} />
    <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
    <Route path="/admin/edit-blog/:id" element={<Layout><AdminEditBlog /></Layout>} />
    <Route path="/admin-contact" element={<Layout><ContactAdminDashboard /></Layout>} />
    <Route path="/admin-applications" element={<Layout><ApplicationAdminDashboard /></Layout>} />
    <Route  path="/agent-dashboard" element={<Layout><AdminAgentDashboard /></Layout>} />
    <Route path="/partner-dashboard" element={<Layout><AdminPartnerDashboard /></Layout>} />



          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      {/* Move ToastContainer **outside Router** so it always exists */}
      
    </>
  );
}

export default App;
