export default function HomeSkeleton() {
  return (
    <div className="px-4 pt-24 space-y-10 max-w-6xl mx-auto">
      
      {/* Hero */}
      <div className="animate-pulse">
        <div className="h-10 w-1/2 bg-gray-300 rounded mb-4"></div>
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl animate-pulse">
            <div className="h-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-5 bg-gray-300 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-5/6"></div>
          </div>
        ))}
      </div>

    </div>
  );
}