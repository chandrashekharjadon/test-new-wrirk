"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const WhatweServe = ({ data }) => {
  const [active, setActive] = useState("serve");
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const serveRef = useRef(null);
  const assureRef = useRef(null);

  const serviceData = data?.services || [];
  const assureData = data?.assures || [];

  const serveImage = data?.what_we_offer_image1;
  const assureImage = data?.what_we_offer_image2;

  /* ✅ FIX: real responsive check (no UI change) */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= GSAP INIT ================= */
  useLayoutEffect(() => {
    if (!serveRef.current || !assureRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(serveRef.current, {
        scale: 1,
        x: 0,
        rotateY: isMobile ? 0 : 45,
        zIndex: 2,
        opacity: 1,
        boxShadow: "0px 25px 20px rgba(0,0,0,0.45)",
        transformPerspective: 1400,
      });

      gsap.set(assureRef.current, {
        scale: isMobile ? 1 : 0.85,
        x: isMobile ? 0 : -100,
        rotateY: isMobile ? 0 : 45,
        zIndex: 1,
        opacity: isMobile ? 0 : 0.8,
        boxShadow: isMobile ? "none" : "-30px 20px 20px rgba(0,0,0,0.45)",
        transformPerspective: 1400,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* ================= TOGGLE ================= */
  const handleToggle = (tab) => {
    if (tab === active) return;

    const isServe = tab === "serve";

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.6 },
    });

    tl.to(
      serveRef.current,
      {
        scale: 1,
        x: isMobile ? 0 : isServe ? 0 : -100,
        rotateY: isMobile ? 0 : 45,
        zIndex: isServe ? 2 : 1,
        opacity: isServe ? 1 : isMobile ? 0 : 0.8,
      },
      0
    ).to(
      assureRef.current,
      {
        scale: 1,
        x: isMobile ? 0 : isServe ? -100 : 0,
        rotateY: isMobile ? 0 : 45,
        zIndex: isServe ? 1 : 2,
        opacity: isServe ? (isMobile ? 0 : 0.8) : 1,
      },
      0
    );

    setActive(tab);
  };

  return (
    <section className="w-full py-16 sm:py-20 font-poppins">

      {/* ================= TOGGLE ================= */}
      <div className="flex justify-center mb-10 px-3 sm:px-4">
        <div className="relative flex w-full max-w-[520px] bg-[#002631] p-1 sm:p-2 rounded-xl overflow-hidden">
          <span
            className={`
              absolute top-1 sm:top-2 left-1 sm:left-2
              h-[calc(100%-8px)] sm:h-[calc(100%-16px)]
              w-[calc(50%-4px)] sm:w-[calc(50%-8px)]
              bg-white rounded-lg
              transition-transform duration-300 ease-in-out
              ${active === "assure" ? "translate-x-full" : "translate-x-0"}
            `}
          />

          <button onClick={() => handleToggle("serve")} className="relative z-10 flex-1 flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-3 uppercase tracking-widest font-semibold text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            <span className={`block w-5 sm:w-8 h-[2px] ${active === "serve" ? "bg-black" : "bg-white"}`} />
            <span className={active === "serve" ? "text-black" : "text-white"}>
              What We Serve
            </span>
          </button>

          <button onClick={() => handleToggle("assure")} className="relative z-10 flex-1 flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-6 py-3 uppercase tracking-widest font-semibold text-[9px] xs:text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            <span className={`block w-5 sm:w-8 h-[2px] ${active === "assure" ? "bg-black" : "bg-white"}`} />
            <span className={active === "assure" ? "text-black" : "text-white"}>
              What We Assure
            </span>
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-20">

        {/* IMAGE */}
        <div
          ref={containerRef}
          className="relative col-span-1 lg:col-span-5 min-h-[300px] sm:min-h-[340px]"
          style={{ perspective: "1400px" }}
        >

          {/* BACK */}
          <div ref={assureRef} className="absolute inset-0 sm:top-4 sm:left-10 lg:left-20 mx-auto w-full max-w-[420px] h-[220px] sm:h-[260px] rounded-[34px]">
            <div className="relative w-full h-full rounded-[34px] overflow-hidden">
              {assureImage && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE}${assureImage}`}
                  alt={data?.what_we_offer_image2_alt || "image"}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"   // ✅ added
                  loading="lazy"                            // ✅ changed
                  quality={70}                              // ✅ added
                  className="object-cover rounded-[34px]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent rounded-[34px]" />
            </div>
          </div>

          {/* FRONT */}
          <div ref={serveRef} className="absolute inset-0 sm:top-4 sm:left-10 lg:left-20 mx-auto w-full max-w-[420px] h-[220px] sm:h-[260px] rounded-[34px]">
            <div className="relative w-full h-full rounded-[34px] overflow-hidden">
              {serveImage && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE}${serveImage}`}
                  alt={data?.what_we_offer_image1_alt || "image"}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"   // ✅ added
                  loading="lazy"                            // ✅ changed
                  quality={70}                              // ✅ added
                  className="object-cover rounded-[34px]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent rounded-[34px]" />
            </div>
          </div>

        </div>

        {/* DATA */}
        <div className="col-span-1 lg:col-span-7 px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(active === "serve" ? serviceData : assureData).map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE}${item.image}`}
                    alt={item.image_alt || "icon"}
                    width={14}
                    height={18}
                    loading="lazy"
                    unoptimized   // ✅ added (no UI change)
                  />
                  <h2 className="text-[#484848] text-sm sm:text-base font-semibold">
                    {item.heading}
                  </h2>
                </div>

                <div className="border-l-4 border-[#0B1B35] ms-1 mt-2 min-h-[80px]">
                  <div
                    className="text-xs sm:text-sm text-[#4c4c4c] ps-4"
                    dangerouslySetInnerHTML={{ __html: item.paragraph }}
                  />
                  <button className="float-right mt-2 bg-[#002631] text-white w-5 h-5 flex items-center justify-center rounded-full">
                    &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatweServe;