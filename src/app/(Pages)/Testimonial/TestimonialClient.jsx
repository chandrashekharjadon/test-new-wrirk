"use client";

import React, { memo } from "react";
import CaseStudies from "@/app/components/TestimonialComponents/CaseStudies";
import Testimonials from "@/app/components/TestimonialComponents/Testimonials";

const TestimonialClient = ({ data }) => {
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No data available</p>
      </div>
    );
  }

  const { case_studies, testimonials } = data;

  return (
    <div className="bg-[#f4f4f4] w-full pt-24">
      <CaseStudies case_studies={case_studies} />

      {/* ✅ FIX HERE */}
      <Testimonials 
        details={data} 
        testimonials={testimonials} 
      />
    </div>
  );
};

export default memo(TestimonialClient);