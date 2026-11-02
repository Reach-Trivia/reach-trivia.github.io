export const lessonsFolderId = "17rkACr05l6Vu4b7GX7YFcyWZnnL3ATLQ";

export async function fetchDriveLessons(
  apiKey,
  { signal, fetcher = fetch } = {},
) {
  const files = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({
      q: `'${lessonsFolderId}' in parents and trashed = false and mimeType = 'application/vnd.google-apps.presentation'`,
      fields: "nextPageToken,files(id,name,description)",
      pageSize: "1000",
      orderBy: "name_natural",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const response = await fetcher(
      `https://www.googleapis.com/drive/v3/files?${params}`,
      {
        signal,
        headers: {
          "X-Goog-Api-Key": apiKey,
          Referer: "https://reachtrivia-ehss.vercel.app/",
        },
      },
    );
    if (!response.ok) throw new Error("Could not refresh lessons.");
    const data = await response.json();
    if (
      !Array.isArray(data.files) ||
      data.files.some(
        (file) => typeof file.id !== "string" || typeof file.name !== "string",
      )
    ) {
      throw new Error("Invalid lesson list.");
    }
    files.push(...data.files);
    pageToken = data.nextPageToken || "";
  } while (pageToken);
  return files;
}
