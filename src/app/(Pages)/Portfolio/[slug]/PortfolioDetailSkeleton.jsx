export default function PortfolioDetailSkeleton() {
  return (
    <div className="w-full animate-pulse">

      {/* 🔷 HERO / BANNER */}
      <div className="w-full h-56 md:h-72 lg:h-96 bg-gray-200" />

      {/* 🔷 MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex flex-col md:flex-row gap-6">

          {/* 🔷 SIDEBAR */}
          <div className="w-full md:w-[25%]">
            <div className="bg-gray-100 rounded-xl p-4 space-y-3">

              <div className="h-6 w-2/3 bg-gray-200 rounded" />

              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded" />
              ))}

            </div>
          </div>

          {/* 🔷 MAIN CONTENT */}
          <div className="w-full md:w-[75%] space-y-6">

            {/* Title */}
            <div className="h-8 w-2/3 bg-gray-200 rounded" />

            {/* Subtitle */}
            <div className="h-5 w-1/2 bg-gray-200 rounded" />

            {/* Paragraph blocks */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>

            {/* Image block */}
            <div className="w-full h-48 bg-gray-200 rounded-lg" />

            {/* More text */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>

            {/* Button / CTA */}
            <div className="h-10 w-40 bg-gray-200 rounded mt-4" />

          </div>

        </div>

      </div>
    </div>
  );
}