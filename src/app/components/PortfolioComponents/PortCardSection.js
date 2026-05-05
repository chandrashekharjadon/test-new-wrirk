"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineArrowRight, MdOutlineArrowLeft } from "react-icons/md";
import PortfolioCards from "@/app/utils/Portfolioutils/PortfolioCards";
import {
  useGetAreasQuery,
  useGetDomainsQuery,
} from "@/app/services/wrirkda";

const PortCardSection = ({ hero, data }) => {
  /* ================= SAFE DATA ================= */
  const safeData = useMemo(() => data || [], [data]);

  /* ================= API ================= */
  const { data: areasData, isLoading: areasLoading } = useGetAreasQuery();
  const { data: domainsData, isLoading: domainsLoading } = useGetDomainsQuery();

  const areas = useMemo(() => areasData || [], [areasData]);
  const domains = useMemo(() => domainsData || [], [domainsData]);

  /* ================= STATE ================= */
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;

  /* ================= DOMAIN FILTER ================= */
  const filteredDomains = useMemo(() => {
    if (!selectedArea) return [];
    return domains.filter(
      (d) => d?.research_area?.slug === selectedArea
    );
  }, [domains, selectedArea]);

  /* ================= CARD FILTER ================= */
  const filteredData = useMemo(() => {
    if (!safeData.length) return [];

    const keyword = searchKeyword.trim().toLowerCase();

    return safeData.filter((item) => {
      const keywordMatch =
        !keyword ||
        item?.keywords?.some((k) =>
          k?.toLowerCase().includes(keyword)
        ) ||
        item?.title?.some((t) =>
          t?.value?.toLowerCase().includes(keyword)
        );

      const areaMatch =
        !selectedArea || item?.research_area === selectedArea;

      const domainMatch =
        !selectedDomain || item?.domain === selectedDomain;

      return keywordMatch && areaMatch && domainMatch;
    });
  }, [safeData, searchKeyword, selectedArea, selectedDomain]);

  /* ================= PAGINATION ================= */
  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / cardsPerPage);
  }, [filteredData.length]);

  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return filteredData.slice(start, start + cardsPerPage);
  }, [filteredData, currentPage]);

  /* ================= RESET PAGE ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedArea, selectedDomain]);

  /* ================= HANDLERS ================= */
  const handleSearch = useCallback((e) => {
    setSearchKeyword(e.target.value);
  }, []);

  const handleAreaChange = useCallback((e) => {
    const value = e.target.value;
    setSelectedArea(value);
    setSelectedDomain(""); // reset domain
  }, []);

  const handleDomainChange = useCallback((e) => {
    setSelectedDomain(e.target.value);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }, [totalPages]);

  /* ================= LOADING ================= */
  if (areasLoading || domainsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      {/* FILTER */}
      <div className="w-full mx-auto px-4 pt-8 pb-6">
        <h1 className="text-[30px] text-center font-black pb-4">
          {hero?.heading}
        </h1>

        {/* SEARCH */}
        <div className="flex mx-auto justify-center relative xl:w-1/3 md:w-2/3 w-full">
          <input
            type="search"
            placeholder="Type Keyword"
            value={searchKeyword}
            onChange={handleSearch}
            className="px-3 py-2 w-full rounded-full border text-sm"
          />
          <button
            type="button"
            className="absolute right-1 bg-[#2E8095] p-2 rounded-full"
          >
            <IoSearchOutline className="text-white" />
          </button>
        </div>

        {/* AREA + DOMAIN */}
        <div className="flex gap-4 mx-auto my-4 xl:w-1/3 md:w-2/3 w-full">

          <select
            value={selectedArea}
            onChange={handleAreaChange}
            className="px-3 py-2 w-full rounded-full border text-sm"
          >
            <option value="">All Research Areas</option>
            {areas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.title}
              </option>
            ))}
          </select>

          <select
            value={selectedDomain}
            onChange={handleDomainChange}
            disabled={!selectedArea}
            className="px-3 py-2 w-full rounded-full border text-sm"
          >
            <option value="">
              {selectedArea ? "All Domains" : "Select Area First"}
            </option>
            {filteredDomains.map((domain) => (
              <option key={domain.slug} value={domain.slug}>
                {domain.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* CARDS */}
      <div className="w-full grid px-6 pt-8 pb-10">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
          {currentCards.length > 0 ? (
            currentCards.map((item, index) => (
              <PortfolioCards key={item.id || index} items={item} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No results found
            </p>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="grid grid-cols-3 mb-6">

          <div className="flex justify-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="bg-[#002631] text-white px-4 py-2 rounded"
            >
              <MdOutlineArrowLeft /> Prev
            </button>
          </div>

          <div className="flex justify-center items-center">
            Page {currentPage} / {totalPages}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-[#002631] text-white px-4 py-2 rounded"
            >
              Next <MdOutlineArrowRight />
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default memo(PortCardSection);