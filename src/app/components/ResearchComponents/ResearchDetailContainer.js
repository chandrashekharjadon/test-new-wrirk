"use client";

import React, { memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ResearchDetailContainer = ({ slug, data, categories }) => {
  const router = useRouter();

  // ✅ No loading check here (handled in parent)  

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";

  const pdfUrl = useMemo(() => {
    return data?.pdf ? `${baseUrl}${data.pdf}` : null;
  }, [baseUrl, data?.pdf]);

  const handleCategoryClick = useCallback(
    (catSlug) => {
      router.push(`/services/${catSlug}`);
    },
    [router]
  );

  return (
    <div className="w-full px-4 lg:px-10 pb-10 pt-24">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <div className="w-full md:w-[20%] lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-xl p-4">

            <h2 className="text-[18px] font-bold text-[#002631] mb-2">
              Select Your Categories
            </h2>

            <div className="flex flex-col gap-1">
              {categories.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCategoryClick(card.slug)}
                  className={`cursor-pointer p-1 rounded-md transition-colors ${slug === card.slug
                    ? "bg-[#002631] text-white"
                    : "hover:bg-gray-100"
                    }`}
                >
                  <h3 className="text-[12px]">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-[80%]">
          <div className="bg-white rounded-xl border border-[#00000082] overflow-hidden p-6">

            <h1 className="text-[28px] text-center font-semibold text-[#002631] mb-6">
              {data.title}
            </h1>

            {data?.detail?.map((item, index) => {
              const imageUrl = `${baseUrl}${item.image}`;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4"
                >
                  {isEven && (
                    <div className="col-span-1">
                      <Image
                        src={imageUrl}
                        alt={item.image_alt || "image"}
                        width={300}
                        height={200}
                        sizes="(max-width: 768px) 100vw, 300px"
                        quality={65}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="col-span-3">
                    <p className="text-[15px] text-[#002631] mb-6">
                      {item.description}
                    </p>
                  </div>

                  {!isEven && (
                    <div className="col-span-1">
                      <Image
                        src={imageUrl}
                        alt={item.image_alt || "image"}
                        width={300}
                        height={200}
                        sizes="(max-width: 768px) 100vw, 300px"
                        quality={65}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* PDF */}
            {pdfUrl && (
              <div className="flex justify-end mt-6">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  📄 Download PDF
                </a>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default memo(ResearchDetailContainer);