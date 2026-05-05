import React from 'react'
import { IoSearchOutline, IoChevronDownSharp } from 'react-icons/io5';
import { BsTag } from 'react-icons/bs';
import Image from 'next/image';

const SearchTopic = () => {
    return (
        <>
            <div className=" text-xl lg:ml-[56px] mb-[25px] ">
                <spam className="text-transparent bg-gradient-to-l from-red-500 via-yellow-500 to-green-500 bg-clip-text">Generate New Topic</spam>


                <div className="border-2 mt-2 lg:w-full h-auto relative p-4 lg:p-6" style={{
                    border: '2px solid transparent',
                    backgroundClip: 'padding-box',
                    borderImage: 'linear-gradient(to right, red 0%, orange 10%, yellow 20%, lime 30%, green 40%, teal 50%, blue 60%, indigo 70%, purple 80%, magenta 90%, teal 100%) 1'
                }} >

                    <p className="text-base lg:text-lg">Generate your New Research Topic For Next Research</p>
                    <div className="xl:w-96 2xl:w-96 lg:w-96 md:w-full sm:w-full flex justify-between relative">
                        <input type="search" placeholder="Search" className="px-3 py-2 w-full rounded-full bg-[#F1F1F1] placeholder:text-[#999999]" />
                        <button type="button" className="rounded-full bg-[#2E8095] absolute right-1 bottom-1 p-[5px]">
                            <IoSearchOutline className="text-[22px] font-thin text-white" />
                        </button>
                    </div>

                    <div className="mt-4 lg:mt-6 space-y-2 lg:flex lg:space-x-4 lg:space-y-0 flex flex-wrap">
                        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0 md:mr-4">
                            <BsTag className="text-[20px] font-thin text-black" />
                            <span className="text-base text-gray-700 ml-2">Language Barriers</span>
                        </div>

                        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0 md:mr-4">
                            <BsTag className="text-[20px] font-thin text-black" />
                            <span className="text-base text-gray-700 ml-2">Product Placement</span>
                        </div>

                        <div className="flex items-center w-full md:w-auto">
                            <BsTag className="text-[20px] font-thin text-black" />
                            <span className="text-base text-gray-700 ml-2">SVoD</span>
                        </div>
                    </div>


                    <div className="mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-5">
                            <Image
                                src="/Images/research.png"
                                alt="image"
                                width={800}
                                height={500}
                                className="rounded-lg w-full h-auto"
                                loading="lazy"
                            />
                        </div>
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <p className="text-base lg:text-lg">The Study on the role of CSR in developing a company's brand</p>
                            <p className="text-sm italic lg:text-base">A company's corporate brand will always be representative of a favorable image...</p>
                        </div>
                    </div>

                    <div className="mt-4 lg:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
                        <div className="lg:col-span-5">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src="/Images/research.png"
                                    alt="image"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <p className="text-base lg:text-lg">The Study on the role of CSR in developing a company's brand</p>
                            <p className="text-sm italic lg:text-base">A company's corporate brand will always be representative of a favorable image...</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SearchTopic
