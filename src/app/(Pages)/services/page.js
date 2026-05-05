import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import ResearchClient from "./ResearchClient";
import ResearchSkeleton from "./ResearchSkeleton";
import Hero from "@/app/components/HomeComponents/Hero";

// ✅ CACHE (prevents duplicate API calls)
const getResearchData = cache(async () => {
  return fetchSeo("research-category");
});

// ✅ Metadata (uses cached data)
export async function generateMetadata() {
  const data = await getResearchData();
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page
export default function ResearchPage() {
  return (
    <Suspense fallback={<ResearchSkeleton />}>
      <ResearchData />
    </Suspense>
  );
}

// ✅ Server Component
async function ResearchData() {
  const data = await getResearchData();

  return (
    <>
      {/* ✅ Schema JSON */}
      {data?.seo?.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.seo.schema_json),
          }}
        />
      )}

      <Hero data={data} />
      <ResearchClient data={data} />
    </>
  );
}