"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "@/app/loading";

const Testimonials = ({ details, testimonials = [] }) => {
  if (!details || testimonials.length === 0) {
    return <Loading />;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";
  const total = testimonials.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  const resizeTimeout = useRef(null);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const updateCards = () => {
      const width = window.innerWidth;
      setCardsToShow(width < 768 ? 1 : width < 1024 ? 2 : 3);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(updateCards, 120);
    };

    updateCards();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ================= NAVIGATION ================= */
  const prev = useCallback(() => {
    setActiveIndex((p) => (p === 0 ? total - 1 : p - 1));
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((p) => (p === total - 1 ? 0 : p + 1));
  }, [total]);

  /* ================= POSITIONS ================= */
  const positions = useMemo(
    () => [
      { translateX: -320, rotateY: -15, scale: 0.85, zIndex: 10, opacity: 0.5 },
      { translateX: 0, rotateY: 0, scale: 1, zIndex: 30, opacity: 1 },
      { translateX: 320, rotateY: 15, scale: 0.85, zIndex: 10, opacity: 0.5 },
    ],
    []
  );

  /* ================= VISIBLE CARDS ================= */
  const visibleCards = useMemo(() => {
    if (!total) return [];

    const prevIndex = (activeIndex - 1 + total) % total;
    const nextIndex = (activeIndex + 1) % total;

    if (cardsToShow === 1) return [testimonials[activeIndex]];

    if (cardsToShow === 2)
      return [testimonials[activeIndex], testimonials[nextIndex]];

    return [
      testimonials[prevIndex],
      testimonials[activeIndex],
      testimonials[nextIndex],
    ];
  }, [activeIndex, cardsToShow, testimonials, total]);

  /* ================= CLICK HANDLER ================= */
  const handleCardClick = useCallback(
    (index) => {
      if (cardsToShow === 3) {
        if (index === 0) prev();
        else if (index === 2) next();
      }

      if (cardsToShow === 2) {
        if (index === 1) next();
      }
    },
    [cardsToShow, prev, next]
  );

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
          {details.title1}
        </h2>
        <p className="text-gray-500 mt-3 mb-12 text-center max-w-2xl mx-auto">
          {details.description}
        </p>

        {/* CAROUSEL */}
        <div className="relative flex justify-center items-center h-[480px] perspective-1200">
          {visibleCards.map((item, i) => {
            const isCenter =
              cardsToShow === 1 || (cardsToShow === 3 && i === 1);

            const pos = cardsToShow === 3 ? positions[i] : null;

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(i)}
                className="absolute top-0 left-1/2 cursor-pointer transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateX(${pos?.translateX || 0}px) translateX(-50%) scale(${pos?.scale || 1}) rotateY(${pos?.rotateY || 0}deg)`,
                  zIndex: pos?.zIndex || 20,
                  opacity: pos?.opacity || 1,
                  width: "320px",
                  height: "420px",
                }}
              >
                {/* UI UNCHANGED */}
                <div
                  className={`bg-[#F1F1F1] rounded-2xl p-6 shadow-lg flex flex-col h-full justify-between 
                  transition-transform duration-700 ease-in-out overflow-hidden
                  ${isCenter ? "scale-105 lg:scale-110 opacity-100" : "scale-95 opacity-60"}`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={`${baseUrl}${item.image}`}
                        alt={item.image_alt || "user"}
                        width={56}
                        height={56}
                        sizes="56px"
                        className="w-14 h-14 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div className="text-left">
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

                  <div>
                    <h4 className="text-lg md:text-xl font-bold">
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

        {/* CONTROLS */}
        <div className="flex items-center justify-center gap-6">
          <ChevronLeft
            size={36}
            onClick={prev}
            className="cursor-pointer text-gray-500 hover:text-black transition-colors"
          />

          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-gray-800 scale-110"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <ChevronRight
            size={36}
            onClick={next}
            className="cursor-pointer text-gray-500 hover:text-black transition-colors"
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);