import React from "react";

export default function AdmissionConsultant() {
  const documents = [
    {
      name: "1.  Center Procedure",
      file: "/admission%20cunsltant/Procedure.pdf",
    },
    {
      name: "2. EduOrbix Admission Partner Form",
      file: "/admission%20cunsltant/EduOrbix%20Admission%20Partner%20Form.pdf",
    },
    {
      name: "3. EduOrbix Affiliation Letter",
      file: "/admission%20cunsltant/EduOrbix%20Affiliation%20Letter.pdf",
    },
    {
      name: "4. Information Brochure",
      file: "/admission%20cunsltant/Information_Brochure_-compressed.pdf-1775216845626.pdf",
    },
    {
      name: "5. NECU Application Form",
      file: "/admission%20cunsltant/NECU%20Application%20form%20(2).pdf",
    },
    {
      name: "6. NECU Fee Details",
      file: "/admission%20cunsltant/NECU%20FEE%20ALL.pdf",
    },
    {
      name: "7. NECU Degree Form",
      file: "/admission%20cunsltant/NECU%20Degree%20Form.pdf",
    },
     {
  name: "8. Bank Account Details",
  file: "/admission%20cunsltant/Account%20Details.pdf",
},
{
  name: "9. Admission Consultants",
  file: "/admission%20cunsltant/Admission%20consultants%20(1).pdf",
},
{
  name: "10. Admission Process",
  file: "/admission%20cunsltant/Admission%20Process.pdf",
},
  ];

  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0a2a48] text-white px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-5">
            Admission Consultant
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            North East Christian University
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Download admission documents, application forms, fee details and
            payment information in one place.
          </p>
        </div>
      </section>

      {/* Bank Details */}
        {/* <section className="px-4 -mt-10 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 border">
            <h2 className="text-2xl font-bold text-[#0a2a48] mb-5 text-center">
                Bank Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Account Name</p>
                <h3 className="font-semibold text-gray-900">
                    North East Christian University
                </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Account Number</p>
                <h3 className="font-semibold text-gray-900">
                    0686073000000369
                </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">IFSC Code</p>
                <h3 className="font-semibold text-gray-900">
                    SIBL0000686
                </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Bank Name</p>
                <h3 className="font-semibold text-gray-900">
                    South Indian Bank
                </h3>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                <p className="text-sm text-gray-500">Branch</p>
                <h3 className="font-semibold text-gray-900">
                    Dimapur Branch
                </h3>
                </div>
            </div>
            </div>
        </section> */}

      {/* Documents */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Download Documents
          </h2>

          <p className="text-lg text-gray-600 mb-10">
            Download all required admission documents below.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-[#0f3a63] rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-white mb-5 min-h-[56px]">
                  {doc.name}
                </h3>

                <a
                  href={doc.file}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="bg-yellow-500 text-black px-6 py-2.5 rounded-lg inline-block font-semibold hover:bg-yellow-400 transition"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}