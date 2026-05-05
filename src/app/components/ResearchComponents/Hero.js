import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const Hero = ({ data }) => {
  if (!data) return null;

  const imageUrl = `${process.env.NEXT_PUBLIC_STORAGE}${data?.image || ""}`;

  return (
    <div className="w-full pt-28 md:pt-24 lg:pt-36 pb-12 bg-[#002631]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:ps-32 md:ps-12 ps-6 pe-6">

        {/* LEFT */}
        <div className="w-full pe-0">
          <h1 className={`lg:leading-[3.4rem] md:leading-[3rem] sm:leading-[2rem] leading-[1.5rem] py-3 text-white lg:text-[40px] md:text-[40px] sm:text-[32px] text-[22px] ${poppins.className} font-medium text-center lg:text-start`}>
            {data.heading}
          </h1>

          <div
            className={`lg:text-[14px] text-[12px] text-[#FFFFFFC7] text-justify ${poppins.className} font-medium leading-7`}
            dangerouslySetInnerHTML={{ __html: data?.paragraph || "" }}
          />
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full hidden lg:flex items-start justify-center px-2 relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={data.image_alt || "hero image"}
              width={800}
              height={600}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw" // 🔥 CRITICAL FIX
              quality={50} // 🔥 reduce payload
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;