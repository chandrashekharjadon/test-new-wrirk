"use client";

import Loading from "@/app/loading";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function PaymentClient({ payment }) {

    if (!payment) return <Loading />;

    const paymentData = payment;

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied: " + text);
    };

    // Reusable Field
    const Field = ({ label, value }) => (
        <div>
            <p className="text-xs font-medium mb-1 text-gray-600">{label}</p>
            <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm hover:shadow transition">
                <span className="text-sm">{value}</span>
                <Copy size={14} className="cursor-pointer text-gray-500 hover:text-black" onClick={() => copyText(value)} />
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 min-h-screen pt-24 md:pt-28 lg:pt-32 pb-12 px-4">

            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="font-semibold text-lg">
                    {paymentData?.company?.name}
                </h1>
                <p className="text-xs mt-1 text-gray-700">
                    GSTIN NO: {paymentData?.company?.gst}
                </p>
            </div>

            {/* Top Section */}
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

                {/* Indian */}
                <div>
                    <h2 className="text-center text-sm font-semibold text-gray-700 mb-3">
                        For Bhartiya Payments
                    </h2>

                    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                        <h3 className="text-center font-semibold mb-4">Bank Transfer</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Account Number" value={paymentData?.indian?.account_number} />
                            <Field label="IFSC Code" value={paymentData?.indian?.ifsc} />
                        </div>

                        <div className="mt-3">
                            <Field label="Account Name" value={paymentData?.indian?.account_holder} />
                        </div>

                        <div className="flex justify-between text-xs mt-3 text-gray-600">
                            <p><b>Account Type:</b> {paymentData?.indian?.account_type}</p>
                            <p><b>Bank:</b> {paymentData?.indian?.bank_name}</p>
                        </div>
                    </div>
                </div>

                {/* International */}
                <div>
                    <h2 className="text-center text-sm font-semibold text-gray-700 mb-3">
                        For International Payments
                    </h2>

                    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                        <h3 className="text-center font-semibold mb-4">Bank Transfer</h3>

                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Account Number" value={paymentData?.international?.account_number} />
                            <Field label="SWIFT Code" value={paymentData?.international?.swift_code} />
                        </div>

                        <div className="mt-3">
                            <Field label="Account Name" value={paymentData?.international?.account_holder} />
                        </div>

                        <div className="flex justify-between text-xs mt-3 text-gray-600">
                            <p><b>Account Type:</b> {paymentData?.international?.account_type}</p>
                            <p><b>Bank:</b> {paymentData?.international?.bank_name}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-10">
                <div className="border-t border-gray-400 w-1/4"></div>
                <span className="mx-3 text-sm text-gray-600">or</span>
                <div className="border-t border-gray-400 w-1/4"></div>
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

                {/* LEFT → UPI + Razorpay */}
                <div className="grid md:grid-cols-2 gap-6 items-center">

                    {/* UPI */}
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                            Pay using QR or UPI
                        </p>

                        <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE}${paymentData?.other?.qrImage}`}
                            alt="QR Code"
                            width={192}   // w-48 = 48 * 4 = 192px
                            height={192}  // h-48 = 192px
                            className="mx-auto border p-2 bg-white rounded-xl shadow object-contain hover:scale-105 transition"
                            loading="lazy"
                        />

                        <div className="mt-3 flex items-center justify-center gap-2">
                            <span className="text-sm">UPI ID:</span>
                            <div className="flex items-center border border-gray-200 rounded px-2 py-1 bg-white shadow-sm">
                                <span className="text-sm">{paymentData?.other?.upi}</span>
                                <Copy
                                    size={14}
                                    className="ml-2 cursor-pointer"
                                    onClick={() => copyText(paymentData?.other?.upi)}
                                />
                            </div>
                        </div>

                        {/* Icons */}
                        <div className="flex justify-center items-center gap-8 mt-4">
                            <img src="https://img.icons8.com/color/48/google-pay.png" className="h-10 md:h-12" />
                            <img src="https://img.icons8.com/color/48/phone-pe.png" className="h-10 md:h-12" />
                            <img src="https://img.icons8.com/color/48/paytm.png" className="h-10 md:h-12" />
                        </div>
                    </div>

                    {/* Razorpay */}
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                            Credit / Debit Card
                        </p>

                        <a
                            href={paymentData?.other?.razorpaylink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">

                                <div className="relative mx-auto h-10 w-32">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STORAGE}${paymentData?.other?.razorpayImage}`}
                                        alt="Razorpay"
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </div>

                            </div>
                        </a>
                    </div>

                </div>

                {/* RIGHT → PayPal */}
                <div className="flex items-center justify-center">
                    <a href={paymentData?.other?.paypallink} target="_blank" className="w-full">
                        <div className="text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_STORAGE}${paymentData?.other?.paypalImage}`}
                                alt="PayPal"
                                width={120}
                                height={48}   // h-12 = 48px
                                className="h-12 w-auto mx-auto object-contain"
                                loading="lazy"
                            />
                            <p className="text-sm mt-3 text-blue-600 font-medium">
                                Pay with PayPal
                            </p>
                        </div>
                    </a>
                </div>

            </div>

            {/* Footer */}
            <div className="text-center mt-12">
                <a href={paymentData?.other?.contact}>
                    <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition">
                        Contact To Support
                    </button>
                </a>
            </div>

        </div>
    );
}