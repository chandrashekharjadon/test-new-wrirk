export default function BlogSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-24">
      <div className="h-8 w-40 bg-gray-300 rounded mb-6 animate-pulse" />

      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl mt-6 animate-pulse">
          <div className="h-6 bg-gray-300 w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 w-full mb-2"></div>
          <div className="h-4 bg-gray-300 w-5/6"></div>
        </div>
      ))}
    </div>
  );
}