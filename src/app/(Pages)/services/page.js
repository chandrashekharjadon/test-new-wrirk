import { cache } from "react";
import dynamic from "next/dynamic";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import Hero from "@/app/components/ResearchComponents/Hero";

// ✅ Lazy load BELOW-THE-FOLD content
const ResearchClient = dynamic(() => import("./ResearchClient"), {
  ssr: false, // 🔥 huge LCP improvement
});

// ✅ CACHE (prevents duplicate API calls)
const getResearchData = cache(async () => {
  return fetchSeo("research-category");
});

// ✅ Metadata (uses cached data)
export async function generateMetadata() {
  const data = await getResearchData();
  return mapSeoToMetadata(data?.seo);
}

export default function ResearchPage() {
  return <ResearchData />;
}

async function ResearchData() {
  const data = await getResearchData();

  return (
    <>
      {/* Schema */}
      {data?.seo?.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.seo.schema_json),
          }}
        />
      )}

      {/* ✅ HERO MUST BE HERE */}
      <Hero data={data} />

      {/* BELOW THE FOLD */}
      <ResearchClient data={data} />
    </>
  );
}