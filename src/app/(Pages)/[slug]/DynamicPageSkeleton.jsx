"use client";

import React from "react";

const DynamicPageSkeleton = () => {
  return (
    <div className="w-full px-4 lg:px-10 py-24 animate-pulse">
      
      {/* 🔹 Title */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <div className="h-8 bg-gray-300 rounded w-2/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>

      {/* 🔹 Content Sections */}
      <div className="max-w-6xl mx-auto space-y-12">

        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          >
            {/* Image */}
            <div className="w-full h-56 bg-gray-300 rounded-lg"></div>

            {/* Text */}
            <div className="space-y-4">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}

      </div>

      {/* 🔹 Button / CTA */}
      <div className="flex justify-center mt-12">
        <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
      </div>

    </div>
  );
};

export default DynamicPageSkeleton;