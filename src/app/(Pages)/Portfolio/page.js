import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import PortfolioClient from "./PortfolioClient";
import PortfolioSkeleton from "./PortfolioSkeleton";

// ✅ CACHE (dedupe API calls)
const getPortfolioData = cache(async () => {
  return fetchSeo("portfolio");
});

// ✅ Metadata
export async function generateMetadata() {
  const data = await getPortfolioData();
  return mapSeoToMetadata(data?.portfolio?.seo);
}

// ✅ Page
export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioSkeleton />}>
      <PortfolioData />
    </Suspense>
  );
}

// ✅ Server Component
async function PortfolioData() {
  const data = await getPortfolioData();

  const schema = data?.portfolio?.seo?.schema_json;

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

      <PortfolioClient
        portfolio={data?.portfolio}
        contact={data?.contact}
      />
    </>
  );
}