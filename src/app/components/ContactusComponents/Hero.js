"use client";

import React, { memo } from "react";
import Contact from "./Contact";

const Hero = ({ data }) => {
  return (
    <div className="bg-[#f4f4f4]">
      <div className="w-full text-center pt-24 lg:pb-10 md:pb-4 sm:pb-2 pb-2 px-4">
        <h1 className="font-[950] tracking-wide text-[#F6AF03] lg:text-[46px] text-[32px] px-6 py-2">
          Contact Us
        </h1>
        <p className="text-[16px] text-[#717171] font-semibold">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      <Contact data={data} />
    </div>
  );
};

export default memo(Hero);