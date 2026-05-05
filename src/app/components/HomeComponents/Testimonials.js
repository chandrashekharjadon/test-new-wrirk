"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = ({ data }) => {
  const testimonials = data?.testimonials || [];
  const case_studies = data?.case_studies || [];

  const [activeTab, setActiveTab] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState({});
  const [cardsToShow, setCardsToShow] = useState(3);

  /* ✅ OPTIMIZED RESIZE (debounced) */
  useEffect(() => {
    let timeout;

    const updateCards = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (window.innerWidth < 768) setCardsToShow(1);
        else if (window.innerWidth < 1024) setCardsToShow(2);
        else setCardsToShow(3);
      }, 150);
    };

    updateCards();
    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("resize", updateCards);
      clearTimeout(timeout);
    };
  }, []);

  /* ================= NAVIGATION ================= */
  const prev = () =>
    setActiveIndex((p) =>
      p === 0 ? testimonials.length - 1 : p - 1
    );

  const next = () =>
    setActiveIndex((p) =>
      p === testimonials.length - 1 ? 0 : p + 1
    );

  const toggleReadMore = (id) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  /* ================= VISIBLE CARDS ================= */
  const visibleCards = useMemo(() => {
    if (!testimonials.length) return [];

    const len = testimonials.length;

    if (cardsToShow === 1) return [testimonials[activeIndex]];

    const prevIndex = activeIndex === 0 ? len - 1 : activeIndex - 1;
    const nextIndex = activeIndex === len - 1 ? 0 : activeIndex + 1;

    if (cardsToShow === 2) {
      return [
        testimonials[activeIndex],
        testimonials[nextIndex],
      ];
    }

    return [
      testimonials[prevIndex],
      testimonials[activeIndex],
      testimonials[nextIndex],
    ];
  }, [activeIndex, cardsToShow, testimonials]);

  const positions = [
    { translateX: -320, rotateY: -15, scale: 0.85, zIndex: 10, opacity: 0.5 },
    { translateX: 0, rotateY: 0, scale: 1, zIndex: 30, opacity: 1 },
    { translateX: 320, rotateY: 15, scale: 0.85, zIndex: 10, opacity: 0.5 },
  ];

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 pt-10 pb-24 overflow-hidden">

      {/* TOGGLE */}
      <div className="flex justify-center mb-14 px-4">
        <div className="relative flex max-w-[520px] w-full bg-[#002631] p-1 sm:p-2 rounded-xl">

          <span
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-lg
            transition-transform duration-300 ease-in-out
            ${activeTab ? "translate-x-0" : "translate-x-full"}`}
          />

          <button
            onClick={() => setActiveTab(true)}
            className={`relative z-10 w-1/2 flex items-center justify-center gap-2 sm:gap-3
            py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide sm:tracking-widest
            ${activeTab ? "text-black" : "text-white"}`}
          >
            <span className={`w-6 sm:w-8 h-[2px] ${activeTab ? "bg-black" : "bg-white"}`} />
            <span>{data.case_testimonial_title1}</span>
          </button>

          <button
            onClick={() => setActiveTab(false)}
            className={`relative z-10 w-1/2 flex items-center justify-center gap-2 sm:gap-3
            py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-wide sm:tracking-widest
            ${!activeTab ? "text-black" : "text-white"}`}
          >
            <span className={`w-6 sm:w-8 h-[2px] ${!activeTab ? "bg-black" : "bg-white"}`} />
            <span>{data.case_testimonial_title2}</span>
          </button>

        </div>
      </div>

      {/* TESTIMONIALS */}
      {activeTab && (
        <>
          <p className="text-2xl md:text-4xl font-semibold text-[#52525b] my-10 text-center">
            {data.case_testimonial_description}
          </p>

          <div
            className="relative flex justify-center items-center h-[500px]"
            style={{ perspective: "1200px" }}
          >
            {visibleCards.map((item, i) => {
              if (!item) return null;

              const isCenter =
                cardsToShow === 1 || (cardsToShow === 3 && i === 1);

              const pos =
                cardsToShow === 3 ? positions[i] : positions[1];

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    setActiveIndex(
                      testimonials.findIndex((t) => t.id === item.id)
                    )
                  }
                  className="absolute top-0 left-1/2 cursor-pointer transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translateX(${pos.translateX}px) translateX(-50%) scale(${pos.scale}) rotateY(${pos.rotateY}deg)`,
                    zIndex: pos.zIndex,
                    opacity: pos.opacity,
                    width: "320px",
                    height: "420px",
                  }}
                >
                  <div
                    className={`bg-[#F1F1F1] rounded-2xl p-6 shadow-lg flex flex-col h-full justify-between
                    transition-transform duration-700 ease-in-out overflow-hidden
                    ${isCenter ? "scale-105 lg:scale-110 opacity-100" : "scale-95 opacity-60"}`}
                  >
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <Image
                          src={
                            item?.image
                              ? `${process.env.NEXT_PUBLIC_STORAGE}${item.image}`
                              : "/default-avatar.png"
                          }
                          alt={item?.image_alt || "user"}
                          width={56}
                          height={56}
                          className="w-14 h-14 rounded-full object-cover"
                          loading="lazy"
                          sizes="56px"
                          unoptimized // ✅ small avatar fix
                        />

                        <div>
                          <h3 className="text-base md:text-lg font-bold">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.designation}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={`text-lg ${
                              idx < item.rating
                                ? "text-orange-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* BODY */}
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NAV unchanged */}
          <div className="flex items-center justify-center gap-6">
            <ChevronLeft size={36} onClick={prev} className="cursor-pointer text-gray-500 hover:text-black" />

            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex
                      ? "bg-gray-800 scale-110"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <ChevronRight size={36} onClick={next} className="cursor-pointer text-gray-500 hover:text-black" />
          </div>
        </>
      )}

      {/* CASE STUDIES (only image fix) */}
      {!activeTab && (
        <div className="max-w-5xl mx-auto space-y-6">
          {case_studies?.slice(0, 3)?.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-6 bg-[#F1F1F1] p-6 rounded-2xl">
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE}${item.image}`}
                alt={item.image_alt || "image"}
                width={100}
                height={100}
                loading="lazy"
                sizes="100px"
                unoptimized
                className="rounded-xl object-cover"
              />

              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>

                <div
                  className={`mt-2 text-gray-600 text-sm leading-relaxed ${
                    open[item.id] ? "" : "line-clamp-3"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                <button
                  onClick={() => toggleReadMore(item.id)}
                  className="text-blue-600 font-semibold mt-2"
                >
                  {open[item.id] ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;