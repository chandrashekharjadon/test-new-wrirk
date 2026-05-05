"use client";

import React, { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { RiPhoneLine, RiMapPinFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { useGetAreasQuery, useGetDomainsQuery } from "@/app/services/wrirkda";

const Contact = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ API Calls
  const { data: areasData, isLoading: areasLoading, isError: areasError } =
    useGetAreasQuery();

  const { data: domainsData, isLoading: domainsLoading, isError: domainsError } =
    useGetDomainsQuery();

  // ✅ Simple (no unnecessary useMemo)
  const areas = areasData || [];
  const domains = domainsData || [];

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactnumber: "",
    research_area: "",
    research_domain: "",
    research_description: "",
  });

  // ✅ Change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Filter domains
  const filteredDomains = domains.filter(
    (d) => d?.research_area?.slug === formData.research_area
  );

  // ✅ Area change
  const handleAreaChange = useCallback((e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      research_area: value,
      research_domain: "",
    }));
  }, []);

  // ✅ Submit
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL2}contact`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (res.ok) {
          router.push("/thank-you");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("Submit Error:", error);
      } finally {
        setLoading(false);
      }
    },
    [formData, router]
  );

  // ✅ Loading
  if (areasLoading || domainsLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading form...
      </div>
    );
  }

  // ✅ Error
  if (areasError || domainsError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <div>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 lg:px-20 md:px-6 px-3 pt-10 pb-16">

        {/* LEFT SIDE */}
        <div className="rounded-s-lg text-white px-2 py-2 bg-white shadow-custom3">
          <div className="rounded-lg px-8 py-8 bg-[#011C2B] relative h-full">

            <h2 className="text-[24px]">{data?.heading}</h2>
            <p className="text-[14px] text-[#C9C9C9] font-medium">
              {data?.subheading}
            </p>

            <ul className="py-20 pb-36 pe-10 text-[12px]">
              <li className="py-3 flex gap-3 items-center">
                <RiPhoneLine className="text-[20px]" />
                {data?.phone}
              </li>

              <li className="py-3 flex gap-3 items-center">
                <MdEmail className="text-[20px]" />
                {data?.mail}
              </li>

              <li className="py-3 flex gap-3 items-center">
                <RiMapPinFill className="text-[40px]" />
                {data?.address}
              </li>
            </ul>

            {/* SOCIAL */}
            <div className="flex gap-4 py-2">
              {data?.social_links?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-full cursor-pointer bg-[#064454] hover:bg-white hover:text-[#F6AF03] flex items-center justify-center w-8 h-8"
                >
                  <i className={`bi ${item.icon} text-sm`} />
                </div>
              ))}
            </div>

            {/* IMAGE */}
            <div className="absolute right-0 bottom-0 left-[140px] flex overflow-hidden">
              <Image
                className="rounded-br-lg"
                width={300}
                height={300}
                src="/Images/contact-elli.avif"
                alt="contact"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 300px" // 🔥 important
                quality={70} // 🔥 optimized
              />
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-e-lg lg:col-span-2 md:px-8 px-6 pt-10 pb-2 bg-white shadow-custom3">

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="grid lg:grid-cols-2 gap-x-7">
              <div className="mb-4 p-2">
                <label className="text-[12px] text-[#8D8D8D]">First name</label>
                <input name="firstname" value={formData.firstname} onChange={handleChange} className="w-full border-b focus:outline-none" required />
              </div>

              <div className="mb-4 p-2">
                <label className="text-[12px] text-[#8D8D8D]">Last name</label>
                <input name="lastname" value={formData.lastname} onChange={handleChange} className="w-full border-b focus:outline-none" required />
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="grid lg:grid-cols-2 gap-x-7">
              <div className="mb-4 p-2">
                <label className="text-[12px] text-[#8D8D8D]">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b focus:outline-none" required />
              </div>

              <div className="mb-4 p-2">
                <label className="text-[12px] text-[#8D8D8D]">Phone</label>
                <input type="tel" name="contactnumber" value={formData.contactnumber} onChange={handleChange} className="w-full border-b focus:outline-none" required />
              </div>
            </div>

            {/* AREA */}
            <div className="mb-4 p-2">
              <label className="text-[12px] text-[#8D8D8D]">Research Area</label>
              <select name="research_area" value={formData.research_area} onChange={handleAreaChange} className="w-full border-b bg-transparent focus:outline-none" required>
                <option value="">Select your research area</option>
                {areas.map((a) => (
                  <option key={a?.slug} value={a?.slug}>
                    {a?.title}
                  </option>
                ))}
              </select>
            </div>

            {/* DOMAIN */}
            <div className="mb-4 p-2">
              <label className="text-[12px] text-[#8D8D8D]">Research Domain</label>
              <select name="research_domain" value={formData.research_domain} onChange={handleChange} className="w-full border-b bg-transparent focus:outline-none" required>
                <option value="">Select your research domain</option>
                {filteredDomains.map((d) => (
                  <option key={d?.slug} value={d?.slug}>
                    {d?.title}
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <div className="mb-4 p-2">
              <label className="text-[12px] text-[#8D8D8D]">Message</label>
              <textarea name="research_description" value={formData.research_description} onChange={handleChange} className="w-full border-b focus:outline-none" />
            </div>

            {/* SUBMIT */}
            <div className="mb-4 p-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-10 py-3 rounded-lg text-white ${
                  loading ? "bg-gray-400" : "bg-[#064454]"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Contact);