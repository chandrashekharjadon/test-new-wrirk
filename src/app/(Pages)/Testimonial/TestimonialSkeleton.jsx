export default function TestimonialSkeleton() {
  return (
    <div className="w-full animate-pulse">

      {/* 🔷 HERO / BANNER */}
      <div className="w-full h-56 md:h-72 lg:h-96 bg-gray-200" />

      {/* 🔷 CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* 🔷 TITLE */}
        <div className="h-8 w-1/3 bg-gray-200 rounded mx-auto mb-6" />

        {/* 🔷 SUBTITLE */}
        <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto mb-10" />

        {/* 🔷 TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 space-y-4"
            >

              {/* Avatar */}
              <div className="w-14 h-14 bg-gray-200 rounded-full" />

              {/* Name */}
              <div className="h-4 w-1/2 bg-gray-200 rounded" />

              {/* Role */}
              <div className="h-3 w-1/3 bg-gray-200 rounded" />

              {/* Review text */}
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-5/6 bg-gray-200 rounded" />
                <div className="h-3 w-4/6 bg-gray-200 rounded" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 pt-2">
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
                <div className="w-4 h-4 bg-gray-200 rounded" />
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}