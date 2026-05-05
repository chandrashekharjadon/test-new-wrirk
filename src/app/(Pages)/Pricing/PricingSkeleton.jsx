const PricingSkeleton = () => {
  return (
    <div className="w-full pt-28 pb-32 px-4 bg-[#DEEAEF] animate-pulse">
      <div className="h-6 w-40 bg-gray-300 mx-auto mb-4 rounded" />
      <div className="h-10 w-96 bg-gray-300 mx-auto mb-10 rounded" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl">
            <div className="h-6 bg-gray-300 mb-4 rounded" />
            <div className="h-4 bg-gray-200 mb-2 rounded" />
            <div className="h-4 bg-gray-200 mb-2 rounded" />
            <div className="h-10 bg-gray-300 mt-6 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSkeleton;