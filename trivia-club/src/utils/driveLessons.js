export const lessonsFolderId = "17rkACr05l6Vu4b7GX7YFcyWZnnL3ATLQ";

export async function fetchDriveLessons(
  apiKey,
  { signal, fetcher = fetch } = {},
) {
  const files = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams({
      key: apiKey,
      q: `'${lessonsFolderId}' in parents and trashed = false and mimeType = 'application/vnd.google-apps.presentation'`,
      fields: "nextPageToken,files(id,name,description)",
      pageSize: "1000",
      orderBy: "name_natural",
    });
    if (pageToken) params.set("pageToken", pageToken);
    const response = await fetcher(
      `https://www.googleapis.com/drive/v3/files?${params}`,
      { signal },
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

export function mergeDriveLessons(files, existing) {
  const metadata = new Map(
    existing.map((lesson, index) => [
      lesson.slideUrl?.match(/\/d\/([^/]+)/)?.[1],
      { lesson, index },
    ]),
  );
  return [...new Map(files.map((file) => [file.id, file])).values()]
    .sort(
      (a, b) =>
        (metadata.get(a.id)?.index ?? Infinity) -
          (metadata.get(b.id)?.index ?? Infinity) ||
        a.name.localeCompare(b.name),
    )
    .map((file) => {
      const saved = metadata.get(file.id)?.lesson;
      return {
        id: file.id,
        title: saved?.title || file.name,
        description:
          saved?.description ||
          file.description ||
          "Open the slides to explore this lesson.",
        tags: saved?.tags || [],
        slideUrl: `https://docs.google.com/presentation/d/${encodeURIComponent(file.id)}/edit`,
      };
    });
}
