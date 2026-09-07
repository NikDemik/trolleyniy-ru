import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".next/server/app");
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(file));
    else if (file.endsWith(".html") && !entry.name.startsWith("_")) out.push(file);
  }
  return out;
}
const documents = await Promise.all((await walk(root)).map(async (file) => ({ file, html: await readFile(file, "utf8") })));
assert.equal(documents.length, 25, "Ожидаются 25 публичных страниц");
const titles = new Set(), descriptions = new Set(), urls = new Set();
const anchors = [];
for (const { file, html } of documents) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert(canonical?.startsWith("https://trolleyniy.ru/"), `Canonical: ${file}`);
  assert(canonical.endsWith("/"), `Trailing slash: ${canonical}`);
  assert(!urls.has(canonical), `Duplicate canonical: ${canonical}`);
  urls.add(canonical);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert(title && !titles.has(title), `Unique title: ${file}`); titles.add(title);
  assert(description && !descriptions.has(description), `Unique description: ${file}`); descriptions.add(description);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `One H1: ${file}`);
  assert(html.includes(`property="og:url" content="${canonical}"`), `Open Graph URL: ${file}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  assert(schemas.some((schema) => schema["@type"] === "Organization"));
  assert(schemas.some((schema) => schema["@type"] === "WebSite"));
  if (canonical !== "https://trolleyniy.ru/") assert(schemas.some((schema) => schema["@type"] === "BreadcrumbList"));
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) if (match[1].startsWith("/")) anchors.push(match[1].split("#")[0]);
}
for (const href of anchors) assert(urls.has(`https://trolleyniy.ru${href}`), `Broken internal link: ${href}`);
console.log(`OK: ${documents.length} pages, unique metadata, canonical, H1, JSON-LD, ${anchors.length} internal links.`);

// Read-only HTTP checks and synthetic requests against the local safe stub.
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
for (const url of urls) {
  const response = await fetch(base + new URL(url).pathname);
  assert.equal(response.status, 200, `Route: ${url}`);
  await response.arrayBuffer();
}
assert.equal((await fetch(`${base}/does-not-exist/`)).status, 404);
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.equal([...sitemap.matchAll(/<loc>/g)].length, urls.size);
for (const url of urls) assert(sitemap.includes(`<loc>${url}</loc>`));
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert(robots.includes("Disallow: /api/"));
assert(robots.includes("https://trolleyniy.ru/sitemap.xml"));

function form(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: "Тест проверки", email: "qa@example.com", equipment: "Мостовой кран", startedAt: String(Date.now() - 10000), ...overrides })) data.set(key, value);
  return data;
}
async function post(data, expected, headers = {}) {
  const response = await fetch(`${base}/api/inquiry/`, { method: "POST", body: data, headers });
  assert.equal(response.status, expected);
  const json = await response.json();
  assert.equal(json.ok, false, "Заглушка не должна имитировать успех");
  return json;
}
await post(form(), 503);
assert((await post(form({ name: "", email: "bad", current: "-1" }), 422)).errors.current);
await post(form({ website: "spam" }), 400);
await post(form({ startedAt: "invalid" }), 400);
await post(form({ equipment: "invalid" }), 422);
await post(form(), 403, { Origin: "https://foreign.example" });
const duplicate = form(); duplicate.append("name", "Duplicate"); await post(duplicate, 400);
const fake = form(); fake.set("file", new Blob(["not a pdf"]), "fake.pdf"); await post(fake, 422);
const pdf = form(); pdf.set("file", new Blob(["%PDF-1.4\n%%EOF"], { type: "application/pdf" }), "test.pdf"); await post(pdf, 503);
const large = form(); large.set("file", new Blob([new Uint8Array(6 * 1024 * 1024)]), "large.pdf"); await post(large, 413);
assert.equal((await fetch(`${base}/api/inquiry/`, { method: "POST", body: "{}", headers: { "content-type": "application/json" } })).status, 415);
assert.equal((await fetch(`${base}/api/inquiry/`)).status, 405);
console.log("OK: all routes, 404, sitemap, robots, 12 API validation / failure cases.");

// UTF-8 integrity: no BOM and no replacement characters in application sources.
async function checkEncoding(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await checkEncoding(file);
    else {
      const buffer = await readFile(file);
      assert(!buffer.subarray(0, 3).equals(Buffer.from([239, 187, 191])), `BOM: ${file}`);
      const text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
      assert(!text.includes("\uFFFD"), `Broken encoding: ${file}`);
    }
  }
}
await checkEncoding("src");
console.log("OK: source encoding UTF-8 without BOM.");
