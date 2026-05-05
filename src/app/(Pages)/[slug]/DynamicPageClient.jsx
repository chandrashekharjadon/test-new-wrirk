"use client";

import React, { memo } from "react";
import Image from "next/image";

const DynamicPageClient = ({ data }) => {
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No data found</p>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";
  const components = data?.components || [];

  return (
    <div className="w-full px-4 lg:px-10 pb-10 pt-24">
      <div className="bg-white rounded-xl border border-[#00000020] p-6">

        {/* TITLE */}
        <h1 className="text-[28px] text-center font-semibold text-[#002631] mb-6">
          {data?.title}
        </h1>

        {/* CONTENT */}
        {components.map((item, index) => {
          const isEven = index % 2 === 0;
          const imageUrl = item?.attachment
            ? `${baseUrl}${item.attachment}`
            : null;

          return (
            <div
              key={item.id || index}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4"
            >
              {/* LEFT IMAGE */}
              {isEven && imageUrl && (
                <div className="col-span-1 relative w-full h-64">
                  <Image
                    src={imageUrl}
                    alt={item.file_alt || "image"}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-lg"
                    loading="lazy"
                    quality={40}
                  />
                </div>
              )}

              {/* TEXT */}
              <div className="col-span-3">
                <div
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  className="prose max-w-none text-[#002631]"
                />
              </div>

              {/* RIGHT IMAGE */}
              {!isEven && imageUrl && (
                <div className="col-span-1 relative w-full h-64">
                  <Image
                    src={imageUrl}
                    alt={item.file_alt || "image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(DynamicPageClient);