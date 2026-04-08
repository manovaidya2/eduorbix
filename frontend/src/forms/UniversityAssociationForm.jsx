// Updated UniversityAssociationForm.jsx
import React, { useState } from "react";
import "./University.css";
import { universityApi } from "../api/universityApi";

export default function UniversityAssociationForm() {
  // State management
  const [hasPhd, setHasPhd] = useState(null);
  const [showOtherDiscipline, setShowOtherDiscipline] = useState(false);
  const [otherDiscipline, setOtherDiscipline] = useState("");
  const [showOtherMode, setShowOtherMode] = useState(false);
  const [otherMode, setOtherMode] = useState("");
  const [phdGuideCount, setPhdGuideCount] = useState("");
  const [supportSystems, setSupportSystems] = useState([]);
  const [timelineTracking, setTimelineTracking] = useState("");
  const [phdChallenges, setPhdChallenges] = useState([]);
  const [completionImportance, setCompletionImportance] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Form data states
  const [formData, setFormData] = useState({
    // Section 1
    officialName: "",
    universityType: "",
    yearOfEstablishment: "",
    location: "",
    recognitionStatus: [],
    
    // Section 2
    phdDisciplines: [],
    otherDiscipline: "",
    phdModes: [],
    otherMode: "",
    averageScholars: "",
    
    // Section 5
    onboardingMethods: [],
    profileAdmissionPreference: "",
    preferredScholarTypes: [],
    
    // Section 6
    interests: [],
    supportPreferences: [],
    institutionPhilosophy: "",
    
    // Section 7
    contactPerson: {
      name: "",
      designation: "",
      email: "",
      phone: ""
    },
    
    // Declaration
    declarationConfirmed: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contactPerson: {
        ...prev.contactPerson,
        [name]: value
      }
    }));
  };

  const handleCheckboxChange = (section, value, checked) => {
    setFormData(prev => {
      const currentArray = prev[section] || [];
      const newArray = checked 
        ? [...currentArray, value]
        : currentArray.filter(item => item !== value);
      
      return {
        ...prev,
        [section]: newArray
      };
    });
  };

  const handleSupportSystemChange = (value) => {
    const isChecked = supportSystems.includes(value);
    if (isChecked) {
      setSupportSystems(prev => prev.filter(item => item !== value));
    } else {
      setSupportSystems(prev => [...prev, value]);
    }
  };

  const handleChallengeChange = (value) => {
    const isChecked = phdChallenges.includes(value);
    if (isChecked) {
      setPhdChallenges(prev => prev.filter(item => item !== value));
    } else {
      setPhdChallenges(prev => [...prev, value]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.declarationConfirmed) {
      setError("Please confirm the declaration before submitting.");
      return;
    }

    if (hasPhd === false) {
      setError("This association is only for institutions offering PhD programs.");
      return;
    }

    // Prepare final data
    const submissionData = {
      ...formData,
      hasPhdProgram: hasPhd,
      phdGuideCount,
      supportSystems,
      timelineTracking,
      phdChallenges,
      completionImportance,
      phdDisciplines: [
        ...formData.phdDisciplines,
        ...(otherDiscipline ? ["Other"] : [])
      ],
      otherDiscipline: otherDiscipline || undefined,
      phdModes: [
        ...formData.phdModes,
        ...(otherMode ? ["Other"] : [])
      ],
      otherMode: otherMode || undefined
    };

    try {
      setLoading(true);
      setError("");
      
      const response = await universityApi.submitUniversityForm(submissionData);
      
      if (response.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          officialName: "",
          universityType: "",
          yearOfEstablishment: "",
          location: "",
          recognitionStatus: [],
          phdDisciplines: [],
          otherDiscipline: "",
          phdModes: [],
          otherMode: "",
          averageScholars: "",
          onboardingMethods: [],
          profileAdmissionPreference: "",
          preferredScholarTypes: [],
          interests: [],
          supportPreferences: [],
          institutionPhilosophy: "",
          contactPerson: {
            name: "",
            designation: "",
            email: "",
            phone: ""
          },
          declarationConfirmed: false
        });
        setHasPhd(null);
        setPhdGuideCount("");
        setSupportSystems([]);
        setTimelineTracking("");
        setPhdChallenges([]);
        setCompletionImportance("");
        setOtherDiscipline("");
        setOtherMode("");
        
        // Scroll to top
        window.scrollTo(0, 0);
      }
    } catch (err) {
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="ss-ua-wrapper">
        <div className="ss-success-message">
          <h2>✅ Form Submitted Successfully!</h2>
          <p>
            Thank you for submitting the University Association Form. 
            Our team will review your submission and contact you within 3-5 working days.
          </p>
          <button 
            className="ss-ua-submit"
            onClick={() => setSubmitSuccess(false)}
          >
            Submit Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ss-ua-wrapper">
      <h1 className="ss-ua-title">
        🎓 ShodhSutra – University Association | Quick Profile Form
      </h1>
      <p className="ss-ua-intro">
        This form helps us understand your university's academic ecosystem,
        research orientation, and alignment with ShodhSutra's
        completion-first PhD guidance model.
        <br />
        <strong>This is not a commitment or agreement.</strong>
      </p>

      {error && (
        <div className="ss-error-message">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* SECTION 1 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 1: UNIVERSITY IDENTITY</h2>

          <label className="ss-ua-label">Official Name of the University *</label>
          <input 
            className="ss-ua-input" 
            type="text" 
            name="officialName"
            value={formData.officialName}
            onChange={handleInputChange}
            required
          />

          <label className="ss-ua-label">Type of University *</label>
          <div className="ss-ua-options">
            {[
              "Central University",
              "State University",
              "Deemed-to-be University",
              "Private University",
              "International University",
              "Research Institution",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="radio" 
                  name="universityType"
                  value={item}
                  checked={formData.universityType === item}
                  onChange={handleInputChange}
                  required
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">Year of Establishment *</label>
          <select 
            className="ss-ua-input"
            name="yearOfEstablishment"
            value={formData.yearOfEstablishment}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 75 }, (_, i) => 1950 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <label className="ss-ua-label">University Location *</label>
          <input 
            className="ss-ua-input" 
            type="text" 
            placeholder="City, State, Country"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <label className="ss-ua-label">UGC / Statutory Recognition Status</label>
          <div className="ss-ua-options">
            {[
              "UGC Recognised",
              "AICTE Approved",
              "Both",
              "International Accreditation",
              "Other Council",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="checkbox" 
                  checked={formData.recognitionStatus.includes(item)}
                  onChange={(e) => handleCheckboxChange('recognitionStatus', item, e.target.checked)}
                /> {item}
              </label>
            ))}
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 2: ACADEMIC & RESEARCH ECOSYSTEM</h2>

          <label className="ss-ua-label">
            Does your university offer PhD / Doctoral Programs? *
          </label>
          <div className="ss-ua-options">
            <label>
              <input
                type="radio"
                name="phdOffer"
                onChange={() => setHasPhd(true)}
                required
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="phdOffer"
                onChange={() => setHasPhd(false)}
                required
              /> No
            </label>
          </div>

          {hasPhd === false && (
            <p className="ss-no-phd-message">
              Thank you for your interest. This association is currently applicable
              only for institutions offering PhD / Doctoral programs.
            </p>
          )}

          {hasPhd === true && (
            <>
              <label className="ss-ua-label">PhD Disciplines Offered</label>
              <div className="ss-ua-options">
                {[
                  "Management",
                  "Education",
                  "Psychology",
                  "Law",
                  "Commerce / Finance",
                  "Engineering / Technology",
                  "Health Sciences",
                  "Social Sciences",
                  "Interdisciplinary Research",
                ].map((item) => (
                  <label key={item}>
                    <input 
                      type="checkbox" 
                      checked={formData.phdDisciplines.includes(item)}
                      onChange={(e) => handleCheckboxChange('phdDisciplines', item, e.target.checked)}
                    /> {item}
                  </label>
                ))}

                <label>
                  <input
                    type="checkbox"
                    checked={showOtherDiscipline}
                    onChange={(e) => {
                      setShowOtherDiscipline(e.target.checked);
                      if (!e.target.checked) setOtherDiscipline("");
                    }}
                  /> Other
                </label>
              </div>

              {showOtherDiscipline && (
                <input
                  className="ss-ua-input"
                  placeholder="Please specify other discipline"
                  value={otherDiscipline}
                  onChange={(e) => setOtherDiscipline(e.target.value)}
                />
              )}

              <label className="ss-ua-label">Mode of PhD Programs</label>
              <div className="ss-ua-options">
                {[
                  "Full-time",
                  "Part-time",
                  "For working professionals",
                  "International scholars",
                ].map((item) => (
                  <label key={item}>
                    <input 
                      type="checkbox" 
                      checked={formData.phdModes.includes(item)}
                      onChange={(e) => handleCheckboxChange('phdModes', item, e.target.checked)}
                    /> {item}
                  </label>
                ))}

                <label>
                  <input
                    type="checkbox"
                    checked={showOtherMode}
                    onChange={(e) => {
                      setShowOtherMode(e.target.checked);
                      if (!e.target.checked) setOtherMode("");
                    }}
                  /> Other
                </label>
              </div>

              {showOtherMode && (
                <input
                  className="ss-ua-input"
                  placeholder="Please specify other mode"
                  value={otherMode}
                  onChange={(e) => setOtherMode(e.target.value)}
                />
              )}

              <label className="ss-ua-label">
                Average Number of Active PhD Scholars (Approx.)
              </label>
              <div className="ss-ua-options">
                {["Below 50", "50–100", "101–300", "300+"].map((item) => (
                  <label key={item}>
                    <input 
                      type="radio" 
                      name="averageScholars"
                      value={item}
                      checked={formData.averageScholars === item}
                      onChange={handleInputChange}
                    /> {item}
                  </label>
                ))}
              </div>
            </>
          )}
        </section>

        {/* SECTION 3 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 3: RESEARCH GUIDANCE & SUPPORT SYSTEM</h2>

          <label className="ss-ua-label">
            Number of Approved PhD Guides (Approx.)
          </label>
          <div className="ss-ua-options">
            {["Below 25", "25–50", "51–100", "100+"].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="phdGuides"
                  value={item}
                  checked={phdGuideCount === item}
                  onChange={() => setPhdGuideCount(item)}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            What kind of support system is available for PhD scholars?
          </label>
          <div className="ss-ua-options">
            {[
              "Research methodology coursework",
              "Proposal review committee",
              "Periodic progress reviews",
              "Publication guidance",
              "Thesis formatting & submission support",
              "Mentor / guide interaction structure",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={supportSystems.includes(item)}
                  onChange={() => handleSupportSystemChange(item)}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            Does your university track PhD completion timelines?
          </label>
          <div className="ss-ua-options">
            {["Yes, actively", "Partially", "No"].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="timelineTracking"
                  value={item}
                  checked={timelineTracking === item}
                  onChange={() => setTimelineTracking(item)}
                /> {item}
              </label>
            ))}
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 4: OBSERVED CHALLENGES (REALITY CHECK)</h2>

          <label className="ss-ua-label">
            From your experience, what challenges do PhD scholars most commonly face?
          </label>
          <div className="ss-ua-options">
            {[
              "Delay in topic finalisation",
              "Scholar–guide misalignment",
              "Lack of research clarity",
              "Time-management issues (working professionals)",
              "Dropouts / long delays",
              "Publication-related challenges",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={phdChallenges.includes(item)}
                  onChange={() => handleChallengeChange(item)}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            How important is completion support for your university's reputation?
          </label>
          <div className="ss-ua-options">
            {[
              "Extremely important",
              "Important",
              "Moderately important",
              "Not a priority",
            ].map((item) => (
              <label key={item}>
                <input
                  type="radio"
                  name="completionImportance"
                  value={item}
                  checked={completionImportance === item}
                  onChange={() => setCompletionImportance(item)}
                /> {item}
              </label>
            ))}
          </div>
        </section>

        {/* SECTION 5 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 5: ADMISSION & ONBOARDING APPROACH</h2>

          <label className="ss-ua-label">
            How does your university currently onboard PhD scholars?
          </label>
          <div className="ss-ua-options">
            {[
              "Entrance test",
              "Interview",
              "Profile-based assessment",
              "Research proposal evaluation",
              "Combination of the above",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="checkbox" 
                  checked={formData.onboardingMethods.includes(item)}
                  onChange={(e) => handleCheckboxChange('onboardingMethods', item, e.target.checked)}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            Are you open to profile-evaluated admissions rather than volume-based intake?
          </label>
          <div className="ss-ua-options">
            {["Yes", "Depends on program", "No"].map((item) => (
              <label key={item}>
                <input 
                  type="radio" 
                  name="profileAdmissionPreference"
                  value={item}
                  checked={formData.profileAdmissionPreference === item}
                  onChange={handleInputChange}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            What type of scholars does your university prefer?
          </label>
          <div className="ss-ua-options">
            {[
              "Academicians",
              "Working professionals",
              "Industry experts",
              "International scholars",
              "Research-oriented candidates only",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="checkbox" 
                  checked={formData.preferredScholarTypes.includes(item)}
                  onChange={(e) => handleCheckboxChange('preferredScholarTypes', item, e.target.checked)}
                /> {item}
              </label>
            ))}
          </div>
        </section>

        {/* SECTION 6 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 6: ASSOCIATION WITH SHODHSUTRA</h2>

          <label className="ss-ua-label">
            What interests your university in associating with ShodhSutra?
          </label>
          <div className="ss-ua-options">
            {[
              "Better-qualified PhD applicants",
              "Structured scholar profiling",
              "Higher completion probability",
              "Ethical admission support",
              "Research ecosystem collaboration",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="checkbox" 
                  checked={formData.interests.includes(item)}
                  onChange={(e) => handleCheckboxChange('interests', item, e.target.checked)}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            How would you prefer ShodhSutra to support your PhD programs?
          </label>
          <div className="ss-ua-options">
            {[
              "Scholar profiling & readiness assessment",
              "Pre-admission clarity & counselling",
              "Research guidance support",
              "Scholar retention & completion support",
              "Academic collaboration",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="checkbox" 
                  checked={formData.supportPreferences.includes(item)}
                  onChange={(e) => handleCheckboxChange('supportPreferences', item, e.target.checked)}
                /> {item}
              </label>
            ))}
          </div>

          <label className="ss-ua-label">
            Which statement aligns most with your institution's philosophy?
          </label>
          <div className="ss-ua-options">
            {[
              "Quality of scholars matters more than quantity",
              "Completion rate reflects academic credibility",
              "Structured guidance improves outcomes",
              "Ethical admissions protect long-term reputation",
            ].map((item) => (
              <label key={item}>
                <input 
                  type="radio" 
                  name="institutionPhilosophy"
                  value={item}
                  checked={formData.institutionPhilosophy === item}
                  onChange={handleInputChange}
                /> {item}
              </label>
            ))}
          </div>
        </section>

        {/* SECTION 7 */}
        <section className="ss-ua-section">
          <h2 className="ss-ua-heading">SECTION 7: POINT OF CONTACT *</h2>

          <input 
            className="ss-ua-input" 
            placeholder="Authorized Contact Person Name *"
            name="name"
            value={formData.contactPerson.name}
            onChange={handleContactChange}
            required
          />
          <input 
            className="ss-ua-input" 
            placeholder="Designation *"
            name="designation"
            value={formData.contactPerson.designation}
            onChange={handleContactChange}
            required
          />
          <input 
            className="ss-ua-input" 
            placeholder="Official Email ID *"
            type="email"
            name="email"
            value={formData.contactPerson.email}
            onChange={handleContactChange}
            required
          />
          <input 
            className="ss-ua-input" 
            placeholder="Contact Number *"
            type="tel"
            name="phone"
            value={formData.contactPerson.phone}
            onChange={handleContactChange}
            required
          />
        </section>

        {/* DECLARATION */}
        <section className="ss-ua-section">
          <label className="ss-ua-declaration">
            <input 
              type="checkbox" 
              checked={formData.declarationConfirmed}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                declarationConfirmed: e.target.checked
              }))}
              required
            /> 
            We confirm the information shared is accurate
            and we are open to exploring an ethical association with ShodhSutra. *
          </label>
        </section>

        <button 
          className="ss-ua-submit" 
          type="submit"
          disabled={loading || hasPhd === false}
        >
          {loading ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
    </div>
  );
}