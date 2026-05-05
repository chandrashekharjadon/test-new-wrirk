import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import DynamicPageClient from "./DynamicPageClient";
import DynamicPageSkeleton from "./DynamicPageSkeleton";

// ✅ Cache API (prevents duplicate calls)
const getPageData = cache(async (slug) => {
  return fetchSeo(`pages/${slug}`);
});

// ✅ Metadata
export async function generateMetadata({ params }) {
  const data = await getPageData(params.slug);
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page
export default function DynamicPage({ params }) {
  return (
    <Suspense fallback={<DynamicPageSkeleton />}>
      <DynamicPageData slug={params.slug} />
    </Suspense>
  );
}

// ✅ Data layer
async function DynamicPageData({ slug }) {
  const data = await getPageData(slug);

  const schema = data?.seo?.schema_json;

  return (
    <>
      {/* ✅ Schema JSON */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      <DynamicPageClient data={data} />
    </>
  );
}