"use client";

import React, { memo } from "react";
import Hero from "@/app/components/PortfolioComponents/PortCardComponents/Hero";

const PortfolioDetailClient = ({ portfolio, contact }) => {
  if (!portfolio) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Portfolio not found</p>
      </div>
    );
  }

  return <Hero details={portfolio} contact={contact} />;
};

export default memo(PortfolioDetailClient);