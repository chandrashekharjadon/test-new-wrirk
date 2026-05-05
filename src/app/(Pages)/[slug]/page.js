import { cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";

import DynamicPageClient from "./DynamicPageClient";
import DynamicPageSkeleton from "./DynamicPageSkeleton";

// ✅ Cache API
const getPageData = cache((slug) => {
  return fetchSeo(`pages/${slug}`);
});

// ✅ Metadata
export async function generateMetadata({ params }) {
  const data = await getPageData(params.slug);
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page (NO Suspense needed here)
export default async function DynamicPage({ params }) {
  const data = await getPageData(params.slug);

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

      {/* CLIENT COMPONENT */}
      <DynamicPageClient data={data} />
    </>
  );
}