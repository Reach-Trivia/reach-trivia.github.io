import { fetchDriveLessons, lessonsFolderId } from "../api/_lib/drive.js";
import assert from "node:assert/strict";
import test from "node:test";
import { mergeDriveLessons } from "../src/utils/driveLessons.js";

test("Drive listings follow every page and query only folder presentations", async () => {
  const requests = [];
  const files = await fetchDriveLessons("test-key", {
    fetcher: async (url) => {
      const params = new URL(url).searchParams;
      requests.push(params);
      return {
        ok: true,
        json: async () =>
          requests.length === 1
            ? { files: [{ id: "a", name: "First" }], nextPageToken: "next" }
            : { files: [{ id: "b", name: "Second" }] },
      };
    },
  });
  assert.equal(files.length, 2);
  assert.equal(requests[1].get("pageToken"), "next");
  assert.ok(requests[0].get("q").includes(lessonsFolderId));
  assert.ok(requests[0].get("q").includes("trashed = false"));
});

test("Drive failures reject so the page can keep its last working lessons", async () => {
  await assert.rejects(
    fetchDriveLessons("test-key", { fetcher: async () => ({ ok: false }) }),
  );
  await assert.rejects(
    fetchDriveLessons("test-key", {
      fetcher: async () => ({ ok: true, json: async () => ({}) }),
    }),
  );
});

test("sync preserves curated cards and adds new slides without duplicates", () => {
  const existing = [
    {
      id: 1,
      title: "Custom title",
      description: "Custom description",
      tags: ["science"],
      slideUrl: "https://docs.google.com/presentation/d/known/edit",
    },
  ];
  const merged = mergeDriveLessons(
    [
      { id: "new", name: "New slides" },
      { id: "known", name: "Drive title" },
      { id: "new", name: "New slides" },
    ],
    existing,
  );
  assert.equal(merged.length, 2);
  assert.equal(merged[0].title, "Custom title");
  assert.deepEqual(merged[0].tags, ["science"]);
  assert.equal(merged[1].title, "New slides");
  assert.deepEqual(mergeDriveLessons([], existing), []);
});
