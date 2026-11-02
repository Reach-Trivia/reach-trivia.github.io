import { fetchDriveLessons } from "./_lib/drive.js";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey)
    return response
      .status(503)
      .json({ error: "Lessons temporarily unavailable." });
  try {
    const files = await fetchDriveLessons(apiKey, {
      signal: AbortSignal.timeout(15000),
    });
    response.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600",
    );
    return response.status(200).json({ files });
  } catch {
    return response
      .status(502)
      .json({ error: "Lessons temporarily unavailable." });
  }
}
