export async function getSeoSettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL2}seo-settings`,
    { cache: "no-store" }
  )

  return res.json()
}