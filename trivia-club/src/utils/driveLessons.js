export const lessonsFolderId = "17rkACr05l6Vu4b7GX7YFcyWZnnL3ATLQ";

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
