"use client";

import { useEffect, useRef, useState } from "react";

const BASIC_CHECKOUT_URL = "https://zuckpay.com.br/checkout/plano-basico-200-dinamicas-para-recreadores";
const COMPLETE_CHECKOUT_URL = "https://zuckpay.com.br/checkout/plano-completo-250-dinamicas-para-recreadores";
const SPECIAL_COMPLETE_CHECKOUT_URL = "https://zuckpay.com.br/checkout/plano-completo-200-dinamicas-para-recreadores";
const OFFER_DURATION_MINUTES = 25;
const OFFER_END_STORAGE_KEY = "kit-do-recreador-special-offer-end-v2-25min";

const productMockup = "https://i.postimg.cc/bwhXDFcZ/imagem-2026-08-03-000720349-removebg-preview.png";
const completePlanImage = "https://i.postimg.cc/m2YK7NSc/imagem-2026-08-03-014301691.png";

const carouselRows = [
  [
    "https://i.postimg.cc/Y03B36wZ/imagem-2026-08-03-012447800.png",
    "https://i.postimg.cc/R0Hr85Bg/imagem-2026-08-03-012519212.png",
    "https://i.postimg.cc/MGR4577N/imagem-2026-08-03-012558186.png",
    "https://i.postimg.cc/8P00VKwK/imagem-2026-08-03-012628042.png",
    "https://i.postimg.cc/HWP2JJ5H/imagem-2026-08-03-012722492.png",
  ],
  [
    "https://i.postimg.cc/Y2V6r5Km/imagem-2026-08-03-012812230.png",
    "https://i.postimg.cc/50yz13sz/imagem-2026-08-03-012903876.png",
    "https://i.postimg.cc/h4JC1bKz/imagem-2026-08-03-012945374.png",
    "https://i.postimg.cc/258GbnH1/imagem-2026-08-03-013018009.png",
    "https://i.postimg.cc/SsHfv3m8/imagem-2026-08-03-013054818.png",
  ],
];

type IconName = "sparkles" | "brain" | "search" | "star" | "party" | "bolt" | "clock" | "music" | "bag" | "palette" | "book" | "layers" | "check";

const iconPaths: Record<IconName, React.ReactNode> = {
  sparkles: <><path d="m12 3-1.7 4.3L6 9l4.3 1.7L12 15l1.7-4.3L18 9l-4.3-1.7Z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 5 7a3 3 0 0 0 .5 5.5A3 3 0 0 0 9 17a3 3 0 0 0 3-3V7a3 3 0 0 0-2.5-2.5Z"/><path d="M14.5 4.5A3 3 0 0 1 19 7a3 3 0 0 1-.5 5.5A3 3 0 0 1 15 17a3 3 0 0 1-3-3V7a3 3 0 0 1 2.5-2.5Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z"/>,
  party: <><path d="m3 21 6-18 12 12Z"/><path d="M14 4c1.5-1.5 3-1.5 4.5 0M18 9c1.2-1.2 2.3-1.2 3.5 0M10 8l6 6"/></>,
  bolt: <path d="m13 2-9 12h8l-1 8 9-12h-8Z"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  music: <><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
  bag: <><path d="M6 8h12l1 13H5Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M9 13h6"/></>,
  palette: <><path d="M12 3a9 9 0 0 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h3a6 6 0 0 0 0-12Z"/><circle cx="7.5" cy="10" r=".7"/><circle cx="10" cy="6.5" r=".7"/><circle cx="15" cy="7" r=".7"/></>,
  book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22Z"/><path d="M4 5.5V19M8 7h8M8 11h6"/></>,
  layers: <><path d="m12 2 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
  check: <path d="m5 12 4.2 4L19 6.5"/>,
};

const audiences: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "sparkles", title: "Está começando agora", text: "Quer chegar à primeira festa com opções prontas para usar." },
  { icon: "brain", title: "Tem medo de dar branco", text: "Não quer improvisar com as crianças e os pais esperando." },
  { icon: "search", title: "Repete as mesmas brincadeiras", text: "Precisa renovar o repertório sem passar horas pesquisando." },
  { icon: "party", title: "Trabalha com festas infantis", text: "Quer consultar ideias por idade, espaço e material disponível." },
  { icon: "star", title: "Quer mais organização", text: "Prefere chegar com um plano em vez de decidir tudo na hora." },
  { icon: "bolt", title: "Precisa de algo pronto", text: "Não quer editar, montar ou assistir horas de aulas." },
];

const bonuses: Array<{ icon: IconName; title: string; text: string; image: string }> = [
  { icon: "clock", title: "Roteiro completo de festa", text: "Uma sequência prática para conduzir duas horas de evento.", image: "https://i.postimg.cc/MKcZbLLp/imagem-2026-08-03-001927954.png" },
  { icon: "music", title: "Playlist para cada momento", text: "Sugestões para recepção, brincadeiras, lanche e encerramento.", image: "https://i.postimg.cc/Nj5N06L6/imagem-2026-08-03-002806620.png" },
  { icon: "bag", title: "Checklist da Mochila", text: "Uma lista objetiva do que levar para trabalhar preparado.", image: "https://i.postimg.cc/yYWhhVBJ/imagem-2026-08-03-003058814.png" },
  { icon: "palette", title: "40 Brincadeiras Temáticas", text: "Atividades extras para festas com temas especiais.", image: "https://i.postimg.cc/cJdrmmYj/imagem-2026-08-03-003428173.png" },
];

const basicIncluded = ["200 brincadeiras completas", "8 categorias organizadas", "Informações de idade, material e duração", "Passo a passo direto", "Consulta pelo celular", "Acesso digital imediato"];
const basicNotIncluded = ["Roteiro de festa de 2 horas", "Playlist por momento", "Checklist da mochila", "40 brincadeiras temáticas extras"];
const completeKit = ["200 brincadeiras e dinâmicas completas", "Atividades organizadas em 8 categorias", "Opções para diferentes idades", "Brincadeiras para salão e espaços abertos", "Atividades com ou sem material", "Idade recomendada em cada brincadeira", "Número indicado de crianças", "Material necessário informado", "Tempo médio de cada atividade", "Passo a passo curto e direto", "Consulta pelo celular, tablet ou computador", "Material digital pronto, sem precisar editar"];
const completeBonuses = ["Roteiro pronto para duas horas de festa", "Variações para festas pequenas, grandes e temáticas", "Playlist dividida por momento do evento", "Checklist completo da Mochila do Recreador", "40 brincadeiras temáticas extras", "Cinco grupos de festas temáticas", "Acesso digital imediato após o pagamento"];

function Icon({ name }: { name: IconName }) {
  return <svg className="lucide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function Feature({ children, negative = false }: { children: React.ReactNode; negative?: boolean }) {
  return <li className={negative ? "feature negative" : "feature"}><span aria-hidden="true">{negative ? "−" : <Icon name="check" />}</span>{children}</li>;
}

function formatOfferTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatOfferParts(totalSeconds: number) {
  return {
    hours: Math.floor(totalSeconds / 3600).toString().padStart(2, "0"),
    minutes: (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, "0"),
    seconds: (totalSeconds % 60).toString().padStart(2, "0"),
  };
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [offerSeconds, setOfferSeconds] = useState(OFFER_DURATION_MINUTES * 60);
  const modalRef = useRef<HTMLDivElement>(null);
  const hasSpecialCompleteCheckout = SPECIAL_COMPLETE_CHECKOUT_URL.startsWith("https://");
  const specialOfferActive = hasSpecialCompleteCheckout && offerSeconds > 0;
  const timeLabel = formatOfferTime(offerSeconds);
  const timeParts = formatOfferParts(offerSeconds);

  useEffect(() => {
    const storedEnd = Number(window.localStorage.getItem(OFFER_END_STORAGE_KEY));
    const endTime = Number.isFinite(storedEnd) && storedEnd > 0
      ? storedEnd
      : Date.now() + OFFER_DURATION_MINUTES * 60 * 1000;

    if (!storedEnd) window.localStorage.setItem(OFFER_END_STORAGE_KEY, String(endTime));

    const updateTimer = () => setOfferSeconds(Math.max(0, Math.ceil((endTime - Date.now()) / 1000)));
    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(modalRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    window.setTimeout(() => focusable()[0]?.focus(), 0);
    const keepFocusInside = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
      if (event.key !== "Tab") return;
      const controls = focusable();
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", keepFocusInside);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keepFocusInside);
    };
  }, [modalOpen]);

  return (
    <main>
      <div className="offer-bar" role="region" aria-label="Oferta especial do Plano Completo">
        {specialOfferActive ? (
          <div className="offer-bar-inner">
            <p className="offer-bar-message"><strong>OFERTA EXCLUSIVA APENAS HOJE</strong><span aria-hidden="true">•</span><b>FALTAM <time aria-live="off">{timeLabel}</time></b></p>
          </div>
        ) : <p className="offer-ended">Oferta especial encerrada</p>}
      </div>

      <section className="hero-section" id="inicio">
        <div className="hero-copy">
          <span className="brand-pill">KIT DO RECREADOR · MATERIAL DIGITAL EM PDF</span>
          <h1>+200 Brincadeiras Prontas<br />para saber o que fazer e conduzir<br />uma festa com mais segurança</h1>
          <p className="hero-subheadline">Um material visual e direto para quem trabalha com recreação infantil e quer saber qual brincadeira aplicar, o que preparar e como conduzir cada momento da festa.</p>
          <p className="hero-support">Escolha pela categoria, confira a idade, o material, o tempo e siga o passo a passo.</p>
        </div>
        <div className="hero-mockup">
          <img src={productMockup} alt="Mockup do PDF Kit do Recreador com brincadeiras prontas" loading="eager" fetchPriority="high" decoding="async" />
        </div>
        <a className="primary-button hero-cta" href="#planos">QUERO TER AS BRINCADEIRAS PRONTAS <span aria-hidden="true">↓</span></a>
        <p className="hero-practicality">Acesso imediato <span>•</span> Material em PDF <span>•</span> Consulte pelo celular</p>
      </section>

      <section className="audience-section section-shell">
        <div className="section-heading compact-heading">
          <span className="section-kicker">PARA QUEM É</span>
          <h2>Este material é para você que…</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((item) => <article className="audience-card" key={item.title}><span className="icon-box"><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
        </div>
      </section>

      <section className="showcase-section section-shell" aria-labelledby="por-dentro">
        <div className="section-heading">
          <span className="section-kicker">POR DENTRO DO KIT</span>
          <h2 id="por-dentro">Veja como o material é por dentro</h2>
          <p>Material organizado para consulta rápida durante qualquer evento.</p>
        </div>
        <div className="infinite-carousel" aria-label="Páginas do material em movimento contínuo">
          {carouselRows.map((row, rowIndex) => (
            <div className="marquee-viewport" key={rowIndex}>
              <div className={`marquee-track ${rowIndex === 0 ? "move-left" : "move-right"}`}>
                {[...row, ...row].map((image, imageIndex) => (
                  <div className="marquee-image" key={`${rowIndex}-${imageIndex}`}>
                    <img src={image} alt="Página interna do Kit do Recreador" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="kit-section section-shell">
        <div className="section-heading">
          <span className="section-kicker">O QUE VEM NAS 200 BRINCADEIRAS</span>
          <h2>Abra o PDF, escolha uma categoria e encontre uma brincadeira pronta.</h2>
          <p>Em cada atividade, você vê o que precisa para aplicar sem ficar pensando no que fazer depois.</p>
        </div>
        <div className="kit-grid">
          <article><span><Icon name="layers" /></span><h3>8 categorias</h3><p>Quebra-gelo, música, ar livre, salão, sem material e mais.</p></article>
          <article><span><Icon name="star" /></span><h3>Para cada idade</h3><p>Veja a faixa recomendada antes de escolher a próxima atividade.</p></article>
          <article><span><Icon name="bag" /></span><h3>Material e tempo</h3><p>Confira o que usar, a quantidade de crianças e a duração média.</p></article>
          <article><span><Icon name="book" /></span><h3>Passo a passo</h3><p>Leia rápido, aplique e siga para a próxima brincadeira quando precisar.</p></article>
        </div>
      </section>

      <section className="bonus-section section-shell">
        <div className="section-heading">
          <span className="exclusive-badge">EXCLUSIVO DO PLANO COMPLETO</span>
          <h2>No Plano Completo, você ainda recebe:</h2>
          <p>Além das 200 brincadeiras, leve materiais que ajudam a organizar a festa inteira.</p>
        </div>
        <div className="bonus-grid">
          {bonuses.map((bonus, index) => (
            <article className="bonus-card" key={bonus.title}>
              <div className="bonus-image"><img src={bonus.image} alt={bonus.title} loading="lazy" decoding="async" /></div>
              <div className="bonus-copy"><span className="bonus-icon"><Icon name={bonus.icon} /></span><div><small>BÔNUS {index + 1}</small><h3>{bonus.title}</h3><p>{bonus.text}</p><span className="included-badge">Incluído no Plano Completo</span></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-section section-shell" id="planos">
        {specialOfferActive && (
          <div className="special-offer-box" id="oferta-especial">
            <p className="timer-heading">Oferta por tempo limitado</p>
            <div className="offer-timer" aria-label={`Oferta termina em ${timeLabel}`}>
              <div className="timer-unit"><strong>{timeParts.hours}</strong><small>HORAS</small></div>
              <i aria-hidden="true">:</i>
              <div className="timer-unit"><strong>{timeParts.minutes}</strong><small>MINUTOS</small></div>
              <i aria-hidden="true">:</i>
              <div className="timer-unit"><strong>{timeParts.seconds}</strong><small>SEGUNDOS</small></div>
            </div>
          </div>
        )}
        <div className="section-heading">
          <span className="section-kicker">ESCOLHA SEU ACESSO</span>
          <h2>Chegue à próxima festa sabendo por onde começar.</h2>
        </div>
        <div className="plans-grid">
          <article className="plan-card basic-plan">
            <span className="plan-name">PLANO BÁSICO</span>
            <h3>200 brincadeiras prontas</h3>
            <p className="plan-intro">Para quem quer o acervo completo de brincadeiras e não precisa dos materiais extras.</p>
            <div className="price"><span>R$</span><strong>10</strong><small>,00</small></div>
            <p className="payment-copy">pagamento único · acesso imediato</p>
            <ul>{basicIncluded.map((item) => <Feature key={item}>{item}</Feature>)}</ul>
            <p className="not-included-title">Não inclui os materiais extras:</p>
            <ul>{basicNotIncluded.map((item) => <Feature key={item} negative>{item}</Feature>)}</ul>
            <button className="plan-button basic-button" onClick={() => setModalOpen(true)}>QUERO O PLANO BÁSICO</button>
          </article>

          <article className="plan-card complete-plan">
            <span className="choice-badge">MAIS ESCOLHIDO</span>
            <span className="plan-name">PLANO COMPLETO</span>
            <h3>Kit completo + todos os bônus</h3>
            <div className="complete-plan-image"><img src={completePlanImage} alt="Visual do Plano Completo" loading="lazy" decoding="async" /></div>
            <p className="old-price">De R$ 47,00 por</p>
            <div className="price"><span>R$</span><strong>27</strong><small>,90</small></div>
            <p className="payment-copy">pagamento único · acesso imediato</p>
            <div className="plan-list-block">
              <h4>Tudo que já vem no Kit</h4>
              <ul>{completeKit.slice(0, 5).map((item) => <Feature key={item}>{item}</Feature>)}</ul>
              <details className="plan-details"><summary>Ver tudo que está incluído <span>+</span></summary><ul>{completeKit.slice(5).map((item) => <Feature key={item}>{item}</Feature>)}</ul></details>
            </div>
            <div className="plan-list-block bonus-list-block">
              <h4>Mais 4 blocos de bônus</h4>
              <ul>{completeBonuses.map((item) => <Feature key={item}>{item}</Feature>)}</ul>
            </div>
            <a className="plan-button complete-button" href={COMPLETE_CHECKOUT_URL}>QUERO O PLANO COMPLETO</a>
          </article>
        </div>
      </section>

      <footer>
        <div className="footer-mark">K</div>
        <p><strong>KIT DO RECREADOR</strong> é um material digital em PDF desenvolvido para consulta rápida durante recreações em festas infantis.<br />Após a confirmação do pagamento, o acesso é liberado imediatamente.</p>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" aria-label="Fechar oferta" onClick={() => setModalOpen(false)}>×</button>
            {specialOfferActive ? (
              <>
                <span className="modal-badge">OFERTA ESPECIAL</span>
                <h2 id="modal-title">Antes de continuar: leve o Plano Completo por <em>R$ 19,90.</em></h2>
                <p>Por mais R$ 9,90, você leva as mesmas 200 brincadeiras e recebe também o roteiro, a playlist, o checklist e as 40 brincadeiras temáticas.</p>
                <div className="modal-comparison"><span>Plano Básico — R$ 10,00</span><strong>Plano Completo nesta oferta — R$ 19,90</strong></div>
                <a className="modal-accept" href={SPECIAL_COMPLETE_CHECKOUT_URL}>SIM, QUERO O COMPLETO POR R$ 19,90</a>
                <a className="modal-decline" href={BASIC_CHECKOUT_URL}>NÃO, QUERO SOMENTE O BÁSICO</a>
              </>
            ) : (
              <>
                <h2 id="modal-title">Continuar com o <em>Plano Básico.</em></h2>
                <p>A oferta especial do Plano Completo foi encerrada. Você pode seguir normalmente com as 200 brincadeiras do Plano Básico.</p>
                <a className="modal-accept" href={BASIC_CHECKOUT_URL}>IR PARA O CHECKOUT DO BÁSICO</a>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
