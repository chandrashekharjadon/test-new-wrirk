import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import PortfolioDetailClient from "./PortfolioDetailClient";
import PortfolioDetailSkeleton from "./PortfolioDetailSkeleton";

// ✅ CACHE (prevents duplicate API calls)
const getPortfolioDetail = cache(async (slug) => {
  return fetchSeo(`portfolio/${slug}`);
});

// ✅ Metadata
export async function generateMetadata({ params }) {
  const data = await getPortfolioDetail(params.slug);
  return mapSeoToMetadata(data?.portfolio?.seo);
}

// ✅ Page
export default function PortfolioDetailPage({ params }) {
  return (
    <Suspense fallback={<PortfolioDetailSkeleton />}>
      <PortfolioDetailData slug={params.slug} />
    </Suspense>
  );
}

// ✅ Server Component
async function PortfolioDetailData({ slug }) {
  const data = await getPortfolioDetail(slug);

  const schema = data?.portfolio?.seo?.schema_json;

  return (
    <>
      {/* ✅ SEO Schema */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      <PortfolioDetailClient
        portfolio={data?.portfolio}
        contact={data?.contact}
      />
    </>
  );
}