// app/lib/seoMapper.js

export function mapSeoToMetadata(seo) {
  if (!seo) {
    return {
      title: "Default Title",
      description: "Default description",
    };
  }

  return {
    // ===== BASIC META =====
    title: seo?.meta_title ?? "Default Title",
    description: seo?.meta_description ?? "Default description",

    keywords: seo?.meta_keywords ?? undefined,
    robots: seo?.robots ?? "index, follow",

    // ===== CANONICAL =====
    alternates: {
      canonical: seo?.canonical_url ?? undefined,
    },

    // ===== OPEN GRAPH =====
    openGraph: {
      title: seo?.og_title ?? undefined,
      description: seo?.og_description ?? undefined,
      url: seo?.og_url ?? undefined,
      type: seo?.og_type ?? "website",

      images: seo?.og_image
        ? [
            {
              url: seo?.og_image,
              width: 1200,
              height: 630,
              alt: seo?.og_title ?? "OG Image",
            },
          ]
        : undefined,
    },

    // ===== TWITTER =====
    twitter: {
      card: seo?.twitter_card ?? "summary_large_image",
      title: seo?.twitter_title ?? undefined,
      description: seo?.twitter_description ?? undefined,
      images: seo?.twitter_image ? [seo?.twitter_image] : undefined,
    },

    // ===== EXTRA / CUSTOM META =====
    other: {
      author: seo?.author ?? undefined,
      language: seo?.language ?? "en",

      "geo.region": seo?.geo_region?? undefined,
      "geo.placename": seo?.geo_placename ?? undefined,
    },
  };
}
