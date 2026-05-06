import "@fontsource/poppins";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import Image from "next/image";
import Link from "next/link";

const Hero = ({ data }) => {
  const hero = data || {};

  return (
    <div className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:ps-32 md:ps-12 px-6">

        {/* LEFT */}
        <div className="w-full">

          {/* Heading */}
          <h1 className="font-poppins font-[700] text-[#0B1B35]
            text-[22px] sm:text-[30px] md:text-[40px] lg:text-[55px]
            leading-tight sm:leading-snug md:leading-[3rem] lg:leading-[4.4rem]
            py-3 text-center lg:text-left">
            {hero?.heroheading || "Loading..."}
          </h1>

          {/* Paragraph */}
          <div
            className="font-poppins font-[500] text-black
              text-[12px] sm:text-[13px] lg:text-[14px]
              leading-6 sm:leading-7
              text-left lg:text-justify lg:pe-14"
            dangerouslySetInnerHTML={{
              __html: hero?.heroParagraph || "<p>Loading...</p>",
            }}
          />

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-4 sm:py-5 lg:py-7">
            {hero?.hero_buttons?.length > 0 ? (
              hero.hero_buttons.map((item, index) => (
                <Link
                  key={index}
                  href={item?.link ?? "#"}
                  className={`
                    flex items-center justify-center gap-2
                    px-3 sm:px-4 lg:px-6 py-2
                    text-[12px]
                    border border-[#171717a3]
                    rounded-lg shadow-custom6
                    ${item.colors} ${item.texts}
                    whitespace-nowrap
                  `}
                >
                  <i className={`bi ${item.icon} text-sm`}></i>
                  {item.text}
                </Link>
              ))
            ) : (
              <div className="text-gray-400 text-sm">Loading buttons...</div>
            )}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex items-start justify-center relative">
          {hero?.heroimage ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE}${hero.heroimage}`}
              alt={hero.heroimage_alt || "hero image"}
              width={600}
              height={600}
              priority
              quality={70} // 🔥 reduce size
              sizes="(max-width: 1024px) 100vw, 65vw" // 🔥 VERY IMPORTANT
              className="w-full lg:w-[65vw] lg:h-[32vw] object-cover"
            />
          ) : (
            <div className="w-full h-[32vw] bg-gray-300 animate-pulse rounded-xl" />
          )}
        </div>

      </div>
    </div>
  );
};

export default Hero;