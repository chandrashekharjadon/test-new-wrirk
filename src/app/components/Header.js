"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useGetServiceQuery } from "@/app/services/quotation";

import { useSelector, useDispatch } from "react-redux";
import { clearData } from "@/app/features/crm/crmSlice";

const Header = ({ navbar, dynamicPages }) => {
  const dropdownRef = useRef(null);

  const [mounted, setMounted] = useState(false); // ✅ FIX
  const [showPricing, setShowPricing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);

  const { crmSchlorData, loginStatus } = useSelector((state) => state.crm);
  const dispatch = useDispatch();

  const { data: services } = useGetServiceQuery();

  // ✅ prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  // ✅ SAFE DATA
  const HEADER_LOGO = navbar?.logo ?? "";
  const HEADER_LINKS = Array.isArray(navbar?.menu_items)
    ? navbar.menu_items
    : [];

  const pages = Array.isArray(dynamicPages)
    ? dynamicPages
    : [];

  const PRICING_ITEMS = Array.isArray(services)
    ? services
    : [];

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.matches(":hover")) {
        setShowPricing(false);
      }
    }, 100);
  };

  const handleLogout = () => {
    dispatch(clearData());
    window.location.href = "/login";
  };

  // ⛔ DO NOT RENDER BEFORE MOUNT
  if (!mounted) return null;

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
          <Toaster />

          {/* LOGO */}
          <Link href="/">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE}${HEADER_LOGO}`}
              alt={navbar?.logo_alt || "logo"}
              width={55}
              height={55}
              className="rounded-full"
              property
            />
          </Link>

          {/* ================= DESKTOP ================= */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm">
            {/* LEFT NAV */}
            {HEADER_LINKS.filter(l => l.type === "nav")
              .slice(0, 2)
              .map(item => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}

            {/* PRICING */}
            <div
              className="relative"
              onMouseEnter={() => setShowPricing(true)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/Pricing">Pricing</Link>

              {showPricing && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-3 w-56 rounded-lg bg-[#2E8095]"
                >
                  {PRICING_ITEMS.map(item => (
                    <Link
                      key={item._id}
                      href={`/addon/service/${item._id}`}
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                    >
                      {item.Name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT NAV */}
            {HEADER_LINKS.filter(l => l.type === "nav")
              .slice(2)
              .map(item => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}

            {/* DYNAMIC PAGES */}
            {pages.map(page => (
              <Link key={page.slug} href={`/${page.slug}`}>
                {page.title}
              </Link>
            ))}

            <div className="h-8 border-l border-black/30" />

            {/* 🔐 AUTH / PROFILE */}
            {loginStatus && crmSchlorData?.name ? (
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2E8095] text-white font-semibold">
                  {crmSchlorData.name.charAt(0).toUpperCase()}
                </div>

                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              HEADER_LINKS
                .filter(l => l.label === "Sign in")
                .map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-[#2E8095]"
                  >
                    {item.label}
                  </Link>
                ))
            )}

            {/* 🌐 Contact Us (always visible) */}
            {HEADER_LINKS
              .filter(l => l.label === "Contact Us")
              .map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[#2E8095] px-6 py-2 text-[#2E8095] hover:bg-[#2E8095] hover:text-white"
                >
                  {item.label}
                </Link>
              )
              )
            }

          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* ================= MOBILE ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50">
          <aside className="fixed right-0 top-0 h-full w-72 bg-[#2E8095] p-5 overflow-y-auto flex flex-col">

            {/* ❌ Close */}
            <button
              className="mb-6 text-white text-xl self-end"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            {/* 🔗 NAV */}
            <div className="space-y-2">
              {HEADER_LINKS.filter(l => l.type === "nav").map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-white border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* 💰 PRICING */}
            <div className="mt-4">
              <button
                className="flex w-full justify-between py-2 text-white border-b border-white/10"
                onClick={() => setMobilePricingOpen(!mobilePricingOpen)}
              >
                Pricing
                <span>{mobilePricingOpen ? "−" : "+"}</span>
              </button>

              {mobilePricingOpen && (
                <div className="pl-4 mt-2 space-y-1">
                  {PRICING_ITEMS.map(item => (
                    <Link
                      key={item._id}
                      href={`/addon/service/${item._id}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1 text-sm text-white/90"
                    >
                      {item.Name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="my-4 border-t border-white/20" />

            {/* 👤 AUTH MOBILE (FIXED - NO HOVER) */}
            {loginStatus && crmSchlorData?.name ? (
              <div className="text-white">

                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#2E8095] font-semibold">
                    {crmSchlorData.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{crmSchlorData.name}</p>
                    <p className="text-xs opacity-70">{crmSchlorData.email}</p>
                  </div>
                </div>

                {/* Actions */}
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="block py-2 text-red-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {HEADER_LINKS
                  .filter(l => l.label === "Sign in")
                  .map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
              </div>
            )}

            {/* 📞 CONTACT (BOTTOM FIX) */}
            <div className="mt-auto pt-6">
              {HEADER_LINKS
                .filter(l => l.label === "Contact Us")
                .map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-center rounded-xl border border-white px-4 py-2 text-white hover:bg-white hover:text-[#2E8095] transition"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>

          </aside>
        </div>
      )}
    </>
  );
};

export default Header;