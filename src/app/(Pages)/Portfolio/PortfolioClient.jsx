"use client";

import React, { memo } from "react";
import Hero from "@/app/components/PortfolioComponents/Hero";
import PortCardSection from "@/app/components/PortfolioComponents/PortCardSection";
import Contact from "@/app/components/ContactusComponents/Contact";

const PortfolioClient = ({ portfolio, contact, areas, domains }) => {
  // 🚀 no loading check here (Suspense handles it)

  if (!portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Portfolio not found</p>
      </div>
    );
  }

  return (
    <div>

      <Hero data={portfolio} />

      <PortCardSection
        hero={portfolio}
        data={portfolio?.portfolio_cards || []}
      />

      <Contact data={contact} areas={areas} domains={domains} />

    </div>
  );
};

export default memo(PortfolioClient);