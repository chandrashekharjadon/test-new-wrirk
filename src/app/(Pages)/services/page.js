import { cache } from "react";
import dynamic from "next/dynamic";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import Hero from "@/app/components/ResearchComponents/Hero";

// ✅ ISR: Makes page static + revalidates every 5 min
export const revalidate = 300;

// ✅ Lazy load BELOW-THE-FOLD (no SSR needed)
const ResearchClient = dynamic(() => import("./ResearchClient"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "300px" }}>Loading...</div>,
});

// ✅ CACHE (dedupe API calls across metadata + page)
const getResearchData = cache(async () => {
  const data = await fetchSeo("research-category");
  return data;
});

// ✅ Metadata (uses SAME cached data)
export async function generateMetadata() {
  const data = await getResearchData();
  return mapSeoToMetadata(data?.seo);
}

// ✅ MAIN PAGE (NO extra wrapper component needed)
export default async function ResearchPage() {
  const data = await getResearchData();

  if (!data) {
    // Optional fallback UI
    return <div>Something went wrong</div>;
  }

  return (
    <>
      {/* ✅ Schema (SEO) */}
      {data?.seo?.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.seo.schema_json),
          }}
        />
      )}

      {/* ✅ ABOVE THE FOLD (LCP critical) */}
      <Hero data={data} />

      {/* ✅ BELOW THE FOLD (lazy, no SSR load) */}
      <ResearchClient data={data} />
    </>
  );
}