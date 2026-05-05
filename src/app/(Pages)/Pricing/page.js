// import React, { Suspense } from 'react'
// import Hero from '@/app/components/PricingComponents/Hero';
// // import Loading from '@/app/loading';


// const Pricing = () => {
//   return (
//     <div>
//       {/* <Suspense fallback={<Loading />} > */}
//       <Hero />
//       {/* </Suspense> */}
//     </div>
//   )
// }

// export default Pricing

import { Suspense, cache } from "react";
import PricingClient from "./PricingClient";
import PricingSkeleton from "./PricingSkeleton";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import { fetchSeo } from "@/app/lib/seo";

// ✅ Cache API calls
const getPricingData = cache(async () => {
  const [seo, services] = await Promise.all([
    fetchSeo("pricing"),
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siteapi/service_type`).then(res => res.json()),
  ]);

  return { seo, services };
});

// ✅ Metadata
export async function generateMetadata() {
  const { seo } = await getPricingData();
  return mapSeoToMetadata(seo?.seo);
}

// ✅ Page
export default function PricingPage() {
  return (
    <Suspense fallback={<PricingSkeleton />}>
      <PricingData />
    </Suspense>
  );
}

// ✅ Data layer (Server Component)
async function PricingData() {
  const { seo, services } = await getPricingData();

  const schema = seo?.seo?.schema_json;

  return (
    <>
      {/* ✅ Schema */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      {/* ✅ Pass clean props */}
      <PricingClient services={services} />
    </>
  );
}
