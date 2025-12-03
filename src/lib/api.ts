export async function getPopularDestinations(): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/popular`, {
    cache: 'no-store',   // always fetch fresh data
  });


  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json(); // returns {statusCode, success, message, data}
}
