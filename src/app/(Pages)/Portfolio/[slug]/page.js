import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { fetchAreas, fetchDomains } from "@/app/lib/contactApi";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import Hero from "@/app/components/PortfolioComponents/PortCardComponents/Hero";
import Contact from "@/app/components/ContactusComponents/Contact";
import PortfolioDetailSkeleton from "./PortfolioDetailSkeleton";

// ✅ CACHE (prevents duplicate API calls)
const getPortfolioDetail = cache(async (slug) => {
  return fetchSeo(`portfolio/${slug}`);
});

const getAreas = cache(fetchAreas);
const getDomains = cache(fetchDomains);

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
  const [data, areas, domains] = await Promise.all([
    getPortfolioDetail(slug),
    getAreas(),
    getDomains(),
  ]);

  const portfolio = data?.portfolio;
  const contact = data?.contact;

  const schema = portfolio?.seo?.schema_json;

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

      <Hero details={portfolio} />

      {/* CONTACT (CLIENT) */}
      <Contact
        data={contact}
        areas={areas ?? []}
        domains={domains ?? []}
      />
    </>
  );
}