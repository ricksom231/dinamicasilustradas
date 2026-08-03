import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("mantém o conteúdo essencial da landing page", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /Nunca fique sem ideias durante uma festa infantil/i);
  assert.match(page, /Veja como o material é por dentro/i);
  assert.match(page, /Esse material é perfeito para você/i);
  assert.match(page, /O QUE VOCÊ VAI RECEBER/i);
  assert.match(page, /EXCLUSIVO DO PLANO COMPLETO/i);
  assert.match(page, /MAIS ESCOLHIDO/i);
});

test("mantém a ordem e apenas as seis seções pedidas", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const classes = ["headline-section", "product-section", "audience-section", "receive-section", "bonus-section", "plans-section", "guarantee-section", "faq-section", "final-cta-section"];
  const positions = classes.map((name) => page.indexOf(`className=\"${name}`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.equal((page.match(/<section\b/g) ?? []).length, 9);
});

test("usa as imagens fornecidas sem promessas proibidas", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /https:\/\/i\.postimg\.cc\/bwhXDFcZ/);
  assert.match(page, /https:\/\/i\.postimg\.cc\/m2YK7NSc/);
  assert.equal((page.match(/https:\/\/i\.postimg\.cc\//g) ?? []).length, 16);
  assert.match(css, /object-fit:\s*contain/);
  assert.doesNotMatch(page, /<video\b/i);
  assert.doesNotMatch(page, /depoimento|avaliaç(?:ão|ões)|certificado|mentoria|grupo VIP/i);
});

test("implementa o carrossel infinito em duas direções", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /\[\.\.\.row, \.\.\.row\]/);
  assert.match(page, /move-left/);
  assert.match(page, /move-right/);
  assert.match(css, /@keyframes marquee-left/);
  assert.match(css, /@keyframes marquee-right/);
  assert.match(css, /\.marquee-image img[\s\S]*object-fit:\s*contain/);
  assert.doesNotMatch(page, /carousel-controls|slide-copy|slide-placeholder/);
});

test("inclui o pixel e o script de UTM no head", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /window\.pixelId="6a7014b9040ae726c2be69eb"/);
  assert.match(layout, /cdn\.utmify\.com\.br\/scripts\/pixel\/pixel\.js/);
  assert.match(layout, /cdn\.utmify\.com\.br\/scripts\/utms\/latest\.js/);
  assert.match(layout, /data-utmify-prevent-xcod-sck/);
  assert.match(layout, /data-utmify-prevent-subids/);
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
