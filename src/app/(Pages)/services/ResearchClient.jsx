"use client";

import React, { memo } from "react";
import Hero from "@/app/components/ResearchComponents/Hero";
import ResearchCardContainer from "@/app/components/ResearchComponents/ResearchCardContainer";

const ResearchClient = ({ data }) => {
  const cards = data?.cards || [];

  return (
    <div>
      <Hero data={data} />
      <ResearchCardContainer data={cards} />
    </div>
  );
};

export default memo(ResearchClient);