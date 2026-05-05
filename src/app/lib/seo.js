// app/lib/seo.js

export async function fetchSeo(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL2}${slug}`,
      {
         cache: "force-cache",
        next: { revalidate: 300 }, // ✅ better than no-store
      }
    );

    if (!res.ok) return null;
    
    const json = await res.json();

    // console.log('seodata', json);

    return json?.data ?? null;
  } catch (error) {
    console.error("SEO fetch error:", error);
    return null;
  }
}
