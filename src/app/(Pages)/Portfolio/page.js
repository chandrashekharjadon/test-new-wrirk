import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { fetchAreas, fetchDomains } from "@/app/lib/contactApi";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import PortfolioClient from "./PortfolioClient";
import PortfolioSkeleton from "./PortfolioSkeleton";

// ✅ CACHE (dedupe API calls)
const getPortfolioData = cache(async () => {
  return fetchSeo("portfolio");
});
const getAreas = cache(fetchAreas);
const getDomains = cache(fetchDomains);

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
  const [data, areas, domains] = await Promise.all([
    getPortfolioData(),
    getAreas(),
    getDomains(),
  ]);

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
        areas={areas}
        domains={domains}
      />
    </>
  );
}