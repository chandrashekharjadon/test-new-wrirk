'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fontsource/poppins';

const Roadmap = ({ data }) => {
  const storage = process.env.NEXT_PUBLIC_STORAGE;
  const videoRef = useRef(null);

  /* ✅ AOS only for desktop */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
      });
    }
  }, []);

  /* ✅ Play video only when visible (no UI change) */
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full py-20 font-poppins px-4 lg:px-10">
      <div className="bg-[#06445421] rounded-lg shadow-custom7 p-6 lg:p-14">

        {/* HEADING */}
        <h2 className="text-center text-[#0B1B35] font-bold text-3xl">
          {data?.road_map_heading}
        </h2>

        <p className="text-[#4e4e4e] text-sm mt-4">
          {data?.paragraph}
        </p>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-2">

          {/* LEFT TIMELINE */}
          <div className="lg:col-span-8 relative space-y-1">

            {data?.roadmap_cards?.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isLast = index === data?.roadmap_cards?.length - 1;

              return (
                <div
                  key={item?.id || index}
                  className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                  data-aos={isLeft ? 'fade-right' : 'fade-left'}
                >

                  {/* CARD */}
                  <div
                    className={`relative z-10 w-full lg:w-[50%] rounded-lg p-4 shadow-custom8 ${
                      isLeft
                        ? 'bg-[#002631] text-white'
                        : 'bg-white text-[#002631]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={`${storage}${item?.image}`}
                        alt={item?.image_alt || 'image'}
                        width={12}
                        height={16}
                        loading="lazy"
                        unoptimized // ✅ small icon optimization
                      />
                      <h3 className="text-sm font-semibold">
                        {item?.title}
                      </h3>
                    </div>

                    {item?.items?.length > 0 && (
                      <div
                        className={`border-l-4 mt-2 pl-4 ${
                          isLeft
                            ? 'border-[#33D3D4]'
                            : 'border-[#0B1B35]'
                        }`}
                      >
                        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-y-2 gap-x-6 text-xs ml-2">
                          {item.items.map((point, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* RIGHT ARROW */}
                  {!isLeft && !isLast && (
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-[45%] -translate-x-1/2">
                      <Image
                        src={`${storage}${data?.road_map_image2}`}
                        alt={data?.road_map_image2_alt}
                        width={50}
                        height={20}
                        loading="lazy"
                        unoptimized
                        sizes="50px"
                      />
                    </div>
                  )}

                  {/* LEFT ARROW */}
                  {isLeft && !isLast && (
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-[45%] -translate-x-1/2">
                      <Image
                        src={`${storage}${data?.road_map_image1}`}
                        alt={data?.road_map_image1_alt}
                        width={50}
                        height={20}
                        loading="lazy"
                        unoptimized
                        sizes="50px"
                      />
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* RIGHT VIDEO */}
          <div className="lg:col-span-4">
            <div className="shadow-custom2 w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden">

              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none" // ✅ huge performance win
                className="w-full h-full object-cover"
              >
                <source
                  src={`${storage}${data?.road_map_video}`}
                  type="video/mp4"
                />
              </video>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Roadmap;