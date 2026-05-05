import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import BlogDetailClient from "./BlogDetailClient";
import BlogDetailSkeleton from "./BlogDetailSkeleton";

// ✅ Cache API (good)
const getBlogDetail = cache(async (slug) => {
  return fetchSeo(`blog/${slug}`);
});

// ✅ Metadata
export async function generateMetadata({ params }) {
  const data = await getBlogDetail(params.slug);
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page
export default function BlogDetailPage({ params }) {
  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogDetailData slug={params.slug} />
    </Suspense>
  );
}

// ✅ Data layer
async function BlogDetailData({ slug }) {
  const data = await getBlogDetail(slug);

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

      <BlogDetailClient data={data} />
    </>
  );
}