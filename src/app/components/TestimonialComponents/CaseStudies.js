"use client";

import React, { useState, useMemo, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";

const CaseStudies = ({ title, case_studies = [] }) => {

  if (!case_studies.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No case studies found
      </div>
    );
  }

  const [open, setOpen] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  /* ================= PAGINATION ================= */
  const totalPages = useMemo(
    () => Math.ceil(case_studies.length / itemsPerPage),
    [case_studies.length]
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return case_studies.slice(start, start + itemsPerPage);
  }, [case_studies, currentPage]);

  /* ================= HANDLERS ================= */
  const toggleReadMore = useCallback((id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <section className="py-8">
      <div className="mx-auto max-w-5xl px-4">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {title}
        </h1>

        {/* CARDS */}
        <div className="my-8">
          {paginatedData.map((item) => {
            const imageUrl = `${baseUrl}${item?.image || ""}`;

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-custom9 p-6 mb-6"
              >
                {/* IMAGE */}
                <div className="w-20 h-20 relative rounded-xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={item?.image_alt || "case study"}
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item?.title}
                  </h2>

                  <div
                    className={`mt-2 text-gray-600 text-sm leading-relaxed ${
                      open[item.id] ? "" : "line-clamp-3"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  />

                  <button
                    onClick={() => toggleReadMore(item.id)}
                    className="mt-2 text-blue-600 font-semibold hover:underline"
                  >
                    {open[item.id] ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-12">

            <ChevronLeft
              size={40}
              onClick={prevPage}
              className="cursor-pointer text-gray-500 hover:text-black"
            />

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <span
                    key={i}
                    onClick={() => goToPage(page)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      currentPage === page
                        ? "bg-gray-800 scale-110"
                        : "bg-gray-300"
                    }`}
                  />
                );
              })}
            </div>

            <ChevronRight
              size={40}
              onClick={nextPage}
              className="cursor-pointer text-gray-500 hover:text-black"
            />

          </div>
        )}
      </div>
    </section>
  );
};

export default memo(CaseStudies);