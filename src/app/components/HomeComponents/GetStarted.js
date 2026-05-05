import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import '@fontsource/roboto';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/500.css';
import { PiPaperPlaneRightFill } from "react-icons/pi";

const GetStarted = ({ data }) => {

  const storage = process.env.NEXT_PUBLIC_STORAGE;

  if (!data) return null;

  return (
    <div className='py-10 px-8 lg:px-20'>
      <div className='bg-[#F1F1F1] rounded-[32px] shadow-custom9 py-8 lg:py-0 px-5 lg:px-0'>

        <div className='grid grid-cols-1 lg:grid-cols-12'>

          {/* IMAGE */}
          <div className='col-span-1 lg:col-span-2 flex justify-center items-center lg:justify-start lg:items-start'>
            {data?.get_stated_image && (
              <Image
                src={`${storage}${data.get_stated_image}`}
                alt={data?.get_stated_image_alt || 'image'}
                width={180}
                height={180}
                loading="lazy" // ✅ keep if below fold
                sizes="(max-width: 768px) 100vw, 180px" // 🔥 important
                quality={70} // 🔥 reduce size
              />
            )}
          </div>

          {/* TEXT */}
          <div className='col-span-1 lg:col-span-7 flex flex-col justify-center pt-4 lg:pt-0'>
            <h2 className='text-[32px] font-[700] font-roboto text-[#212529] text-center lg:text-start'>
              {data?.get_stated_heading}
            </h2>

            <h6 className='text-[22px] font-[500] font-roboto text-[#212529] text-center lg:text-start'>
              {data?.get_stated_paragraph}
            </h6>
          </div>

          {/* BUTTON */}
          <div className='col-span-1 lg:col-span-3 flex flex-col justify-center pt-4 lg:pt-0'>

            <Link href="/contact">
              <div className='flex justify-center items-center'>
                <button className='flex justify-between lg:justify-center items-center px-6 md:px-8 lg:px-[1vw] w-[43vw] md:w-[30vw] lg:w-[13vw] py-3 lg:py-[0.6vw] rounded-[8px] lg:rounded-[0.4vw] bg-[#002631]'>

                  <span className='font-roboto text-[18px] lg:text-[0.9vw] font-medium text-white'>
                    {data?.get_stated_button_text}
                  </span>

                  <PiPaperPlaneRightFill className='ms-8 lg:ms-[2vw] w-6 lg:w-[2vw] h-6 lg:h-[1.4vw] text-white' />

                </button>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </div>
  )
}

export default GetStarted