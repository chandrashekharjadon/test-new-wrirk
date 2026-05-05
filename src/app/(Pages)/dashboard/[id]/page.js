"use client";

import Loading from "@/app/loading";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function WorkDetailPage() {

  const { id } = useParams();
  const router = useRouter();

  const { crmSchlorData } = useSelector((state) => state.crm);

  const [sales, setSales] = useState(null);
  const [work, setWork] = useState(null);
  const [modules, setModules] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // ✅ FIND WORK BY ID
  useEffect(() => {
    if (!crmSchlorData?.works) return;

    const foundWork = crmSchlorData.works.find(
      (w) => String(w.id) === String(id)
    );

    const salesData = crmSchlorData?.sales;


    setSales(salesData || null);
    setWork(foundWork || null);
    setModules(foundWork?.modules || []);
    setTransactions(foundWork?.transactions || []);
  }, [crmSchlorData, id]);

  // ⛔ loading handle
  if (!work) {
    return (
      <Loading />
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] px-4 sm:px-10 lg:px-20 pt-20 sm:pt-28 lg:pt-32 pb-12">

      {/* ================= HEADER ================= */}
      <div className="mb-6 sm:mb-8 mt-4 sm:mt-[25px]">
        <h1 className="text-xl sm:text-2xl lg:text-[34px] font-semibold text-[#111827] mb-1">
          All Works
        </h1>
        <p className="text-[#6b7280] text-sm sm:text-[15px]">
          Overview Of Your Current Academic Work And Project Details.
        </p>
      </div>

      {/* ================= ALL CONTENT ================= */}
      <div className="space-y-6">

        {/* ================= WORK DETAILS ================= */}
        <div className="bg-white border border-[#e5e7eb] rounded-[10px] px-10 py-7 space-y-6">

          {/* Work ID */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-[#e5e7eb] rounded-lg px-4 sm:px-6 py-3 sm:py-4 bg-[#f9fafb]">
            <div>
              <p className="text-xs text-gray-500">WORK ID</p>
              <p className="font-semibold text-gray-800">
                {work?.wid}
              </p>
            </div>

            <span className="text-xs px-4 py-1.5 rounded-full bg-teal-100 text-teal-700 font-medium w-fit">
              {work?.status}
            </span>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12">
            {[
              { label: "WORK TYPE", value: work?.work_details },
              { label: "AREA / CATEGORY", value: work?.queries?.area?.name },
              { label: "TITLE", value: work?.queries?.title },
              { label: "LANGUAGE", value: work?.queries?.lang },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#e5e7eb] rounded-lg p-4 sm:p-5 bg-[#f9fafb]"
              >
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-800 mt-1 text-sm sm:text-base">
                  {item.value || "Not Available"}
                </p>
              </div>
            ))}
          </div>

          {/* Specification */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-12">

            {/* SPEC */}
            <div className="sm:col-span-2 border border-[#e5e7eb] rounded-lg p-4 sm:p-5 bg-[#f9fafb]">
              <p className="text-xs text-gray-500 mb-1">
                WORK SPECIFICATION
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {work?.queries?.specification || "Not Available"}
              </p>
            </div>

            {[
              { label: "ASSIGNED DATE", value: formatDate(work?.assign_date) },
              { label: "INSTALLMENTS", value: work?.installments || 0 },
              { label: "REVISIONS", value: work?.revision || "0" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#e5e7eb] rounded-lg p-4 sm:p-5 bg-[#f9fafb] text-left sm:text-center"
              >
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="font-semibold text-gray-800 mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="border border-[#e5e7eb] rounded-lg p-4 sm:p-5 bg-[#f9fafb]">
            <p className="text-xs text-gray-500 mb-1">NOTES</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {work?.notes || "Not Available"}
            </p>
          </div>

          {/* Team */}
          <div className="border border-[#e5e7eb] rounded-lg p-4 sm:p-5 bg-[#f9fafb]">
            <p className="font-semibold text-gray-800 mb-4">
              Assigned Team
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
              {[
                { initials: getInitials(sales?.name), name: sales?.name || "Not Available" },
                { initials: getInitials("Priya Sharma"), name: "Priya Sharma" },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-teal-700 text-white flex items-center justify-center rounded-full font-medium">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {member.name}
                    </p>
                    <Link
                      href="/contact"
                      className="text-xs text-teal-600 hover:underline"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= MODULES ================= */}
          <div className="w-full font-sans p-4 sm:p-6 bg-white">

            {/* Heading */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-6 sm:mb-8">
              Modules
            </h1>

            {/* Header Bar */}
            <div className="bg-[#003d4d] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md mb-6 sm:mb-8">
              <h2 className="text-xs sm:text-sm font-bold tracking-wider">
                {work?.wid || 0}
              </h2>
            </div>

            {/* ================= MOBILE VIEW (CARDS) ================= */}
            <div className="block sm:hidden space-y-4">
              {modules.length === 0 ? (
                <p className="text-center text-gray-500">No modules found</p>
              ) : (
                modules.map((mod, i) => (
                  <div
                    key={mod.id || i}
                    className="bg-[#f1f5f9] border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-sm">#{i + 1}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded uppercase font-bold">
                        {mod?.status || "Pending"}
                      </span>
                    </div>

                    <p className="font-semibold text-gray-800">
                      {mod?.name || "-"}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-600">
                      <p>Cost: ₹ {mod?.amount || "0.00"}</p>
                      <p>Payable: {mod?.payble_per || 0}%</p>
                      <p>
                        Date:{" "}
                        {mod?.required_date
                          ? formatDate(mod.required_date)
                          : "-"}
                      </p>
                      <p className="truncate">
                        Update:{" "}
                        {mod?.lastupdate
                          ? `${mod.lastupdate.description}`
                          : "No Updates"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ================= DESKTOP VIEW (TABLE) ================= */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm border-collapse">

                <thead>
                  <tr className="text-black font-bold text-left">
                    <th className="px-4 py-3">SN.</th>
                    <th className="px-4 py-3">Mod Name</th>
                    <th className="px-4 py-3 text-center">Cost</th>
                    <th className="px-4 py-3 text-center">Payable</th>
                    <th className="px-4 py-3 text-center">Date</th>
                    <th className="px-4 py-3 text-center">Updates</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>

                <tbody className="font-medium">
                  {modules.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500">
                        No modules found
                      </td>
                    </tr>
                  ) : (
                    modules.map((mod, i) => (
                      <tr
                        key={mod.id || i}
                        className="bg-[#cbd5d8] text-[#003d4d] border-b border-white"
                      >
                        <td className="px-4 py-3">{i + 1}</td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          {mod?.name || "-"}
                        </td>

                        <td className="px-4 py-3 text-center">
                          ₹ {mod?.amount || "0.00"}
                        </td>

                        <td className="px-4 py-3 text-center">
                          {mod?.payble_per || 0}%
                        </td>

                        <td className="px-4 py-3 text-center whitespace-nowrap">
                          {mod?.required_date
                            ? formatDate(mod.required_date)
                            : "-"}
                        </td>

                        <td className="px-4 py-3 text-center max-w-[200px] truncate">
                          {mod?.lastupdate
                            ? `${mod.lastupdate.description} / ${mod.lastupdate.status}`
                            : "No Updates"}
                        </td>

                        <td className="px-4 py-3 text-center">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs font-bold uppercase">
                            {mod?.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>

          {/* ================= PAYMENTS ================= */}
          <div className="w-full font-sans bg-white p-4 sm:p-6 rounded-xl">

            {/* ================= HEADER ================= */}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-5">

              <div>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Payments & Billing
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Choose how you want to pay and track your payments.
                </p>
              </div>

              <div className="bg-gray-50 px-3 py-2 rounded-md w-fit sm:text-right">
                <p className="text-[10px] text-gray-400 uppercase font-semibold">
                  Work ID
                </p>
                <p className="text-sm sm:text-base font-bold text-gray-800">
                  {work?.wid}
                </p>
              </div>

            </div>

            {/* ================= SUMMARY ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-[10px] font-semibold text-gray-500 uppercase">
                  Total Amount
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1">
                  ₹{work?.total_amount || 0}
                </p>
              </div>

              <div className="bg-green-100 rounded-lg p-4">
                <p className="text-[10px] font-semibold text-green-700 uppercase">
                  Paid
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-700 mt-1">
                  ₹{work?.pre_total_amount || 0}
                </p>
              </div>

              <div className="bg-red-100 rounded-lg p-4">
                <p className="text-[10px] font-semibold text-red-600 uppercase">
                  Due
                </p>
                <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">
                  ₹{work?.due_amt || 0}
                </p>
              </div>

            </div>

            {/* ================= PAYMENT BOX ================= */}
            <div className="border rounded-xl p-4 sm:p-6 space-y-4">

              <p className="text-sm font-semibold text-gray-800">
                Select Payment Mode
              </p>

              {/* ================= TABS ================= */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

                <button className="flex-shrink-0 bg-[#003d4d] text-white px-4 py-2 rounded-md text-xs font-semibold">
                  Full Payment
                </button>

                <button className="flex-shrink-0 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-xs font-semibold">
                  Installment
                </button>

                <button className="flex-shrink-0 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-xs font-semibold">
                  Module Wise
                </button>

              </div>

              {/* ================= TITLE ================= */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Pay Full Amount
              </h3>

              {/* ================= AMOUNT CARD ================= */}
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Total Due
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ₹{work?.due_amt || 0}
                  </p>
                </div>

                <button className="w-full sm:w-auto bg-[#003d4d] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#002a35] transition">
                  Pay ₹{work?.due_amt || 0}
                </button>

              </div>

            </div>

          </div>

          {/* ================= PAYMENT HISTORY ================= */}
          <div className="w-full font-sans p-4 sm:p-6 bg-white">

            {/* HEADER */}
            <div className="bg-[#003d4d] text-white px-4 sm:px-6 py-3 rounded-lg shadow mb-6">
              <h2 className="text-base sm:text-lg font-bold">
                Payment History
              </h2>
            </div>

            {/* ================= MOBILE VIEW ================= */}
            <div className="space-y-3 sm:hidden">
              {transactions.length === 0 ? (
                <p className="text-center text-gray-500 text-sm">
                  No transactions found
                </p>
              ) : (
                transactions.map((trans, i) => (
                  <div
                    key={trans.id || i}
                    className="border rounded-lg p-3 bg-gray-50 space-y-2"
                  >
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-xs font-medium">
                        {trans?.datestamp || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm">
                        {trans?.remark || "Payment received"}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-semibold">
                        ₹ {trans?.credit || 0}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-xs text-gray-500">Method</p>
                      <p className="text-xs uppercase">
                        {trans?.mode || "-"}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Status</p>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-[10px] uppercase">
                        {trans?.status || "Unknown"}
                      </span>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-4 pt-2">

                      {trans?.receipt_url ? (
                        <a
                          href={trans.receipt_url}
                          className="text-xs text-blue-600 underline"
                        >
                          Receipt
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Receipt
                        </span>
                      )}

                      {trans?.invoice_url ? (
                        <a
                          href={trans.invoice_url}
                          className="text-xs text-blue-600 underline"
                        >
                          Invoice
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Invoice
                        </span>
                      )}

                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm border-collapse">

                <thead>
                  <tr className="text-gray-900 font-semibold text-left border-b">
                    <th className="px-3 py-3">Date</th>
                    <th className="px-3 py-3">Description</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Method</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((trans, i) => (
                      <tr
                        key={trans.id || i}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-3 py-4 whitespace-nowrap">
                          {trans?.datestamp || "-"}
                        </td>

                        <td className="px-3 py-4 max-w-xs">
                          {trans?.remark || "Payment received"}
                        </td>

                        <td className="px-3 py-4">
                          ₹ {trans?.credit || 0}
                        </td>

                        <td className="px-3 py-4 uppercase">
                          {trans?.mode || "-"}
                        </td>

                        <td className="px-3 py-4">
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-xs uppercase">
                            {trans?.status || "Unknown"}
                          </span>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex justify-center gap-4 text-xs">

                            {trans?.receipt_url ? (
                              <a
                                href={trans.receipt_url}
                                className="text-blue-600 hover:underline"
                              >
                                Receipt
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                Receipt
                              </span>
                            )}

                            {trans?.invoice_url ? (
                              <a
                                href={trans.invoice_url}
                                className="text-blue-600 hover:underline"
                              >
                                Invoice
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                Invoice
                              </span>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}