// app/components/Skeletons/CardSkeleton.jsx

export default function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mt-10">
      
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white p-6 rounded-2xl shadow-sm"
        >
          {/* Image */}
          <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>

          {/* Title */}
          <div className="h-5 bg-gray-300 w-3/4 mb-3"></div>

          {/* Text */}
          <div className="h-4 bg-gray-300 w-full mb-2"></div>
          <div className="h-4 bg-gray-300 w-5/6"></div>
        </div>
      ))}
      
    </div>
  );
}