"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "@fontsource/inter/700.css";
import "@fontsource/poppins/300.css";
import "@fontsource/urbanist/700.css";
import "@fontsource/urbanist/500.css";

const WorkSignup = ({ data }) => {
  const imgRefs = useRef([]);

  /* ✅ Optimized animation (no DOM query) */
  useEffect(() => {
    imgRefs.current.forEach((img, index) => {
      if (!img) return;

      setTimeout(() => {
        img.style.transform = "scale(1.2)";
        img.style.transition = "transform 1s ease";

        setTimeout(() => {
          img.style.transform = "scale(1)";
        }, 1000);
      }, index * 800); // slightly faster chain
    });
  }, []);

  return (
    <div className="w-full lg:py-20 md:py-16 py-10">
      <div className="flex flex-col items-center justify-center w-full relative pb-8">
        <h2 className="lg:text-[62px] md:text-[50px] text-[30px] font-[700] font-inter">
          {data.what_we_signup_heading}
        </h2>
        <p className="font-[300] font-poppins tracking-wide lg:tracking-[0.6vw] text-[26px] lg:px-0 md:px-2 px-4 text-center">
          {data.what_we_signup_paragraph}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 px-6">
        {data?.work_sign_up_cards?.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start p-4 px-6"
          >
            <div
              ref={(el) => (imgRefs.current[index] = el)}
              style={{ transition: "transform 0.5s ease" }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE}${step.image}`}
                alt={step.image_alt}
                width={240}
                height={240}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 240px" // ✅ important
                quality={70} // ✅ reduce size
              />
            </div>

            <h3
              className="text-[20px] font-[700] font-urbanist pt-4"
              style={{ color: step.color }}
            >
              {step.title}
            </h3>

            <p className="text-[14px] font-[500] font-urbanist pt-4 text-center px-6">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSignup;