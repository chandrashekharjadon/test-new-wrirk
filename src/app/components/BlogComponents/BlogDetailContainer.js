"use client";

import React, { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BlogDetailContainer = ({
  card_title,
  card_desc,
  card_image_src,
  card_image_alt,
  card_post_date,
  card_likes,
  card_comments,
}) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";

  /* ================= HELPERS ================= */

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCount = (num) => {
    if (!num) return 0;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const imageSrc = `${baseUrl}${card_image_src || ""}`;

  return (
    <div className="bg-[#f4f4f4] pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4">

        {/* BACK */}
        <div className="flex items-center justify-end h-16">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Go back"
          >
            <span className="text-3xl">← Back</span>
          </button>
        </div>

        <div className="h-px w-full bg-gray-300 mb-8" />

        {/* IMAGE */}
        <div className="mt-8 rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={imageSrc}
            alt={card_image_alt || card_title || "blog image"}
            width={1200}
            height={700}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* TITLE */}
        <h1 className="mt-8 text-2xl sm:text-3xl md:text-5xl font-extrabold text-black leading-snug tracking-wide">
          {card_title}
        </h1>

        {/* DATE */}
        <p className="mt-4 text-sm text-gray-400 tracking-wide">
          {formatDate(card_post_date)}
        </p>

        <hr className="my-4 border-gray-300" />

        {/* REACTIONS */}
        <div className="flex items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">👏</span>
            <span className="font-medium">{formatCount(card_likes)}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <span className="font-medium">{formatCount(card_comments)}</span>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* CONTENT */}
        <div
          className="max-w-3xl text-[17px] md:text-[18px] leading-[1.75] text-gray-900 space-y-6"
          dangerouslySetInnerHTML={{ __html: card_desc }}
        />
      </div>
    </div>
  );
};

export default memo(BlogDetailContainer);