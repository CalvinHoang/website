import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the single About page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Calvin Hoang - About<\/title>/i);
  assert.match(html, /src="\/portrait\.jpg"/);
  assert.match(html, /calvinhoang07@gmail.com/);
  assert.match(html, /materials science and engineering from UNSW Sydney/);
  assert.match(html, /href="https:\/\/github.com\/CalvinHoang\/MarginalReader"/);
  assert.match(html, /Questions I am interested in/);
  assert.match(html, /productive share of economic growth/);
  assert.match(html, /Other links/);
  assert.match(html, /About me/);
  assert.match(html, /class="active-section">About me/);
  assert.match(html, /href="\/reading"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/i);
});

test("server-renders the Reading page", async () => {
  const response = await render("/reading");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Calvin Hoang - Reading<\/title>/i);
  assert.match(html, /I like to read blogs - Here are a few recent and representive articles of interest/);
  assert.match(html, /Dean Ball/);
  assert.match(html, /Conduits/);
  assert.match(html, /Dwarkesh/);
  assert.match(html, /Dwarkesh Patel/);
  assert.match(html, />X\/Twitter<\/a>/);
  assert.match(html, /About me/);
  assert.match(html, /aria-current="page"/);
  assert.match(html, /class="active-section">Reading/);
});
