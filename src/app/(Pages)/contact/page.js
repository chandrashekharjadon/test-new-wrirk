import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { fetchAreas, fetchDomains } from "@/app/lib/contactApi";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import ContactClient from "./ContactClient";
import ContactSkeleton from "./ContactSkeleton";

// ✅ Cache SEO
const getContactData = cache(async () => {
  return fetchSeo("contact-us");
});

// ✅ Cache APIs (same pattern)
const getAreas = cache(fetchAreas);
const getDomains = cache(fetchDomains);

// ✅ Metadata
export async function generateMetadata() {
  const data = await getContactData();
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page
export default function ContactUsPage() {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactData />
    </Suspense>
  );
}

// ✅ Server layer
async function ContactData() {
  const [seoData, areas, domains] = await Promise.all([
    getContactData(),
    getAreas(),
    getDomains(),
  ]);

  const schema = seoData?.seo?.schema_json;

  return (
    <>
      {schema && Object.keys(schema).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      <ContactClient
        data={seoData}
        areas={areas}
        domains={domains}
      />
    </>
  );
}