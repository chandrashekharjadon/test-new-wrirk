"use client";

import Hero from "@/app/components/HomeComponents/Hero";
import ResearchCardContainer from "@/app/components/ResearchComponents/ResearchCardContainer";

const ResearchClient = ({ data }) => {
  return (
    <div>
      {/* <Hero data={data} /> */}
      <ResearchCardContainer data={data?.cards || []} />
    </div>
  );
};

export default ResearchClient;