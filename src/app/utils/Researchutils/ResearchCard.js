"use client"
import Image from 'next/image'
import React from 'react'
import { BsTag } from 'react-icons/bs';
import '@fontsource-variable/mulish';
import Link from 'next/link';

const ResearchCard = (props) => {
    return (
        <>
            <div className="flex items-center justify-center ">
                <Link href={`/research/${props.id}`}>
                    <div className="max-w-sm md:max-w-md rounded-xl overflow-hidden bg-white text-black shadow-custom8">

                        <Image
                            src={props.image_src}
                            alt="image"
                            width={400}
                            height={250}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                        />

                        <div className="px-3 py-4">
                            <div className=" text-[18px] font-mulish font-[700] text-[#002631] mb-3">
                                {props.title}
                            </div>

                            <p className="text-[13px] font-mulish font-[400] text-[#002631]">
                                {props.desc.length > 170 ? `${props.desc.slice(0, 170)}...` : props.desc}

                            </p>

                            <spam className="bg-[#002631] mt-2 text-white text-[10px] px-2 py-[0.1vw] font-Mulish flex justify-center items-center rounded-md border border-white w-fit">
                                {props.category}
                            </spam>

                            <h2 className="mt-2 font-bold text-[11px] font-mulish text-[#002631]">Keywords:</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 mt-1 gap-x-0 md:gap-x-2 lg:gap-x-3">
                                {props.keywords.map((item, index) => (
                                    <span className="inline-flex items-center lg:items-start me-0 lg:me-2" key={index}>
                                        <BsTag className="text-[14px] font-thin text-[#002631ea]" />
                                        <span className=" text-[#002631] text-[10px] ps-1 leading-5 md:leading-3 lg:leading-4">{item}</span>
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ResearchCard