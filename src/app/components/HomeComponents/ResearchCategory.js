import React from "react";
import Image from "next/image";
import ResearchCards from "@/app/utils/Homeutils/ResearchCateCards";

const ResearchCategory = ({ data }) => {

  const cards = data?.research_cards || [];

  return (
    <div className="w-full py-6 lg:py-20">

      {/* HEADER */}
      <div className="grid items-center justify-center w-full bg-[#F1F1F1] rounded-tl-[25px] relative shadow-custom8">

        <h2 className="font-extrabold xl:text-[120px] md:text-[80px] text-[30px] py-4 text-[#002631]">
          Research Categories
        </h2>

        {/* ✅ FIX: priority images */}
        <Image
          className="left-0 top-[-200px] absolute md:flex sm:hidden hidden"
          width={300}
          height={300}
          src="/Images/pen1.avif"
          alt="pen1"
          loading="lazy" // ✅ FIX
          quality={70}   // ✅ optional
        />

        <Image
          className="absolute left-0 top-[30px] md:flex sm:hidden hidden z-10"
          width={200}
          height={200}
          src="/Images/pen2.avif"
          alt="pen2"
          loading="lazy" // ✅ FIX
          quality={70}
          sizes="(max-width: 768px) 0px, 200px" // ✅ prevents unnecessary download on mobile
        />
      </div>

      {/* CONTENT */}
      <div className="w-full grid top-[-40px] 2xl:px-20 xl:px-20 lg:px-20 md:px-10 sm:px-10 px-6 mt-2">

        <div className="services_card grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 2xl:gap-14 xl:gap-14 lg:gap-14 md:gap-10 sm:gap-8 gap-8 justify-center items-center bg-[#002631] rounded-lg 2xl:p-16 xl:p-16 lg:p-16 md:p-10 sm:p-6 p-6 relative overflow-y-auto h-[550px]">

          {/* ✅ FIX: fallback UI */}
          {cards.length > 0 ? (
            cards.map((item) => (
              <ResearchCards key={item.id || item.slug} {...item} />
            ))
          ) : (
            <div className="text-white text-center col-span-full">
              Loading categories...
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ResearchCategory;