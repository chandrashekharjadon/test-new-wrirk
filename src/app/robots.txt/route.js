export async function GET() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL2}robots.txt`
  )

  const robots = await res.text()

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}