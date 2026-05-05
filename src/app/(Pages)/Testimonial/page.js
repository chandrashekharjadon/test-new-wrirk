import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import TestimonialClient from "./TestimonialClient";
import TestimonialSkeleton from "./TestimonialSkeleton";

/* ================= CACHE ================= */
// ✅ Prevent duplicate API calls
const getTestimonialsData = cache(async () => {
  return fetchSeo("case-testimonials");
});

/* ================= METADATA ================= */
export async function generateMetadata() {
  const data = await getTestimonialsData();
  return mapSeoToMetadata(data?.seo);
}

/* ================= PAGE ================= */
export default function TestimonialsPage() {
  return (
    <Suspense fallback={<TestimonialSkeleton />}>
      <TestimonialsData />
    </Suspense>
  );
}

/* ================= SERVER COMPONENT ================= */
async function TestimonialsData() {
  const data = await getTestimonialsData();

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

      {/* ✅ Pass clean data */}
      <TestimonialClient data={data} />
    </>
  );
}