import Contact from "./Contact";

const Hero = ({ data, areas, domains }) => {
  return (
    <div className="bg-[#f4f4f4]">
      <div className="w-full text-center pt-24 pb-4 px-4">
        <h1 className="font-[950] text-[#F6AF03] lg:text-[46px] text-[32px]">
          Contact Us
        </h1>
        <p className="text-[16px] text-[#717171] font-semibold">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      <Contact data={data} areas={areas} domains={domains} />
    </div>
  );
};

export default Hero;