"use client";

import React, { memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import '@fontsource-variable/mulish';

const ResearchCard = ({
  slug,
  image,
  image_alt,
  title,
  desc,
  category,
}) => {
  const router = useRouter();

  // ✅ simple (no useCallback needed)
  const handleClick = () => {
    router.push(`/services/${slug}`);
  };

  // ✅ simple (no useMemo needed)
  const safeDesc = desc
    ? desc.length > 170
      ? `${desc.slice(0, 170)}...`
      : desc
    : "";

  const imageUrl = image
    ? `${process.env.NEXT_PUBLIC_STORAGE}${image}`
    : "/fallback.jpg"; // ✅ fallback prevents broken request

  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="max-w-sm md:max-w-md rounded-xl overflow-hidden bg-white text-black shadow-custom8">

        {/* Image */}
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={image_alt || "research image"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={60} // 🔥 reduce size
            className="object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="px-3 py-4">

          <div className="text-[18px] font-mulish font-bold text-[#002631] mb-3">
            {title}
          </div>

          <div
            className="text-[13px] font-mulish font-normal text-[#002631]"
            dangerouslySetInnerHTML={{ __html: safeDesc }}
          />

          <span className="bg-[#002631] mt-2 text-white text-[10px] px-2 py-[2px] font-mulish flex justify-center items-center rounded-md border border-white w-fit">
            {category}
          </span>

        </div>

      </div>
    </div>
  );
};

export default memo(ResearchCard);