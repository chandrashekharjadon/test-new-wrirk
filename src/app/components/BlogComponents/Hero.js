"use client";

import React, { useState, useMemo, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = ({ data }) => {
  const blogData = data || {};

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* ================= DEBOUNCE ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  /* ================= FILTER ================= */
  const filteredCards = useMemo(() => {
    if (!blogData?.blog_cards) return [];

    if (!debouncedSearch) return blogData.blog_cards;

    return blogData.blog_cards.filter((item) =>
      item?.title?.toLowerCase().includes(debouncedSearch)
    );
  }, [debouncedSearch, blogData?.blog_cards]);

  /* ================= HELPERS ================= */
  const limitText = useCallback((text, limit = 140) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  }, []);

  const formatDate = useCallback((date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, []);

  const formatCount = useCallback((num) => {
    if (!num) return 0;
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  }, []);

  /* ================= HANDLER ================= */
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return (
    <div className="bg-[#f4f4f4] pt-24">
      <div className="mx-auto max-w-5xl px-4">

        {/* HEADER */}
        <div className="flex items-center justify-between py-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {blogData?.title}
          </h1>

          {/* SEARCH */}
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="w-full rounded-xl border border-gray-200 px-4 py-2 pr-10 text-sm shadow-sm focus:border-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="h-px w-full bg-gray-300" />

        {/* CARDS */}
        {filteredCards.length > 0 ? (
          filteredCards.map((item) => (
            <Link key={item.id} href={`/Blog/${item.slug}`}>
              <div className="mt-6 mb-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  {/* LEFT */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {item?.title}
                    </h2>

                    <div
                      className="mt-3 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: limitText(item?.description, 150),
                      }}
                    />

                    <div className="mt-4 flex gap-6 text-sm text-gray-400">
                      <span>{formatDate(item?.post_date)}</span>
                      <span>👏 {formatCount(item?.likes)}</span>
                      <span>💬 {formatCount(item?.comments)}</span>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="w-full md:w-56 shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE}${item?.image}`}
                      alt={item?.image_alt || "image"}
                      width={224}
                      height={144}
                      loading="lazy"
                      className="rounded-xl object-cover"
                    />
                  </div>

                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Hero);