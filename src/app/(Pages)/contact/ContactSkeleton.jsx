import React from "react";

const ContactSkeleton = () => {
  return (
    <div className="animate-pulse px-4 lg:px-10 py-24">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="h-8 w-1/2 bg-gray-300 rounded"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-40 bg-gray-300 rounded"></div>
          <div className="h-40 bg-gray-300 rounded"></div>
        </div>

        <div className="h-64 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ContactSkeleton;