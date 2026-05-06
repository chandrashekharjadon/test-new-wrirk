import { Suspense, cache } from "react";
import HomeClient from "@/app/components/HomeComponents/HomeClient";
import { fetchSeo } from "@/app/lib/seo";
import { fetchAreas, fetchDomains } from "@/app/lib/contactApi";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import HomeSkeleton from "./HomeSkeleton";

// ✅ Cache SEO
const getHomeData = cache(async () => {
  return fetchSeo("home");
});

// ✅ Cache APIs (same as Contact page)
const getAreas = cache(fetchAreas);
const getDomains = cache(fetchDomains);

// ✅ Metadata
export async function generateMetadata() {
  const data = await getHomeData();
  return mapSeoToMetadata(data?.home_page?.seo);
}

// ✅ Page
export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeData />
    </Suspense>
  );
}

// ✅ Server Component (UPDATED)
async function HomeData() {
  const [data, areas, domains] = await Promise.all([
    getHomeData(),
    getAreas(),
    getDomains(),
  ]);

  return (
    <>
      {/* ✅ SEO Schema */}
      {data?.home_page?.seo?.schema_json && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.home_page.seo.schema_json),
          }}
        />
      )}

      {/* ✅ PASS DATA */}
      <HomeClient
        data={data}
        areas={areas}
        domains={domains}
      />
    </>
  );
}