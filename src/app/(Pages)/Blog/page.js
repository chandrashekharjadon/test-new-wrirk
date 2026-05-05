import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import BlogClient from "./BlogClient";
import BlogSkeleton from "./BlogSkeleton";

// ✅ CACHE (dedupe API calls)
const getBlogData = cache(async () => {
  return fetchSeo("blog");
});

// ✅ Metadata
export async function generateMetadata() {
  const data = await getBlogData();
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page
export default function BlogPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogData />
    </Suspense>
  );
}

// ✅ Server Component
async function BlogData() {
  const data = await getBlogData();

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

      <BlogClient data={data} />
    </>
  );
}