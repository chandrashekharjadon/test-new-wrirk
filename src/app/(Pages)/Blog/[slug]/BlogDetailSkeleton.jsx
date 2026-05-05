import React from "react";

const BlogDetailSkeleton = () => {
  return (
    <div className="w-full px-4 lg:px-10 pb-10 pt-24 animate-pulse">
      <div className="bg-white rounded-xl border border-[#00000020] p-6">

        {/* 🔹 TITLE */}
        <div className="h-8 w-2/3 mx-auto bg-gray-300 rounded mb-6"></div>

        {/* 🔹 HERO IMAGE */}
        <div className="w-full h-64 bg-gray-300 rounded-lg mb-8"></div>

        {/* 🔹 CONTENT BLOCKS */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 py-4"
          >
            {/* IMAGE LEFT */}
            {index % 2 === 0 && (
              <div className="col-span-1 h-48 bg-gray-300 rounded-lg"></div>
            )}

            {/* TEXT */}
            <div className="col-span-3 space-y-3">
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>

            {/* IMAGE RIGHT */}
            {index % 2 !== 0 && (
              <div className="col-span-1 h-48 bg-gray-300 rounded-lg"></div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default BlogDetailSkeleton;