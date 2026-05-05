"use client";

import { useGetSalesTeamQuery } from "@/app/services/quotation";
import { useState } from "react";
import { useSelector } from "react-redux";

const PdfDownloadButton = ({ payload }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState(null);

  const [formData, setFormData] = useState({
    UserName: "",
    Phone: "",
  });

  // Name, Contact, UserId
  const { data, error, isLoading } = useGetSalesTeamQuery();
  const salesTeamList = data || [];
  // const salesTeamList = useSelector((state) => state.service?.serviceData1?.SalesTeam) || [];

  // console.log('Sales Team List:', salesTeamList);


  // ✅ Dummy Sales Team (10 members)
  // const salesTeamList = [
  //   { UserId: "S001", name: "Rahul Sharma", phone: "+91 9876543210" },
  //   { UserId: "S002", name: "Amit Verma", phone: "+91 9123456780" },
  //   { UserId: "S003", name: "Priya Singh", phone: "+91 9988776655" },
  //   { UserId: "S004", name: "Neha Gupta", phone: "+91 9871234567" },
  //   { UserId: "S005", name: "Rohit Kumar", phone: "+91 9012345678" },
  //   { UserId: "S006", name: "Anjali Mehta", phone: "+91 9898989898" },
  //   { UserId: "S007", name: "Sandeep Yadav", phone: "+91 9765432109" },
  //   { UserId: "S008", name: "Pooja Sharma", phone: "+91 9090909090" },
  //   { UserId: "S009", name: "Vikas Jain", phone: "+91 9345678901" },
  //   { UserId: "S010", name: "Deepak Chauhan", phone: "+91 9654321098" },
  // ];

  // ✅ Random selector
  const getRandomSalesPerson = () => {
    if (!salesTeamList.length) return null;
    return salesTeamList[Math.floor(Math.random() * salesTeamList.length)];
  };

  // ✅ Optional loading handling
  if (isLoading) return null;
  if (error) console.error(error);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Phone") {
      const cleaned = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, Phone: cleaned }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValid =
    formData.UserName.trim().length > 0 &&
    formData.Phone.length === 10;

  const handleDownload = async () => {
    try {
      setLoading(true);

      const salesPerson = getRandomSalesPerson();
      setSelectedSales(salesPerson);

      // console.log('salesPerson', salesPerson);
      // console.log('selectedSales', selectedSales);

      setOpen(false);
      setSuccessOpen(true);


      // https://crm.wrirk.com/api/
      // http://localhost:8001/api/

      // NEW ADD THIS BLOCK 
      await fetch(`https://crm.wrirk.com/api/scholars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.UserName,
          mobile: formData.Phone.replace(/\D/g, ""),
          user_id: salesPerson?.UserId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Scholar Saved:", data))
        .catch((err) => console.error("Scholar API Error:", err));

      // end NEW ADD THIS BLOCK 

      const finalPayload = {
        ...payload,
        UserName: formData.UserName,
      };

      // ✅ 1. Generate PDF
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/pdfapi/pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPayload),
        }
      );

      if (!response.ok) throw new Error("Failed to generate PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // ✅ 2. Upload PDF
      const uploadForm = new FormData();
      uploadForm.append("file", blob, "generated.pdf");

      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi/upload`,
        {
          method: "POST",
          headers: {
            username: formData.UserName,
          },
          body: uploadForm,
        }
      );

      if (!uploadResponse.ok) throw new Error("Upload failed");

      const uploadPdfData = await uploadResponse.json();

      // ✅ 3. Save user data
      const userSendingData = {
        UserName: formData.UserName,
        Phone: formData.Phone,
        pdf_type: 'site',
        QueryId: payload.QueryId || `Q-${Date.now()}`,
        ResearchArea: payload.Area || "N/A",
        ResearchTopic: payload.Topic || "N/A",
        Country: payload.Country || "",
        Course: payload.Course || "N/A",
        ResearchDomain: payload.Domain || "N/A",
        Createdby: formData.UserName,
        State: payload.State || "",
        City: payload.City || "",
        PdfName: `${formData.UserName}_${payload?.Services?.Service_Type}.pdf`,
        filePath: uploadPdfData.filePath,
        CreaterEmail: "test@email.com",
        DateNow: new Date().toISOString(),
      };

      const saveResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSendingData),
        }
      );

      if (!saveResponse.ok) throw new Error("Saving user data failed");

      // ✅ GET RESPONSE DATA
      const savedProfile = await saveResponse.json();

      console.log("Saved Profile:", savedProfile);

      // ✅ 4. start WHATSAPP 
      try {
        await fetch("/api/whatsapp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.UserName,
            phone: formData.Phone,
            pdfLink: `${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi${uploadPdfData.filePath}`,
            salesName: salesPerson?.Name,
            salesPhone: salesPerson?.Contact,
          }),
        });
      } catch (err) {
        console.error("WhatsApp Error:", err);
      }
      // end WhatsApp code  

      // ✅ Show success modal
      // setOpen(false);
      // setSuccessOpen(true);

      // ✅ 5. Download PDF
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.UserName}_${payload?.Services?.Service_Type || "pdf"
        }.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      // ✅ Select random sales person
      // setSelectedSales(getRandomSalesPerson());


    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Generate Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#223F4B] text-white py-2 px-4 rounded-lg"
      >
        Generate PDF
      </button>

      {/* 🔹 Form Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-6 animate-scaleIn">

            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Get Your PDF
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Enter details to generate PDF. It will be sent on WhatsApp.
            </p>

            {/* Name Input */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="UserName"
                placeholder="Enter your name"
                value={formData.UserName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223F4B] transition"
              />
            </div>

            {/* Phone Input */}
            <div className="mb-5">
              <label className="text-sm text-gray-600 mb-1 block">
                Phone Number
              </label>
              <input
                type="tel"
                name="Phone"
                maxLength={10}
                inputMode="numeric"
                placeholder="Enter 10-digit number"
                value={formData.Phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223F4B] transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center gap-3">

              <button
                onClick={() => setOpen(false)}
                className="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDownload}
                disabled={!isValid || formData.Phone.length !== 10}
                className={`w-1/2 py-2 rounded-lg font-medium transition ${isValid && formData.Phone.length === 10
                  ? "bg-[#223F4B] text-white hover:bg-[#1b323c]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {loading ? "Generating..." : "Generate PDF"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* 🔹 Success Modal */}
      {successOpen && selectedSales && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[350px] text-center">
            <h2 className="text-lg font-semibold mb-2 text-green-600">
              ✅ PDF Generated Successfully
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Our sales team will contact you shortly.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-medium">{selectedSales.Name}</p>
              <p className="text-gray-600">{selectedSales.Contact}</p>

              {/* 📞 Call */}
              <a
                href={`tel:${selectedSales.Contact}`}
                className="block text-blue-600 mt-2"
              >
                Call Now
              </a>

              {/* 💬 WhatsApp */}
              <a
                href={`https://wa.me/${String(selectedSales?.Contact || "").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-600"
              >
                Chat on WhatsApp
              </a>
            </div>

            <button
              onClick={() => setSuccessOpen(false)}
              className="px-4 py-2 bg-[#223F4B] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfDownloadButton;

// test 
// "use client";

// import { useGetSalesTeamQuery } from "@/app/services/quotation";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const PdfDownloadButton = ({ payload }) => {
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [successOpen, setSuccessOpen] = useState(false);
//   const [selectedSales, setSelectedSales] = useState(null);

//   const [formData, setFormData] = useState({
//     UserName: "",
//     Phone: "",
//   });

//   // Name, Contact, UserId
//   const { data, error, isLoading } = useGetSalesTeamQuery();
//   const salesTeamList = data || [];
//   // const salesTeamList = useSelector((state) => state.service?.serviceData1?.SalesTeam) || [];

//   // console.log('Sales Team List:', salesTeamList);


//   // ✅ Dummy Sales Team (10 members)
//   // const salesTeamList = [
//   //   { UserId: "S001", name: "Rahul Sharma", phone: "+91 9876543210" },
//   //   { UserId: "S002", name: "Amit Verma", phone: "+91 9123456780" },
//   //   { UserId: "S003", name: "Priya Singh", phone: "+91 9988776655" },
//   //   { UserId: "S004", name: "Neha Gupta", phone: "+91 9871234567" },
//   //   { UserId: "S005", name: "Rohit Kumar", phone: "+91 9012345678" },
//   //   { UserId: "S006", name: "Anjali Mehta", phone: "+91 9898989898" },
//   //   { UserId: "S007", name: "Sandeep Yadav", phone: "+91 9765432109" },
//   //   { UserId: "S008", name: "Pooja Sharma", phone: "+91 9090909090" },
//   //   { UserId: "S009", name: "Vikas Jain", phone: "+91 9345678901" },
//   //   { UserId: "S010", name: "Deepak Chauhan", phone: "+91 9654321098" },
//   // ];

//   // ✅ Random selector
//   const getRandomSalesPerson = () => {
//     if (!salesTeamList.length) return null;
//     return salesTeamList[Math.floor(Math.random() * salesTeamList.length)];
//   };

//   // ✅ Optional loading handling
//   if (isLoading) return null;
//   if (error) console.error(error);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "Phone") {
//       const cleaned = value.replace(/\D/g, "");
//       setFormData((prev) => ({ ...prev, Phone: cleaned }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const isValid =
//     formData.UserName.trim().length > 0 &&
//     formData.Phone.length === 10;

//   const handleDownload = async () => {
//     try {
//       setLoading(true);

//       const salesPerson = getRandomSalesPerson();
//       if (!salesPerson) throw new Error("No sales person");

//       setSelectedSales(salesPerson);

//       const finalPayload = {
//         ...payload,
//         UserName: formData.UserName,
//       };

//       // ✅ STEP 1: Start PDF request FIRST (important)
//       const pdfPromise = fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/pdfapi/pdf`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(finalPayload),
//         }
//       );

//       // ✅ STEP 2: Fire background APIs (non-blocking)
//       fetch(`https://crm.wrirk.com/api/scholars`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: formData.UserName,
//           mobile: formData.Phone,
//           user_id: salesPerson?.UserId,
//         }),
//       }).catch(() => { });

//       // ✅ STEP 3: UI show AFTER request started
//       setOpen(false);
//       setSuccessOpen(true);

//       // ✅ STEP 4: Wait for PDF
//       const response = await pdfPromise;

//       if (!response.ok) throw new Error("PDF failed");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       // ✅ STEP 5: Download LAST
//       setTimeout(() => {
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `${formData.UserName}_${payload?.Services?.Service_Type || "pdf"
//           }.pdf`;

//         document.body.appendChild(a);
//         a.click();
//         a.remove();

//         window.URL.revokeObjectURL(url);
//       }, 1000); // 👈 delay = smooth UX

//     } catch (error) {
//       console.error("❌ Error:", error);
//       alert(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Generate Button */}
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-[#223F4B] text-white py-2 px-4 rounded-lg"
//       >
//         Generate PDF
//       </button>

//       {/* 🔹 Form Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

//           <div className="bg-white w-[380px] rounded-2xl shadow-2xl p-6 animate-scaleIn">

//             {/* Header */}
//             <h2 className="text-xl font-semibold text-gray-800 mb-1">
//               Get Your PDF
//             </h2>
//             <p className="text-sm text-gray-500 mb-5">
//               Enter details to generate PDF. It will be sent on WhatsApp.
//             </p>

//             {/* Name Input */}
//             <div className="mb-4">
//               <label className="text-sm text-gray-600 mb-1 block">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="UserName"
//                 placeholder="Enter your name"
//                 value={formData.UserName}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223F4B] transition"
//               />
//             </div>

//             {/* Phone Input */}
//             <div className="mb-5">
//               <label className="text-sm text-gray-600 mb-1 block">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="Phone"
//                 maxLength={10}
//                 inputMode="numeric"
//                 placeholder="Enter 10-digit number"
//                 value={formData.Phone}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#223F4B] transition"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between items-center gap-3">

//               <button
//                 onClick={() => setOpen(false)}
//                 className="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDownload}
//                 disabled={!isValid || formData.Phone.length !== 10}
//                 className={`w-1/2 py-2 rounded-lg font-medium transition ${isValid && formData.Phone.length === 10
//                   ? "bg-[#223F4B] text-white hover:bg-[#1b323c]"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//               >
//                 {loading ? "Generating..." : "Generate PDF"}
//               </button>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔹 Success Modal */}
//       {successOpen && selectedSales && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[350px] text-center">
//             <h2 className="text-lg font-semibold mb-2 text-green-600">
//               ✅ PDF Generated Successfully
//             </h2>

//             <p className="text-sm text-gray-600 mb-4">
//               Our sales team will contact you shortly.
//             </p>

//             <div className="bg-gray-100 p-4 rounded-lg mb-4">
//               <p className="font-medium">{selectedSales.Name}</p>
//               <p className="text-gray-600">{selectedSales.Contact}</p>

//               {/* 📞 Call */}
//               <a
//                 href={`tel:${selectedSales.Contact}`}
//                 className="block text-blue-600 mt-2"
//               >
//                 Call Now
//               </a>

//               {/* 💬 WhatsApp */}
//               <a
//                 href={`https://wa.me/${String(selectedSales?.Contact || "").replace(/\D/g, "")}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-green-600"
//               >
//                 Chat on WhatsApp
//               </a>
//             </div>

//             <button
//               onClick={() => setSuccessOpen(false)}
//               className="px-4 py-2 bg-[#223F4B] text-white rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PdfDownloadButton;