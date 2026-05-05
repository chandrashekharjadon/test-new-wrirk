"use client";

import React from "react";
import "@fontsource/mulish";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

const PortfolioCards = ({ items }) => {
	return (
		<div className="w-full flex bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden font-mulish relative">

			{/* LEFT IMAGE */}
			<div className="relative w-[40%] min-h-[200px]">
				<Image
					src={`${process.env.NEXT_PUBLIC_STORAGE}${items.card_image}`}
					alt={items.card_image_alt || "portfolio image"}
					fill
					sizes="(max-width: 768px) 100vw, 40vw"
					quality={60}
					loading="lazy"
					className="object-cover"
				/>
			</div>

			{/* RIGHT CONTENT */}
			<div className="w-[60%] p-4 flex flex-col justify-between">

				{/* Top Content */}
				<div className="space-y-2">
					<h2 className="text-lg font-bold text-gray-900">
						{items.image_title}
					</h2>

					{items?.title?.map((item, index) => (
						<div key={index}>
							<h3 className="text-sm font-semibold text-gray-800">
								{item}
							</h3>
							<p className="text-xs text-gray-600 whitespace-pre-line">
								{items?.description?.[index]}
							</p>
						</div>
					))}
				</div>

				{/* Bottom Section */}
				<div className="mt-3 flex items-center justify-between">

					{/* Keywords */}
					<div className="mt-3 flex flex-col gap-1">
						<h3 className="text-sm font-semibold text-gray-800">
							Keywords:
						</h3>

						<div className="flex flex-wrap gap-2">
							{items?.keywords?.map((item, index) => (
								<span
									key={index}
									className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
								>
									{item}
								</span>
							))}
						</div>
					</div>

					{/* Arrow */}
					<Link
						href={`/Portfolio/${items.slug}`}
						className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
					>
						<RiArrowRightLine />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PortfolioCards;