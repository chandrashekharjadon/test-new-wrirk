export default function PortfolioSkeleton() {
  return (
    <div className="w-full animate-pulse">

      {/* 🔷 Hero Section */}
      <div className="w-full h-56 md:h-72 lg:h-96 bg-gray-200" />

      {/* 🔷 Page Title */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-8" />

        {/* 🔷 Filters / Tabs */}
        <div className="flex gap-3 mb-10 flex-wrap">
          <div className="h-8 w-20 bg-gray-200 rounded-full" />
          <div className="h-8 w-24 bg-gray-200 rounded-full" />
          <div className="h-8 w-16 bg-gray-200 rounded-full" />
          <div className="h-8 w-28 bg-gray-200 rounded-full" />
        </div>

        {/* 🔷 Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden">

              {/* Image */}
              <div className="h-48 bg-gray-200" />

              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />

                {/* Button placeholder */}
                <div className="h-8 w-24 bg-gray-200 rounded mt-4" />
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}