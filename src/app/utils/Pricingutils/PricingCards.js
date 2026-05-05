import React from 'react'
import "@fontsource/dm-sans";
import Image from 'next/image';

const PricingCards = () => {
  return (
    <div className='rounded-[30px] py-10 px-8 border-[1px] border-[#EFF0F6] shadow-custom font-sans'>
      <div className='flex justify-start items-center py-3'>
      <div className='p-2 flex items-center justify-center bg-[#ECEBFF] rounded-lg'><Image  width={30} height={30} src="/Images/pricingcard-logo1.png" alt="image" loading="lazy" /></div>
        <h2 className='text-[#064454] font-bold ps-4 text-[20px]'>Implementation / Analysis</h2>
      </div>
      <p className='text-[#575757] text-[16px] leading-[26px]'>Lead generation strategy refers to the marketing process of involving and capturing interest in a product or service in order to.</p>
      <div className='flex items-end'>
        <div className='text-[50px] font-bold text-[#064454]'>₹30000</div>
        <div className='text-[10px] mb-4 text-[#3E3F40]'>(Base Price)</div>
      </div>

      <ul className='px-2'>
        <li className='flex items-center justify-start'><Image className="rounded-full me-2 mt-1" width={25} height={25} src="/Images/check.png" alt="image" loading="lazy" /><p className='text-[14px]'>Upto 2 Methods</p> 
        </li>
        <li className='flex items-center justify-start'><Image className="rounded-full me-2 mt-1" width={25} height={25} src="/Images/check.png" alt="image" loading="lazy" /><p className='text-[14px]'>Upto 2 Dataset</p> 
        </li>
        <li className='flex items-center justify-start'><Image className="rounded-full me-2 mt-1" width={25} height={25} src="/Images/check.png" alt="image" loading="lazy" /><p className='text-[14px]'>Upto 2 Revise</p> 
        </li>
        <li className='flex items-center justify-start'><Image className="rounded-full me-2 mt-1" width={25} height={25} src="/Images/check.png" alt="image" loading="lazy" /><p className='text-[14px]'>50 Questionnaire</p> 
        </li>
        <li className='flex items-center justify-start'><Image className="rounded-full me-2 mt-1" width={25} height={25} src="/Images/check.png" alt="image" loading="lazy" /><p className='text-[14px]'>10 Objective/Hypothesis</p> 
        </li>
        <li className='flex items-center justify-start'><Image className="rounded-full me-2 mt-1" width={25} height={25} src="/Images/check.png" alt="image" loading="lazy" /><p className='text-[14px]'>500 Respondent</p> 
        </li>
      </ul>

<div className='flex items-center justify-center pb-4 pt-8'>
  <button className='2xl:px-24 xl:px-24 lg:px-24 md:px-16 sm:px-16 px-16 py-4 rounded-full text-[16px] text-white font-medium bg-[#064454]'>Get started</button>
</div>

    </div>
  )
}

export default PricingCards
