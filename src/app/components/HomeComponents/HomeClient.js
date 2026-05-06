import dynamic from "next/dynamic";
import { Suspense } from "react";

// Skeletons
import CardSkeleton from "@/app/components/Skeletons/CardSkeleton";
import HeroSkeleton from "@/app/components/Skeletons/HeroSkeleton";

// Lazy load (Server-friendly)
const Hero = dynamic(() => import("@/app/components/HomeComponents/Hero"));
const WhatweServe = dynamic(() => import("@/app/components/HomeComponents/WhatweServe"));
const ResearchCategory = dynamic(() => import("@/app/components/HomeComponents/ResearchCategory"));
const Roadmap = dynamic(() => import("@/app/components/HomeComponents/Roadmap"));
const WorkSignup = dynamic(() => import("@/app/components/HomeComponents/WorkSignup"));
const GetStarted = dynamic(() => import("@/app/components/HomeComponents/GetStarted"));
const Testimonials = dynamic(() => import("@/app/components/HomeComponents/Testimonials"));
const Contact = dynamic(() => import("@/app/components/ContactusComponents/Contact"));

export default function HomeClient({ data}) {
  const { home_page, contact } = data || {};

  return (
    <div>
      <Suspense fallback={<HeroSkeleton />}>
        <Hero data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <WhatweServe data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <ResearchCategory data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <Roadmap data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <WorkSignup data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <GetStarted data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <Testimonials data={home_page} />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <Contact data={contact} />
      </Suspense>
    </div>
  );
}