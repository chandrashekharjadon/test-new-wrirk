export default function HeroSkeleton() {
  return (
    <div className="animate-pulse px-4 pt-24 max-w-6xl mx-auto">
      <div className="h-10 w-1/2 bg-gray-300 rounded mb-4"></div>
      <div className="h-5 w-3/4 bg-gray-300 rounded mb-6"></div>
      <div className="h-10 w-32 bg-gray-300 rounded"></div>
      <div className="mt-10 h-64 w-full bg-gray-300 rounded-xl"></div>
    </div>
  );
}