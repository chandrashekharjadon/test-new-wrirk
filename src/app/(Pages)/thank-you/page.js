import Link from "next/link";

export const metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center transition-transform duration-300 hover:scale-105">
        
        {/* ✅ Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* ✅ Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Thank You!
        </h1>

        {/* ✅ Message */}
        <p className="text-gray-600 mt-4">
          Your request has been submitted successfully.
          <br />
          Our team will contact you shortly.
        </p>

        {/* ✅ Use Next Link (important for performance) */}
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
}