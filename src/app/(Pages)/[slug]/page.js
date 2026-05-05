import { cache, Suspense } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";

import DynamicPageClient from "./DynamicPageClient";
import DynamicPageSkeleton from "./DynamicPageSkeleton";

// ✅ Cache API (with ISR support if fetchSeo supports it)
const getPageData = cache(async (slug) => {
  return fetchSeo(`pages/${slug}`);
});

// ✅ Metadata (still cached automatically)
export async function generateMetadata({ params }) {
  const data = await getPageData(params.slug);
  return mapSeoToMetadata(data?.seo);
}

// ✅ Wrapper (separate async component)
async function DynamicPageWrapper({ slug }) {
  const data = await getPageData(slug);

  if (!data) {
    return <DynamicPageSkeleton />;
  }

  const schema = data?.seo?.schema_json;

  return (
    <>
      {/* SEO SCHEMA */}
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

// ✅ Main Page (NON-BLOCKING now 🚀)
export default function DynamicPage({ params }) {
  return (
    <Suspense fallback={<DynamicPageSkeleton />}>
      <DynamicPageWrapper slug={params.slug} />
    </Suspense>
  );
}