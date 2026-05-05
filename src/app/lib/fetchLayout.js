export async function fetchLayout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL2}layout`,
    {
      cache: "no-store", // ✅ ALWAYS fresh data
    }
  );

  return res.json();
}