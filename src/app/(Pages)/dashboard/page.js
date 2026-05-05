"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const router = useRouter();

  const { crmSchlorData, loginStatus } = useSelector(
    (state) => state.crm
  );

  console.log('crmSchlorData', crmSchlorData);


  // ✅ FIX: wait for client mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const works = crmSchlorData?.works || [];

  // 🔐 Auth check (only after mount)
  useEffect(() => {
    if (!mounted) return;

    if (!loginStatus || !crmSchlorData?.id) {
      router.replace("/login");
    }
  }, [mounted, loginStatus, crmSchlorData, router]);

  // ⛔ Prevent hydration error
  if (!mounted) {
    return null;
  }

  // ⛔ Block if not logged in
  if (!loginStatus || !crmSchlorData?.id) {
    return null;
  }

  // 📅 Date formatter
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 sm:px-8 lg:px-20 pt-20 sm:pt-24 pb-12">

      {/* 👤 USER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
          Welcome, {crmSchlorData?.name}
        </h1>
        <p className="text-gray-500 text-sm">
          {crmSchlorData?.email}
        </p>
      </div>

      {/* 📌 HEADING */}
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
        All Works
      </h2>

      {/* 📦 WORK LIST */}
      <div className="space-y-4">
        {works.length === 0 ? (
          <p className="text-gray-500">No works found.</p>
        ) : (
          works.map((work) => (
            <div
              key={work.id}
              onClick={() => router.push(`/dashboard/${work.id}`)}
              className="bg-white border rounded-xl p-4 sm:p-6 cursor-pointer active:scale-[0.98] transition"
            >
              {/* 🔹 TOP INFO */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                <Info label="WORK ID" value={work?.wid} />

                <Info
                  label="WORK TYPE"
                  value={
                    Array.isArray(work?.work_details)
                      ? work.work_details.join(", ")
                      : "-"
                  }
                />

                <Info
                  label="PRICE"
                  value={`₹ ${work?.total_amount}`}
                />

                <Info
                  label="DATE"
                  value={formatDate(work?.assign_date)}
                />
              </div>

              {/* 🔹 STATUS */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                  Status
                </span>

                <span className="bg-[#e6eff3] text-[#2563eb] text-xs px-3 py-1 rounded-full">
                  {work?.status}
                </span>
              </div>

              {/* 🔹 DIVIDER */}
              <div className="my-4 border-t" />

              {/* 🔹 DESCRIPTION */}
              <p className="font-medium text-sm mb-1">
                Work Specification
              </p>

              <p className="text-gray-500 text-sm leading-relaxed">
                {work?.queries?.specification || "-"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🔁 Reusable
function Info({ label, value }) {
  return (
    <div>
      <p className="text-[10px] sm:text-xs text-gray-400">
        {label}
      </p>
      <p className="text-sm sm:text-base font-semibold break-words">
        {value || "-"}
      </p>
    </div>
  );
}