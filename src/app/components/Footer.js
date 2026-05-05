"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import "@fontsource/mulish";

const Footer = ({ data }) => {
  // ✅ Early return (fast)
  if (!data) {
    return (
      <div className="w-full bg-[#064454] py-10 animate-pulse" />
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";

  // ✅ Memoized values (prevents recalculation)
  const linkGroups = useMemo(() => data?.link_groups || [], [data]);
  const socialLinks = useMemo(() => data?.social_links || [], [data]);

  return (
    <footer className="w-full bg-[#064454] py-6 lg:py-10 px-8 lg:px-20 font-mulish">

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 pt-6 pb-2">

        {/* LOGO + DESC */}
        <div>
          <Image
            width={80}
            height={80}
            src={`${baseUrl}${data.image}`}
            alt={data.image_alt || "footer logo"}
            priority={false}
          />
          <p className="py-2 text-sm text-white">
            {data.description}
          </p>
        </div>

        {/* LINK GROUPS */}
        {linkGroups.map((group, index) => (
          <div key={group?.title || index} className="text-white">
            <h2 className="p-2 font-bold tracking-widest">
              {group.title}
            </h2>

            <ul className="text-sm">
              {group?.links?.map((link, i) => {
                const isInternal = link?.url?.startsWith("/");

                return (
                  <li key={link?.label || i} className="p-2">
                    {isInternal ? (
                      <Link
                        href={link.url}
                        className="hover:text-zinc-400"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-zinc-400"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* CONTACT */}
        <div className="text-white">
          <h2 className="p-2 font-bold tracking-widest">
            {data.heading}
          </h2>

          <ul className="text-sm">
            <li className="p-2">
              <a
                href={`mailto:${data.email}`}
                className="hover:text-zinc-400"
              >
                {data.email}
              </a>
            </li>
            <li className="p-2">
              <p>{data.address}</p>
            </li>
          </ul>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="flex items-center gap-5 py-4">
        {socialLinks.map((item, index) => (
          <a
            key={item?.url || index}
            href={item?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="social link"
          >
            <div className="w-7 h-7 rounded-lg bg-white hover:bg-[#F6AF03] flex items-center justify-center transition">
              <i
                className={`bi ${item.icon} text-[18px] text-[#064454] hover:text-white`}
              />
            </div>
          </a>
        ))}
      </div>

      {/* COPYRIGHT */}
      <div className="py-2">
        <p className="text-sm text-right text-white/70">
          {data.copyright}
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);