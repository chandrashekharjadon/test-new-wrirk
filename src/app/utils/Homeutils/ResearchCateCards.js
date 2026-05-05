import React from "react";
import Link from "next/link";

const ResearchCateCards = ({ title, desc, slug }) => {
  return (
    <div className="flex flex-col justify-center items-start text-white">

      <div className="card">

        {/* TITLE */}
        <h2 className="font-semibold text-[16px]">
          {title}
        </h2>

        {/* DESCRIPTION */}
        <div
          className="text-[12px] leading-[19px] font-thin pt-2"
          dangerouslySetInnerHTML={{ __html: desc }}
        />

        {/* LINK (FIXED) */}
        <Link
          href={`/services/${slug}`}
          className="cursor-pointer py-3 text-black text-center flex justify-end"
        >
          <div className="bg-white px-6 py-1 text-[12px] text-[#002631] font-thin">
            Read More
          </div>
        </Link>

      </div>

    </div>
  );
};

export default ResearchCateCards;