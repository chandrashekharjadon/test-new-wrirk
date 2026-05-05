// app/lib/contactApi.js

export async function fetchAreas() {
  try {
    const res = await fetch(
      `https://repo.wrirk.com/api/research_areas`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const json = await res.json();

    // ✅ FIX: API returns array directly
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error("Areas fetch error:", error);
    return [];
  }
}

export async function fetchDomains() {
  try {
    const res = await fetch(
      `https://repo.wrirk.com/api/domains`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];

    const json = await res.json();

    // ⚠️ Check domains API structure
    return Array.isArray(json) ? json : json?.data ?? [];
  } catch (error) {
    console.error("Domains fetch error:", error);
    return [];
  }
}