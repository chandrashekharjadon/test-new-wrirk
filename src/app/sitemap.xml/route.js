export async function GET() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL2}sitemap.xml`,
    {
      cache: "no-store", // 🔴 important
    }
  )

  const sitemap = await res.text()

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}