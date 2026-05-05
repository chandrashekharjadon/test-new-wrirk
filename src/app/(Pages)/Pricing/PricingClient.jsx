"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";

const PricingClient = ({ services = [] }) => {

  // ✅ Derived data (no state, no re-render issues)
  const serviceTypes = useMemo(() => services, [services]);

  const serviceMethods = useMemo(
    () => serviceTypes.map(service => service.Method || []),
    [serviceTypes]
  );

  const serviceMethodPrice = useMemo(
    () =>
      serviceTypes.map(service =>
        service.Method?.map(method => method.Price_id || {}) || []
      ),
    [serviceTypes]
  );

  return (
    <div className="w-full text-center pt-28 pb-32 px-4 bg-[#DEEAEF]">
      {/* Heading */}
      <p className="text-center text-md tracking-widest text-gray-500 font-bold uppercase">
        Pricing Plans
      </p>

      <p className="font-bold font-poppins tracking-wide text-[#064454] lg:text-[30px] text-[26px] px-4 lg:px-[26vw] py-2 text-center">
        Flexible Research Packages<br /> Tailored to Your Needs
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 pt-10 px-4 lg:px-[6vw] gap-8">
        {serviceTypes.map((service, index) => (
          <div
            key={service._id || index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className={`relative text-center py-6 ${index % 2 === 0 ? "text-[#064454] bg-[#EDF4F4]" : "text-white bg-[#064454]"}`} >
              <h2 className="text-lg font-semibold tracking-wide uppercase">
                {service?.Name}
              </h2>

              <span className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${index % 2 === 0 ? "bg-[#BDC2C2]/60" : "bg-white/30"}`} />
            </div>


            {/* Body */}
            <div className="px-6 py-5">
              {/* Subtitle */}
              <p className="italic text-center text-[#064454] font-medium mb-6">
                “{service?.Description || "all set"}”
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <span className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-400 font-semibold">
                  SELECT PLAN TYPE
                </span>
                <span className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Method + Price List */}
              <div className="space-y-3 text-sm mb-6">
                {serviceMethods[index]?.length > 0 ? (
                  serviceMethods[index].map((method, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4"
                    >
                      {/* Left: Method Name */}
                      <span className="text-gray-700">
                        • {method?.Name || "Method Name"}
                      </span>

                      {/* Right: Price Badge */}
                      <span className="bg-[#D5DCDD] text-[#064454] text-xs font-semibold px-5 py-2 rounded-md whitespace-nowrap">
                        {
                          serviceMethodPrice[index]?.[idx]?.Inr_Price > 0 ||
                            serviceMethodPrice[index]?.[idx]?.Inr_Below_Threshod_Page_Price > 0
                            ? (
                              <>
                                Starting{" "}₹
                                {
                                  serviceMethodPrice[index]?.[idx]?.Inr_Price > 0
                                    ? serviceMethodPrice[index][idx].Inr_Price
                                    : serviceMethodPrice[index][idx].Inr_Above_Threshod_Page_Price
                                }
                                {
                                  serviceMethodPrice[index]?.[idx]?.Per_Page
                                    ? "/Page"
                                    : ""
                                }
                                *
                              </>
                            )
                            : "Variable"
                        }
                      </span>

                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No pricing available
                  </p>
                )}
              </div>

              {/* Button */}
              <Link href={`/addon/service/${service._id}`}>
                <button className="w-full bg-[#064454] hover:bg-[#053845] text-white py-3 rounded-lg font-medium transition">
                  check this plan
                </button>
              </Link>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 bg-[#F6F8FA] text-sm text-gray-600">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#064454]">✓</span>
                <span className="font-medium">SCOPE INCLUDES</span>
              </div>

              <ul className="list-disc list-inside space-y-2 text-left font-bold">
                {serviceMethods[index]?.length > 0 ? (
                  serviceMethods[index].map((method, idx) => (
                    <li key={idx}>
                      {method.Values?.length > 0
                        ? method.Values
                          .map(
                            value =>
                              value.charAt(0).toUpperCase() + value.slice(1)
                          )
                          .join(" / ")
                        : "No Method Name"}
                    </li>
                  ))
                ) : (
                  <li>No Methods</li>
                )}
              </ul>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(PricingClient);