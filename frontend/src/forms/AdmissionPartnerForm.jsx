// import React from "react";
// import "../styles/Institution.css";
// import { useState } from "react";
// import axiosInstance from "../api/axiosInstance";

// export default function AdmissionPartnerForm() {
//   const [formData, setFormData] = useState({
//     // Representative Information
//     representativeName: "",
//     fathersName: "",
//     mothersName: "",
//     dateOfBirth: "",
//     gender: "",
//     nationality: "",
//     roleInOrganisation: "",
//     educationQualification: "",

//     // Organisation Information
//     organisationName: "",
//     yearOfEstablishment: "",
//     mobileNumber: "",
//     email: "",
//     organisationAddress: "",
//     organisationZipCode: "",
//     representativeAddress: "",
//     representativeZipCode: "",
//     organisationType: "",

//     // Industry Experience
//     institutionsConnected: "",
//     achievementsAwards: "",

//     // Experience in Research Education
//     totalStudentsEnrolled: "",
//     totalResearchPapers: "",
//     fieldsOfResearch: "",
//     researchGuideDetails: "",

//     // Documents
//     documents: [],

//     // Section A: Institution Profile
//     institutionDescription: [],
//     corePhilosophy: "",
//     studentProfiles: [],

//     // Section B: Experience with PhD Aspirants
//     phdGuidanceFrequency: "",
//     phdServices: [],
//     phdAspirantsVolume: "",

//     // Section C: Observed Student Challenges
//     phdChallenges: [],
//     discontinuationWitnessed: "",
//     missingElements: [],

//     // Section D: Ethical Alignment
//     ethicalBelief: "",
//     referralComfort: "",
//     recommendationFactors: [],

//     // Section E: Collaboration Expectations
//     collaborationInterests: [],
//     collaborationRole: "",
//     collaborationApproach: "",

//     // Section F: Readiness & Quality Filter
//     willingnessToDiscourage: "",
//     incentivePreference: "",

//     // Section G: Open Reflection
//     phdAdmissionGap: "",
//     idealPhdSystem: "",

//     // Section H: Declaration & Consent
//     declarationAgreed: false,
//     informationCertified: false,
//     rulesAgreed: false,
//   });

//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   // Handle text/select inputs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle checkbox inputs for array fields
//   const handleCheckboxChange = (e, field) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => {
//       const currentArray = prev[field] || [];
//       if (checked) {
//         return {
//           ...prev,
//           [field]: [...currentArray, value],
//         };
//       } else {
//         return {
//           ...prev,
//           [field]: currentArray.filter((item) => item !== value),
//         };
//       }
//     });
//   };

//   // Handle radio button inputs
//   const handleRadioChange = (e, field) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     // Filter only PDF files
//     const pdfFiles = selectedFiles.filter(
//       (file) => file.type === "application/pdf"
//     );
    
//     if (pdfFiles.length !== selectedFiles.length) {
//       alert("Only PDF files are allowed. Non-PDF files have been removed.");
//     }
    
//     setFiles(pdfFiles);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate required fields
//     if (!formData.declarationAgreed || !formData.informationCertified || !formData.rulesAgreed) {
//       alert("Please agree to all declarations and consent statements.");
//       return;
//     }

//     if (files.length === 0) {
//       alert("Please upload at least one document.");
//       return;
//     }

//     setLoading(true);
//     setSubmitStatus(null);

//     try {
//       const formDataToSend = new FormData();
      
//       // Append all form data
//       Object.keys(formData).forEach((key) => {
//         if (Array.isArray(formData[key])) {
//           // Stringify array fields
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });

//       // Append files
//       files.forEach((file) => {
//         formDataToSend.append("documents", file);
//       });

//       const response = await axiosInstance.post("/admission-partner/submit", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//      if (response.status === 201 || response.status === 200) {

//         setSubmitStatus({
//           type: "success",
//           message: `Application submitted successfully! Your reference number is: ${response.data.data.referenceNumber}`,
//         });
        
//         // Reset form after successful submission
//         setFormData({
//           representativeName: "",
//           fathersName: "",
//           mothersName: "",
//           dateOfBirth: "",
//           gender: "",
//           nationality: "",
//           roleInOrganisation: "",
//           educationQualification: "",
//           organisationName: "",
//           yearOfEstablishment: "",
//           mobileNumber: "",
//           email: "",
//           organisationAddress: "",
//           organisationZipCode: "",
//           representativeAddress: "",
//           representativeZipCode: "",
//           organisationType: "",
//           institutionsConnected: "",
//           achievementsAwards: "",
//           totalStudentsEnrolled: "",
//           totalResearchPapers: "",
//           fieldsOfResearch: "",
//           researchGuideDetails: "",
//           documents: [],
//           institutionDescription: [],
//           corePhilosophy: "",
//           studentProfiles: [],
//           phdGuidanceFrequency: "",
//           phdServices: [],
//           phdAspirantsVolume: "",
//           phdChallenges: [],
//           discontinuationWitnessed: "",
//           missingElements: [],
//           ethicalBelief: "",
//           referralComfort: "",
//           recommendationFactors: [],
//           collaborationInterests: [],
//           collaborationRole: "",
//           collaborationApproach: "",
//           willingnessToDiscourage: "",
//           incentivePreference: "",
//           phdAdmissionGap: "",
//           idealPhdSystem: "",
//           declarationAgreed: false,
//           informationCertified: false,
//           rulesAgreed: false,
//         });
//         setFiles([]);
//       }
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       setSubmitStatus({
//         type: "error",
//         message: error.response?.data?.message || "Failed to submit application. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="apf-wrapper">
//       <h1 className="apf-title">ShodhSutra – Admission Partner Form</h1>
//       <p className="apf-subtitle">One Stop Solution to Research Education</p>

//       {submitStatus && (
//         <div className={`apf-alert ${submitStatus.type}`}>
//           {submitStatus.message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         {/* Representative Information */}
//         <section className="apf-section">
//           <h2 className="apf-heading">Representative Information</h2>

//           <div className="apf-grid">
//             <input
//               className="apf-input"
//               type="text"
//               name="representativeName"
//               placeholder="Name"
//               value={formData.representativeName}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="fathersName"
//               placeholder="Father's Name"
//               value={formData.fathersName}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="mothersName"
//               placeholder="Mother's Name"
//               value={formData.mothersName}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleInputChange}
//               required
//             />

//             <select
//               className="apf-input"
//               name="gender"
//               value={formData.gender}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>

//             <input
//               className="apf-input"
//               type="text"
//               name="nationality"
//               placeholder="Nationality"
//               value={formData.nationality}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="roleInOrganisation"
//               placeholder="Role in Organisation"
//               value={formData.roleInOrganisation}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="educationQualification"
//               placeholder="Education Qualification"
//               value={formData.educationQualification}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         </section>

//         {/* Organisation Information */}
//         <section className="apf-section">
//           <h2 className="apf-heading">Organisation Information</h2>

//           <div className="apf-grid">
//             <input
//               className="apf-input"
//               type="text"
//               name="organisationName"
//               placeholder="Organisation Name"
//               value={formData.organisationName}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="number"
//               name="yearOfEstablishment"
//               placeholder="Year of Establishment"
//               value={formData.yearOfEstablishment}
//               onChange={handleInputChange}
//               required
//               min="1900"
//               max="2099"
//             />
//             <input
//               className="apf-input"
//               type="tel"
//               name="mobileNumber"
//               placeholder="Mobile Number"
//               value={formData.mobileNumber}
//               onChange={handleInputChange}
//               required
//               pattern="[0-9]{10}"
//             />
//             <input
//               className="apf-input"
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="organisationAddress"
//               placeholder="Organisation Registered Address"
//               value={formData.organisationAddress}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="organisationZipCode"
//               placeholder="Zip Code"
//               value={formData.organisationZipCode}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="representativeAddress"
//               placeholder="Representative Address"
//               value={formData.representativeAddress}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="representativeZipCode"
//               placeholder="Zip Code"
//               value={formData.representativeZipCode}
//               onChange={handleInputChange}
//               required
//             />

//             <select
//               className="apf-input"
//               name="organisationType"
//               value={formData.organisationType}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Type of Organisation</option>
//               <option value="Sole Proprietor">Sole Proprietor</option>
//               <option value="Pvt. Ltd. Company">Pvt. Ltd. Company</option>
//               <option value="LLP">LLP</option>
//               <option value="Trust / Society">Trust / Society</option>
//             </select>
//           </div>
//         </section>

//         {/* Industry Experience */}
//         <section className="apf-section">
//           <h2 className="apf-heading">INDUSTRY EXPERIENCE</h2>

//           <p className="apf-question">Institutions Connected with:</p>
//           <textarea
//             className="apf-textarea"
//             name="institutionsConnected"
//             placeholder="Mention universities, colleges, research institutions, or organisations you have worked with"
//             value={formData.institutionsConnected}
//             onChange={handleInputChange}
//           />

//           <p className="apf-question">Achievements & Awards:</p>
//           <textarea
//             className="apf-textarea"
//             name="achievementsAwards"
//             placeholder="Mention notable achievements, recognitions, awards, or milestones"
//             value={formData.achievementsAwards}
//             onChange={handleInputChange}
//           />
//         </section>

//         {/* Experience in Research Education */}
//         <section className="apf-section">
//           <h2 className="apf-heading">Experience in Research Education</h2>

//           <div className="apf-grid">
//             <input
//               className="apf-input"
//               type="text"
//               name="totalStudentsEnrolled"
//               placeholder="Total Students Enrolled in Research Programs"
//               value={formData.totalStudentsEnrolled}
//               onChange={handleInputChange}
//             />
//             <input
//               className="apf-input"
//               type="number"
//               name="totalResearchPapers"
//               placeholder="Total Research Papers Published"
//               value={formData.totalResearchPapers}
//               onChange={handleInputChange}
//               min="0"
//             />
//             <input
//               className="apf-input"
//               type="text"
//               name="fieldsOfResearch"
//               placeholder="Fields of Research Programs"
//               value={formData.fieldsOfResearch}
//               onChange={handleInputChange}
//             />
//             <textarea
//               className="apf-textarea"
//               name="researchGuideDetails"
//               placeholder="If worked as Research Guide or Mentor (Kindly Mention Details of Area of Research & Other Relevant Details)"
//               value={formData.researchGuideDetails}
//               onChange={handleInputChange}
//             />
//           </div>
//         </section>

//         {/* Uploads */}
//         <section className="apf-section">
//           <h2 className="apf-heading">Documents Upload</h2>

//           <p className="apf-upload-note">
//             Kindly upload all relevant documents (PDF only) such as Research Papers,
//             Seminar / Conference Certificates, ID Proofs, etc.
//           </p>

//           <div className="apf-grid">
//             <input
//               className="apf-input"
//               type="file"
//               accept="application/pdf"
//               multiple
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//           {files.length > 0 && (
//             <div className="apf-file-list">
//               <p>Selected files:</p>
//               <ul>
//                 {files.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </section>

//         {/* ================= SECTION A ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION A: INSTITUTION PROFILE</h2>

//           <p className="apf-question">
//             How would you primarily describe your institution? (Multiple allowed)
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="Higher education institute"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> Higher education institute
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Research guidance centre"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> Research guidance centre
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Coaching / training institute"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> Coaching / training institute
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Skill development institute"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> Skill development institute
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Education consultancy"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> Education consultancy
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="University liaison / facilitation centre"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> University liaison / facilitation centre
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Independent academic advisory"
//                 onChange={(e) => handleCheckboxChange(e, "institutionDescription")}
//               /> Independent academic advisory
//             </label>
//           </div>

//           <p className="apf-question">
//             What best reflects your institution's core philosophy? (Single choice)
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="corePhilosophy"
//                 value="Student success & long-term outcomes"
//                 onChange={(e) => handleRadioChange(e, "corePhilosophy")}
//               /> Student success & long-term outcomes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="corePhilosophy"
//                 value="Admissions & placements focus"
//                 onChange={(e) => handleRadioChange(e, "corePhilosophy")}
//               /> Admissions & placements focus
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="corePhilosophy"
//                 value="Research & academic excellence"
//                 onChange={(e) => handleRadioChange(e, "corePhilosophy")}
//               /> Research & academic excellence
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="corePhilosophy"
//                 value="Skill development & training"
//                 onChange={(e) => handleRadioChange(e, "corePhilosophy")}
//               /> Skill development & training
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="corePhilosophy"
//                 value="Mixed / evolving model"
//                 onChange={(e) => handleRadioChange(e, "corePhilosophy")}
//               /> Mixed / evolving model
//             </label>
//           </div>

//           <p className="apf-question">
//             Which student profiles do you most commonly work with?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="UG students"
//                 onChange={(e) => handleCheckboxChange(e, "studentProfiles")}
//               /> UG students
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="PG students"
//                 onChange={(e) => handleCheckboxChange(e, "studentProfiles")}
//               /> PG students
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Working professionals"
//                 onChange={(e) => handleCheckboxChange(e, "studentProfiles")}
//               /> Working professionals
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Research scholars"
//                 onChange={(e) => handleCheckboxChange(e, "studentProfiles")}
//               /> Research scholars
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="International aspirants"
//                 onChange={(e) => handleCheckboxChange(e, "studentProfiles")}
//               /> International aspirants
//             </label>
//           </div>
//         </section>

//         {/* ================= SECTION B ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION B: EXPERIENCE WITH PhD ASPIRANTS</h2>

//           <p className="apf-question">
//             Do students approach your institution specifically for PhD-related guidance?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="phdGuidanceFrequency"
//                 value="Yes, frequently"
//                 onChange={(e) => handleRadioChange(e, "phdGuidanceFrequency")}
//               /> Yes, frequently
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="phdGuidanceFrequency"
//                 value="Yes, occasionally"
//                 onChange={(e) => handleRadioChange(e, "phdGuidanceFrequency")}
//               /> Yes, occasionally
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="phdGuidanceFrequency"
//                 value="Rarely"
//                 onChange={(e) => handleRadioChange(e, "phdGuidanceFrequency")}
//               /> Rarely
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="phdGuidanceFrequency"
//                 value="No"
//                 onChange={(e) => handleRadioChange(e, "phdGuidanceFrequency")}
//               /> No
//             </label>
//           </div>

//           <p className="apf-question">
//             Which PhD-related services does your institution currently provide?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="University information"
//                 onChange={(e) => handleCheckboxChange(e, "phdServices")}
//               /> University information
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Admission facilitation"
//                 onChange={(e) => handleCheckboxChange(e, "phdServices")}
//               /> Admission facilitation
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Topic suggestion"
//                 onChange={(e) => handleCheckboxChange(e, "phdServices")}
//               /> Topic suggestion
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Research proposal support"
//                 onChange={(e) => handleCheckboxChange(e, "phdServices")}
//               /> Research proposal support
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Documentation assistance"
//                 onChange={(e) => handleCheckboxChange(e, "phdServices")}
//               /> Documentation assistance
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Informal counselling only"
//                 onChange={(e) => handleCheckboxChange(e, "phdServices")}
//               /> Informal counselling only
//             </label>
//           </div>

//           <p className="apf-question">
//             On average, how many PhD aspirants do you interact with in a year?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="phdAspirantsVolume"
//                 value="1-10"
//                 onChange={(e) => handleRadioChange(e, "phdAspirantsVolume")}
//               /> 1-10
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="phdAspirantsVolume"
//                 value="11-30"
//                 onChange={(e) => handleRadioChange(e, "phdAspirantsVolume")}
//               /> 11-30
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="phdAspirantsVolume"
//                 value="31-60"
//                 onChange={(e) => handleRadioChange(e, "phdAspirantsVolume")}
//               /> 31-60
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="phdAspirantsVolume"
//                 value="60+"
//                 onChange={(e) => handleRadioChange(e, "phdAspirantsVolume")}
//               /> 60+
//             </label>
//           </div>
//         </section>

//         {/* ================= SECTION C ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION C: OBSERVED STUDENT CHALLENGES</h2>

//           <p className="apf-question">
//             From your experience, which issues do PhD aspirants most commonly face?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="Lack of clarity before enrolment"
//                 onChange={(e) => handleCheckboxChange(e, "phdChallenges")}
//               /> Lack of clarity before enrolment
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Choosing PhD due to pressure or comparison"
//                 onChange={(e) => handleCheckboxChange(e, "phdChallenges")}
//               /> Choosing PhD due to pressure or comparison
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Unrealistic timelines promised elsewhere"
//                 onChange={(e) => handleCheckboxChange(e, "phdChallenges")}
//               /> Unrealistic timelines promised elsewhere
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Poor guide-student alignment"
//                 onChange={(e) => handleCheckboxChange(e, "phdChallenges")}
//               /> Poor guide-student alignment
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Dropouts midway"
//                 onChange={(e) => handleCheckboxChange(e, "phdChallenges")}
//               /> Dropouts midway
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Emotional / professional burnout"
//                 onChange={(e) => handleCheckboxChange(e, "phdChallenges")}
//               /> Emotional / professional burnout
//             </label>
//           </div>

//           <p className="apf-question">
//             Have you witnessed students discontinue or regret their PhD journey?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="discontinuationWitnessed"
//                 value="Yes, multiple times"
//                 onChange={(e) => handleRadioChange(e, "discontinuationWitnessed")}
//               /> Yes, multiple times
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="discontinuationWitnessed"
//                 value="Yes, occasionally"
//                 onChange={(e) => handleRadioChange(e, "discontinuationWitnessed")}
//               /> Yes, occasionally
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="discontinuationWitnessed"
//                 value="Rarely"
//                 onChange={(e) => handleRadioChange(e, "discontinuationWitnessed")}
//               /> Rarely
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="discontinuationWitnessed"
//                 value="Never"
//                 onChange={(e) => handleRadioChange(e, "discontinuationWitnessed")}
//               /> Never
//             </label>
//           </div>

//           <p className="apf-question">
//             In such cases, what do you feel was missing the most?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="Early profiling & clarity"
//                 onChange={(e) => handleCheckboxChange(e, "missingElements")}
//               /> Early profiling & clarity
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Ethical counselling"
//                 onChange={(e) => handleCheckboxChange(e, "missingElements")}
//               /> Ethical counselling
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Continuous academic mentoring"
//                 onChange={(e) => handleCheckboxChange(e, "missingElements")}
//               /> Continuous academic mentoring
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Completion-oriented planning"
//                 onChange={(e) => handleCheckboxChange(e, "missingElements")}
//               /> Completion-oriented planning
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Realistic expectation setting"
//                 onChange={(e) => handleCheckboxChange(e, "missingElements")}
//               /> Realistic expectation setting
//             </label>
//           </div>
//         </section>

//         {/* ================= SECTION D ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION D: ETHICAL ALIGNMENT & DECISION PROCESS</h2>

//           <p className="apf-question">
//             Which statement best represents your belief?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="ethicalBelief"
//                 value="Admission without clarity harms students"
//                 onChange={(e) => handleRadioChange(e, "ethicalBelief")}
//               /> Admission without clarity harms students
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="ethicalBelief"
//                 value="Completion matters more than enrolment"
//                 onChange={(e) => handleRadioChange(e, "ethicalBelief")}
//               /> Completion matters more than enrolment
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="ethicalBelief"
//                 value="Each student needs a customised PhD path"
//                 onChange={(e) => handleRadioChange(e, "ethicalBelief")}
//               /> Each student needs a customised PhD path
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="ethicalBelief"
//                 value="Universities alone cannot ensure completion"
//                 onChange={(e) => handleRadioChange(e, "ethicalBelief")}
//               /> Universities alone cannot ensure completion
//             </label>
//           </div>

//           <p className="apf-question">
//             Are you comfortable referring students only after profile evaluation and suitability assessment?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="referralComfort"
//                 value="Yes"
//                 onChange={(e) => handleRadioChange(e, "referralComfort")}
//               /> Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="referralComfort"
//                 value="Depends on case"
//                 onChange={(e) => handleRadioChange(e, "referralComfort")}
//               /> Depends on case
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="referralComfort"
//                 value="Not sure"
//                 onChange={(e) => handleRadioChange(e, "referralComfort")}
//               /> Not sure
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="referralComfort"
//                 value="No"
//                 onChange={(e) => handleRadioChange(e, "referralComfort")}
//               /> No
//             </label>
//           </div>

//           <p className="apf-question">
//             What factors matter most before recommending any platform to a student?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="Academic integrity"
//                 onChange={(e) => handleCheckboxChange(e, "recommendationFactors")}
//               /> Academic integrity
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Completion probability"
//                 onChange={(e) => handleCheckboxChange(e, "recommendationFactors")}
//               /> Completion probability
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Student life context"
//                 onChange={(e) => handleCheckboxChange(e, "recommendationFactors")}
//               /> Student life context
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Institutional credibility"
//                 onChange={(e) => handleCheckboxChange(e, "recommendationFactors")}
//               /> Institutional credibility
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Long-term career outcomes"
//                 onChange={(e) => handleCheckboxChange(e, "recommendationFactors")}
//               /> Long-term career outcomes
//             </label>
//           </div>
//         </section>

//         {/* ================= SECTION E ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION E: COLLABORATION EXPECTATIONS</h2>

//           <p className="apf-question">What interests your institution in collaborating with ShodhSutra?</p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="checkbox"
//                 value="Ethical PhD guidance ecosystem"
//                 onChange={(e) => handleCheckboxChange(e, "collaborationInterests")}
//               /> Ethical PhD guidance ecosystem
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Structured student profiling"
//                 onChange={(e) => handleCheckboxChange(e, "collaborationInterests")}
//               /> Structured student profiling
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Multi-university access"
//                 onChange={(e) => handleCheckboxChange(e, "collaborationInterests")}
//               /> Multi-university access
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Completion-focused mentorship"
//                 onChange={(e) => handleCheckboxChange(e, "collaborationInterests")}
//               /> Completion-focused mentorship
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 value="Long-term academic association"
//                 onChange={(e) => handleCheckboxChange(e, "collaborationInterests")}
//               /> Long-term academic association
//             </label>
//           </div>

//           <p className="apf-question">
//             How do you see your institution's role in this collaboration?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationRole"
//                 value="Student identifier & guide"
//                 onChange={(e) => handleRadioChange(e, "collaborationRole")}
//               /> Student identifier & guide
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationRole"
//                 value="Academic mentor"
//                 onChange={(e) => handleRadioChange(e, "collaborationRole")}
//               /> Academic mentor
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationRole"
//                 value="Awareness creator"
//                 onChange={(e) => handleRadioChange(e, "collaborationRole")}
//               /> Awareness creator
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationRole"
//                 value="Referral partner (ethical)"
//                 onChange={(e) => handleRadioChange(e, "collaborationRole")}
//               /> Referral partner (ethical)
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationRole"
//                 value="Not fixed — open to discussion"
//                 onChange={(e) => handleRadioChange(e, "collaborationRole")}
//               /> Not fixed — open to discussion
//             </label>
//           </div>

//           <p className="apf-question">
//             Which approach aligns most with you?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationApproach"
//                 value="Fewer students, higher quality outcomes"
//                 onChange={(e) => handleRadioChange(e, "collaborationApproach")}
//               /> Fewer students, higher quality outcomes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationApproach"
//                 value="Moderate volume with structured support"
//                 onChange={(e) => handleRadioChange(e, "collaborationApproach")}
//               /> Moderate volume with structured support
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="collaborationApproach"
//                 value="Observational collaboration initially"
//                 onChange={(e) => handleRadioChange(e, "collaborationApproach")}
//               /> Observational collaboration initially
//             </label>
//           </div>
//         </section>

//         {/* ================= SECTION F ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION F: READINESS & QUALITY FILTER</h2>

//           <p className="apf-question">
//             Are you willing to discourage students from pursuing a PhD if it is not suitable for them?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="willingnessToDiscourage"
//                 value="Yes, absolutely"
//                 onChange={(e) => handleRadioChange(e, "willingnessToDiscourage")}
//               /> Yes, absolutely
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="willingnessToDiscourage"
//                 value="In most cases"
//                 onChange={(e) => handleRadioChange(e, "willingnessToDiscourage")}
//               /> In most cases
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="willingnessToDiscourage"
//                 value="Unsure"
//                 onChange={(e) => handleRadioChange(e, "willingnessToDiscourage")}
//               /> Unsure
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="willingnessToDiscourage"
//                 value="No"
//                 onChange={(e) => handleRadioChange(e, "willingnessToDiscourage")}
//               /> No
//             </label>
//           </div>

//           <p className="apf-question">
//             Would you prefer a system where incentives are linked to quality & completion, not volume?
//           </p>
//           <div className="apf-options">
//             <label>
//               <input
//                 type="radio"
//                 name="incentivePreference"
//                 value="Yes"
//                 onChange={(e) => handleRadioChange(e, "incentivePreference")}
//               /> Yes
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="incentivePreference"
//                 value="Neutral"
//                 onChange={(e) => handleRadioChange(e, "incentivePreference")}
//               /> Neutral
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="incentivePreference"
//                 value="No"
//                 onChange={(e) => handleRadioChange(e, "incentivePreference")}
//               /> No
//             </label>
//           </div>
//         </section>

//         {/* ================= SECTION G ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION G: OPEN REFLECTION</h2>

//           <p className="apf-question">
//             In your view, what is the biggest gap in the current PhD admission ecosystem?
//           </p>
//           <textarea
//             className="apf-textarea"
//             name="phdAdmissionGap"
//             placeholder="What is the biggest gap in the current PhD admission ecosystem?"
//             value={formData.phdAdmissionGap}
//             onChange={handleInputChange}
//           />

//           <p className="apf-question">
//             What would an ideal PhD guidance and completion system look like for your students?
//           </p>
//           <textarea
//             className="apf-textarea"
//             name="idealPhdSystem"
//             placeholder="What would an ideal PhD guidance and completion system look like for your students?"
//             value={formData.idealPhdSystem}
//             onChange={handleInputChange}
//           />
//         </section>

//         {/* ================= SECTION H ================= */}
//         <section className="apf-section">
//           <h2 className="apf-heading">SECTION H: DECLARATION</h2>

//           <label className="apf-checkbox">
//             <input
//               type="checkbox"
//               name="declarationAgreed"
//               checked={formData.declarationAgreed}
//               onChange={(e) => setFormData(prev => ({...prev, declarationAgreed: e.target.checked}))}
//             /> We believe in ethical, clarity-first PhD guidance and
//             wish to explore collaboration aligned with these values.
//           </label>
//         </section>

//         {/* Consent */}
//         <section className="apf-consent">
//           <label className="apf-checkbox">
//             <input
//               type="checkbox"
//               name="informationCertified"
//               checked={formData.informationCertified}
//               onChange={(e) => setFormData(prev => ({...prev, informationCertified: e.target.checked}))}
//             /> I certify that the above information is true
//             and correct.
//           </label>

//           <label className="apf-checkbox">
//             <input
//               type="checkbox"
//               name="rulesAgreed"
//               checked={formData.rulesAgreed}
//               onChange={(e) => setFormData(prev => ({...prev, rulesAgreed: e.target.checked}))}
//             /> I agree to follow all rules and regulations of
//             ShodhSutra.
//           </label>
//         </section>

//         <button 
//           className="apf-submit-btn" 
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Application"}
//         </button>
//       </form>
//     </div>
//   );
// }














import React from "react";
import "../styles/Institution.css";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function AdmissionPartnerForm() {
  const [formData, setFormData] = useState({
    // Representative Information
    representativeName: "",
    fathersName: "",
    mothersName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    roleInOrganisation: "",
    educationQualification: "",

    // Organisation Information
    organisationName: "",
    yearOfEstablishment: "",
    mobileNumber: "",
    email: "",
    organisationAddress: "",
    organisationZipCode: "",
    representativeAddress: "",
    representativeZipCode: "",
    organisationType: "",

    // Industry Experience
    institutionsConnected: "",
    achievementsAwards: "",

    // Experience in Research Education
    totalStudentsEnrolled: "",
    totalResearchPapers: "",
    fieldsOfResearch: "",
    researchGuideDetails: "",

    // Documents
    documents: [],

    // Declaration & Consent
    declarationAgreed: false,
    informationCertified: false,
    rulesAgreed: false,
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle text/select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Filter only PDF files
    const pdfFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    
    if (pdfFiles.length !== selectedFiles.length) {
      alert("Only PDF files are allowed. Non-PDF files have been removed.");
    }
    
    setFiles(pdfFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.declarationAgreed || !formData.informationCertified || !formData.rulesAgreed) {
      alert("Please agree to all declarations and consent statements.");
      return;
    }

    if (files.length === 0) {
      alert("Please upload at least one document.");
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          // Stringify array fields (though none remain in simplified version)
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append files
      files.forEach((file) => {
        formDataToSend.append("documents", file);
      });

      const response = await axiosInstance.post("/admission-partner/submit", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitStatus({
          type: "success",
          message: `Application submitted successfully! Your reference number is: ${response.data.data.referenceNumber}`,
        });
        
        // Reset form after successful submission
        setFormData({
          representativeName: "",
          fathersName: "",
          mothersName: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
          roleInOrganisation: "",
          educationQualification: "",
          organisationName: "",
          yearOfEstablishment: "",
          mobileNumber: "",
          email: "",
          organisationAddress: "",
          organisationZipCode: "",
          representativeAddress: "",
          representativeZipCode: "",
          organisationType: "",
          institutionsConnected: "",
          achievementsAwards: "",
          totalStudentsEnrolled: "",
          totalResearchPapers: "",
          fieldsOfResearch: "",
          researchGuideDetails: "",
          documents: [],
          declarationAgreed: false,
          informationCertified: false,
          rulesAgreed: false,
        });
        setFiles([]);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to submit application. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apf-wrapper">
      <h1 className="apf-title">ShodhSutra – Admission Partner Form</h1>
      <p className="apf-subtitle">One Stop Solution to Research Education</p>

      {submitStatus && (
        <div className={`apf-alert ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Representative Information */}
        <section className="apf-section">
          <h2 className="apf-heading">Representative Information</h2>

          <div className="apf-grid">
            <input
              className="apf-input"
              type="text"
              name="representativeName"
              placeholder="Name"
              value={formData.representativeName}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="fathersName"
              placeholder="Father's Name"
              value={formData.fathersName}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="mothersName"
              placeholder="Mother's Name"
              value={formData.mothersName}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="date"
              name="dateOfBirth"
              placeholder="dd-----yyyy"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />

            <select
              className="apf-input"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              className="apf-input"
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="roleInOrganisation"
              placeholder="Role in Organisation"
              value={formData.roleInOrganisation}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="educationQualification"
              placeholder="Education Qualification"
              value={formData.educationQualification}
              onChange={handleInputChange}
              required
            />
          </div>
        </section>

        {/* Organisation Information */}
        <section className="apf-section">
          <h2 className="apf-heading">Organisation Information</h2>

          <div className="apf-grid">
            <input
              className="apf-input"
              type="text"
              name="organisationName"
              placeholder="Organisation Name"
              value={formData.organisationName}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="number"
              name="yearOfEstablishment"
              placeholder="Year of Establishment"
              value={formData.yearOfEstablishment}
              onChange={handleInputChange}
              required
              min="1900"
              max="2099"
            />
            <input
              className="apf-input"
              type="tel"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
            />
            <input
              className="apf-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="organisationAddress"
              placeholder="Organisation Registered Address"
              value={formData.organisationAddress}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="organisationZipCode"
              placeholder="Zip Code"
              value={formData.organisationZipCode}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="representativeAddress"
              placeholder="Representative Address"
              value={formData.representativeAddress}
              onChange={handleInputChange}
              required
            />
            <input
              className="apf-input"
              type="text"
              name="representativeZipCode"
              placeholder="Zip Code"
              value={formData.representativeZipCode}
              onChange={handleInputChange}
              required
            />

            <select
              className="apf-input"
              name="organisationType"
              value={formData.organisationType}
              onChange={handleInputChange}
              required
            >
              <option value="">Type of Organisation</option>
              <option value="Sole Proprietor">Sole Proprietor</option>
              <option value="Pvt. Ltd. Company">Pvt. Ltd. Company</option>
              <option value="LLP">LLP</option>
              <option value="Trust / Society">Trust / Society</option>
            </select>
          </div>
        </section>

        {/* Industry Experience */}
        <section className="apf-section">
          <h2 className="apf-heading">INDUSTRY EXPERIENCE</h2>

          <p className="apf-question">Institutions Connected with:</p>
          <textarea
            className="apf-textarea"
            name="institutionsConnected"
            placeholder="Mention universities, colleges, research institutions, or organisations you have worked with"
            value={formData.institutionsConnected}
            onChange={handleInputChange}
          />

          <p className="apf-question">Achievements & Awards:</p>
          <textarea
            className="apf-textarea"
            name="achievementsAwards"
            placeholder="Mention notable achievements, recognitions, awards, or milestones"
            value={formData.achievementsAwards}
            onChange={handleInputChange}
          />
        </section>

        {/* Experience in Research Education */}
        <section className="apf-section">
          <h2 className="apf-heading">Experience in Research Education</h2>

          <div className="apf-grid">
            <input
              className="apf-input"
              type="text"
              name="totalStudentsEnrolled"
              placeholder="Total Students Enrolled in Research Programs"
              value={formData.totalStudentsEnrolled}
              onChange={handleInputChange}
            />
            <input
              className="apf-input"
              type="number"
              name="totalResearchPapers"
              placeholder="Total Research Papers Published"
              value={formData.totalResearchPapers}
              onChange={handleInputChange}
              min="0"
            />
            <input
              className="apf-input"
              type="text"
              name="fieldsOfResearch"
              placeholder="Fields of Research Programs"
              value={formData.fieldsOfResearch}
              onChange={handleInputChange}
            />
            <textarea
              className="apf-textarea"
              name="researchGuideDetails"
              placeholder="If worked as Research Guide or Mentor (Kindly Mention Details of Area of Research & Other Relevant Details)"
              value={formData.researchGuideDetails}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Documents Upload */}
        <section className="apf-section">
          <h2 className="apf-heading">Documents Upload</h2>

          <p className="apf-upload-note">
            Kindly upload all relevant documents (PDF only) such as Research Papers,
            Seminar / Conference Certificates, ID Proofs, etc.
          </p>

          <div className="apf-grid">
            <input
              className="apf-input"
              type="file"
              name="documents"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              required
            />
          </div>
          {files.length > 0 && (
            <div className="apf-file-list">
              <p>Selected files:</p>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Declaration */}
        <section className="apf-section">
          <h2 className="apf-heading">DECLARATION</h2>

          <label className="apf-checkbox">
            <input
              type="checkbox"
              name="declarationAgreed"
              checked={formData.declarationAgreed}
              onChange={(e) => setFormData(prev => ({...prev, declarationAgreed: e.target.checked}))}
              required
            /> We believe in ethical, clarity-first PhD guidance and
            wish to explore collaboration aligned with these values.
          </label>
        </section>

        {/* Consent */}
        <section className="apf-consent">
          <label className="apf-checkbox">
            <input
              type="checkbox"
              name="informationCertified"
              checked={formData.informationCertified}
              onChange={(e) => setFormData(prev => ({...prev, informationCertified: e.target.checked}))}
              required
            /> I certify that the above information is true
            and correct.
          </label>

          <label className="apf-checkbox">
            <input
              type="checkbox"
              name="rulesAgreed"
              checked={formData.rulesAgreed}
              onChange={(e) => setFormData(prev => ({...prev, rulesAgreed: e.target.checked}))}
              required
            /> I agree to follow all rules and regulations of
            ShodhSutra.
          </label>
        </section>

        <button 
          className="apf-submit-btn" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}