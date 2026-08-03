import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageUrl = new URL("../app/page.tsx", import.meta.url);

test("mantém a ordem principal solicitada", async () => {
  const page = await readFile(pageUrl, "utf8");
  const sections = ["hero-section", "audience-section", "showcase-section", "kit-section", "bonus-section", "plans-section"];
  const positions = sections.map((name) => page.indexOf(`className=\"${name}`));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(page, /\+200 Brincadeiras Prontas/);
  assert.match(page, /QUERO TER AS BRINCADEIRAS PRONTAS/);
});

test("mantém mockup e carrossel separados com as imagens fornecidas", async () => {
  const [page, css] = await Promise.all([readFile(pageUrl, "utf8"), readFile(new URL("../app/globals.css", import.meta.url), "utf8")]);
  assert.match(page, /https:\/\/i\.postimg\.cc\/bwhXDFcZ/);
  assert.match(page, /https:\/\/i\.postimg\.cc\/m2YK7NSc/);
  assert.equal((page.match(/https:\/\/i\.postimg\.cc\//g) ?? []).length, 16);
  assert.match(page, /\[\.\.\.row, \.\.\.row\]/);
  assert.match(page, /move-left/);
  assert.match(page, /move-right/);
  assert.match(css, /@keyframes carousel-left/);
  assert.match(css, /@keyframes carousel-right/);
  assert.doesNotMatch(page, /onPointerDown|onPointerEnter|scrollCarousel|carouselPaused/);
  assert.doesNotMatch(css, /carousel-controls|cursor:\s*grab|touch-action:\s*pan-x/);
  assert.match(css, /object-fit:\s*contain/);
});

test("mantém os três fluxos de checkout separados", async () => {
  const page = await readFile(pageUrl, "utf8");
  assert.match(page, /BASIC_CHECKOUT_URL = "https:\/\/zuckpay\.com\.br\/checkout\/plano-basico-200-dinamicas-para-recreadores"/);
  assert.match(page, /COMPLETE_CHECKOUT_URL = "https:\/\/zuckpay\.com\.br\/checkout\/plano-completo-250-dinamicas-para-recreadores"/);
  assert.match(page, /SPECIAL_COMPLETE_CHECKOUT_URL = "https:\/\/zuckpay\.com\.br\/checkout\/plano-completo-200-dinamicas-para-recreadores"/);
  assert.match(page, /href=\{COMPLETE_CHECKOUT_URL\}>QUERO O PLANO COMPLETO/);
  assert.match(page, /onClick=\{\(\) => setModalOpen\(true\)\}>QUERO O PLANO BÁSICO/);
  assert.match(page, /href=\{SPECIAL_COMPLETE_CHECKOUT_URL\}>SIM, QUERO O COMPLETO POR R\$ 19,90/);
  assert.match(page, /href=\{BASIC_CHECKOUT_URL\}>NÃO, QUERO SOMENTE O BÁSICO/);
});

test("usa um cronômetro persistente e não reinicia depois do vencimento", async () => {
  const page = await readFile(pageUrl, "utf8");
  assert.match(page, /const OFFER_DURATION_MINUTES = 25/);
  assert.match(page, /OFERTA EXCLUSIVA APENAS HOJE/);
  assert.match(page, /FALTAM <time aria-live="off">\{timeLabel\}<\/time>/);
  assert.match(page, /localStorage\.getItem\(OFFER_END_STORAGE_KEY\)/);
  assert.match(page, /if \(!storedEnd\) window\.localStorage\.setItem/);
  assert.match(page, /specialOfferActive = hasSpecialCompleteCheckout && offerSeconds > 0/);
  assert.match(page, /Oferta especial encerrada/);
});

test("preserva acessibilidade do modal e rastreamento", async () => {
  const [page, layout] = await Promise.all([readFile(pageUrl, "utf8"), readFile(new URL("../app/layout.tsx", import.meta.url), "utf8")]);
  assert.match(page, /aria-modal="true"/);
  assert.match(page, /event\.key === "Escape"/);
  assert.match(page, /event\.key !== "Tab"/);
  assert.match(page, /event\.target === event\.currentTarget/);
  assert.match(layout, /cdn\.utmify\.com\.br\/scripts\/pixel\/pixel\.js/);
  assert.match(layout, /cdn\.utmify\.com\.br\/scripts\/utms\/latest\.js/);
});
