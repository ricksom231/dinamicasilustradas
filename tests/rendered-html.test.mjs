import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a nova landing page em português", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Nunca fique sem ideias durante uma festa infantil/i);
  assert.match(html, /Veja como o material é por dentro/i);
  assert.match(html, /Esse material é perfeito para você/i);
  assert.match(html, /O QUE VOCÊ VAI RECEBER/i);
  assert.match(html, /EXCLUSIVO DO PLANO COMPLETO/i);
  assert.match(html, /MAIS ESCOLHIDO/i);
});

test("mantém a ordem e apenas as seis seções pedidas", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const classes = ["headline-section", "product-section", "audience-section", "receive-section", "bonus-section", "plans-section"];
  const positions = classes.map((name) => page.indexOf(`className=\"${name}`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.equal((page.match(/<section\b/g) ?? []).length, 6);
});

test("usa placeholders e não incorpora imagens ou promessas proibidas", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(page, /<img\b|<video\b/i);
  assert.match(page, /image-placeholder/);
  assert.doesNotMatch(page, /depoimento|avaliaç(?:ão|ões)|certificado|mentoria|grupo VIP|garantia/i);
});

test("preserva os checkouts e o modal acessível", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /checkout\/plano-completo-200-dinamicas-para-recreadores/);
  assert.match(page, /checkout\/plano-basico-200-dinamicas-para-recreadores/);
  assert.match(page, /R\$ 19,90/);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /event\.target === event\.currentTarget/);
});
