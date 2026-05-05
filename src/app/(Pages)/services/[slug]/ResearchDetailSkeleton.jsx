export default function ResearchDetailSkeleton() {
  return (
    <div className="w-full animate-pulse">

      {/* 🔷 Hero Section */}
      <div className="w-full bg-gray-200 h-64 md:h-80 lg:h-96" />

      {/* 🔷 Content Wrapper */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Title */}
        <div className="h-8 w-2/3 bg-gray-200 rounded mb-6" />

        {/* Meta / Tags */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>

        {/* Paragraph lines */}
        <div className="space-y-3 mb-10">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-10/12 bg-gray-200 rounded" />
          <div className="h-4 w-9/12 bg-gray-200 rounded" />
        </div>

        {/* Section blocks */}
        <div className="space-y-8">

          {/* Section 1 */}
          <div>
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <div className="h-6 w-1/4 bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-10/12 bg-gray-200 rounded" />
              <div className="h-4 w-8/12 bg-gray-200 rounded" />
            </div>
          </div>

        </div>

        {/* 🔷 Related Cards */}
        <div className="mt-12">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}