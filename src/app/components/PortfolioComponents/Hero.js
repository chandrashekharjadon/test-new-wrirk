import React from 'react'
import Image from 'next/image';

const Hero = ({ data }) => {
  return (
    <>
      <div className='bg-[#064454] w-full 2xl:mb-10 xl:mb-10 lg:mb-10 md:mb-4 sm:mb-2 mb-2 flex items-center justify-center'>
        <Image
          src={`${process.env.NEXT_PUBLIC_STORAGE}${data.hero_image}`}
          alt={data.hero_image_alt}
          width={900}
          height={400}
          priority
          quality={70}
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>
    </>
  )
}

export default Hero
