"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import ResearchCard from "@/app/components/ResearchComponents/ResearchCard";
import "@fontsource/poppins/600.css";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineArrowRight, MdOutlineArrowLeft } from "react-icons/md";

const ResearchCardContainer = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const cardsPerPage = 6;
  const cards = data || [];

  /* 🔥 DEBOUNCE (IMPORTANT) */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* 🔎 FILTER */
  const filteredCards = useMemo(() => {
    if (!debouncedSearch) return cards;

    const term = debouncedSearch.toLowerCase();

    return cards.filter((item) =>
      item?.title?.toLowerCase().includes(term)
    );
  }, [cards, debouncedSearch]);

  /* 📄 PAGINATION */
  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredCards.slice(start, start + cardsPerPage);
  }, [filteredCards, currentPage]);

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  /* ⚡ HANDLERS */
  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="w-full">

      {/* Header */}
      <div className="w-full py-8 grid grid-cols-1 lg:grid-cols-3 px-4">

        <div className="col-span-1 lg:col-span-2 flex justify-center lg:justify-end items-center pb-4 lg:pb-0">
          <h5 className="text-black lg:text-[32px] text-[24px] font-poppins font-semibold">
            Select Your Research Category
          </h5>
        </div>

        {/* Search */}
        <div className="col-span-1 flex justify-end items-center">
          <div className="flex w-full lg:px-2 relative">

            <input
              type="search"
              placeholder="Search Your Research Category"
              className="px-3 py-3 w-full rounded-xl bg-[#D9D9D994] border placeholder:text-[#232323] placeholder:text-[12px] focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <IoSearchOutline className="text-[22px] text-black" />
            </button>

          </div>
        </div>

      </div>

      {/* Cards */}
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-24 gap-y-10 lg:gap-y-14 place-items-center pt-2">

          {currentCards.length > 0 ? (
            currentCards.map((item) => (
              <ResearchCard key={item.id} {...item} />
            ))
          ) : (
            <p className="col-span-3 text-gray-500">No research found</p>
          )}

        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="grid mb-4 grid-cols-3 gap-4">

          <div className="flex justify-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "bg-gray-400" : "bg-[#002631]"
              } text-white py-2 px-4 rounded text-[12px] flex items-center gap-2`}
            >
              <MdOutlineArrowLeft className="text-[18px]" />
              Previous
            </button>
          </div>

          <div className="flex justify-center items-center">
            <span className="text-black text-[12px]">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages ? "bg-gray-400" : "bg-[#002631]"
              } text-white py-2 px-4 rounded text-[12px] flex items-center gap-2`}
            >
              Next
              <MdOutlineArrowRight className="text-[18px]" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default ResearchCardContainer;