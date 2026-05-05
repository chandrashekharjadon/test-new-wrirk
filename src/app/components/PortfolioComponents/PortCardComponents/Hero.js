import Image from "next/image";
import Contact from "../../ContactusComponents/Contact";

const Hero = ({ details, contact }) => {
  if (!details) return null;

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE || "";

  // ✅ safer URL
  const imageUrl = details?.detail_image
    ? `${baseUrl}${details.detail_image}`
    : "/placeholder.png";

  return (
    <div>
      {/* HERO */}
      <div className="bg-[#064454] w-full mt-20 flex items-center justify-center">
        <div className="px-6 md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-6 flex flex-col md:flex-row">

          {/* IMAGE */}
          <div className="overflow-hidden md:-mt-16 w-full md:w-1/3 flex justify-center items-center py-4 px-2">
            <Image
              src={imageUrl}
              alt={details?.details_image_alt || "portfolio image"}
              width={400}
              height={400}
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              quality={75}   // ✅ reduce size
              className="mt-10 object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="text-start py-4 px-2 md:px-4 lg:px-6 w-full md:w-2/3">

            <h1 className="text-white font-bold text-[16px] md:text-[18px] lg:text-[22px] pb-2">
              {details?.detail_title}
            </h1>

            <p className="text-white font-medium text-[12px] md:text-[14px] lg:text-[16px] py-1 md:pe-0 lg:pe-10 xl:pe-28 text-justify whitespace-pre-line">
              {details?.detail_description}
            </p>

            <div className="flex justify-between items-end pt-4">

              <button className="text-[#064454] bg-[#D9D9D9] text-[12px] md:text-[14px] lg:text-[16px] px-2 md:px-4 lg:px-8 py-2 rounded-lg font-semibold">
                {details?.btn1}
              </button>

              {/* Decorative image */}
              <div className="hidden md:block">
                <Image
                  src="/Images/portcard-share.png"
                  alt="share"
                  width={150}
                  height={150}
                  loading="lazy"   // ✅ not critical
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <Contact data={contact} />
    </div>
  );
};

export default Hero;