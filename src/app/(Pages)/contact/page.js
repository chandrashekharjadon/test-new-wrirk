import { Suspense, cache } from "react";
import { fetchSeo } from "@/app/lib/seo";
import { mapSeoToMetadata } from "@/app/lib/seoMapper";
import ContactClient from "./ContactClient";
import ContactSkeleton from "./ContactSkeleton";

// ✅ Cache API (avoid duplicate calls)
const getContactData = cache(async () => {
  return fetchSeo("contact-us");
});

// ✅ Metadata
export async function generateMetadata() {
  const data = await getContactData();
  return mapSeoToMetadata(data?.seo);
}

// ✅ Page with Suspense
export default function ContactUsPage() {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <ContactData />
    </Suspense>
  );
}

// ✅ Server Data Layer
async function ContactData() {
  const data = await getContactData();
  const schema = data?.seo?.schema_json;

  return (
    <>
      {/* ✅ Schema JSON */}
      {schema && Object.keys(schema).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}

      {/* ✅ Clean props */}
      <ContactClient data={data} />
    </>
  );
}