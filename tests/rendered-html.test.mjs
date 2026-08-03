import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

test("renderiza a landing page em português com as seções essenciais", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /Kit do Recreador \| \+200 Brincadeiras Prontas/i);
  assert.match(html, /Chegue com segurança/i);
  assert.match(html, /Da compra à primeira brincadeira em 3 passos/i);
  assert.match(html, /Teste o kit por 7 dias/i);
  assert.match(html, /Dúvidas frequentes/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("mantém os checkouts e o modal de upgrade corretos", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /checkout\/plano-completo-200-dinamicas-para-recreadores/);
  assert.match(page, /checkout\/plano-basico-200-dinamicas-para-recreadores/);
  assert.match(page, /R\$ 19,90/);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /event\.target === event\.currentTarget/);
});

test("inclui as capas reais e o card social no projeto", async () => {
  await Promise.all([
    access(new URL("../public/capa-basico.png", import.meta.url)),
    access(new URL("../public/capa-completo.png", import.meta.url)),
    access(new URL("../public/og-kit-recreador.png", import.meta.url)),
  ]);
});
