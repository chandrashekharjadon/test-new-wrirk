import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import ResearchDetailClient from "./ResearchDetailClient";
import ResearchDetailSkeleton from "./ResearchDetailSkeleton";

// ✅ CACHE (fix duplicate API calls)
const getResearchDetail = cache(async (slug) => {
  return fetchSeo(`research-category/${slug}`);
});

// ✅ Metadata
export async function generateMetadata({ params }) {
  const data = await getResearchDetail(params.slug);
  return mapSeoToMetadata(data?.category?.seo);
}

// ✅ Page
export default function ResearchDetailPage({ params }) {
  return (
    <Suspense fallback={<ResearchDetailSkeleton />}>
      <ResearchDetailData slug={params.slug} />
    </Suspense>
  );
}

// ✅ Server component
async function ResearchDetailData({ slug }) {
  const data = await getResearchDetail(slug);

  const schema = data?.category?.seo?.schema_json;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      <ResearchDetailClient data={data} />
    </>
  );
}