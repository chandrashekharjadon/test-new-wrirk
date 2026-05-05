"use client";

import React, { memo } from "react";
import ResearchDetailContainer from "@/app/components/ResearchComponents/ResearchDetailContainer";

const ResearchDetailClient = ({ data }) => {
  const category = data?.category;
  const categories = data?.all_categories || [];  

  // ❌ Only real check needed
  if (!category) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Details not found!</p>
      </div>
    );
  }

  return (
    <ResearchDetailContainer
      slug={category.slug}
      data={category}
      categories={categories}
    />
  );
};

export default memo(ResearchDetailClient);