"use client";

import { useEffect, useRef, useState } from "react";

const completeCheckout = "https://zuckpay.com.br/checkout/plano-completo-200-dinamicas-para-recreadores";
const basicCheckout = "https://zuckpay.com.br/checkout/plano-basico-200-dinamicas-para-recreadores";
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

type IconName = "sparkles" | "brain" | "search" | "star" | "party" | "bolt" | "clock" | "music" | "bag" | "palette" | "book" | "layers";

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
};

function Icon({ name }: { name: IconName }) {
  return <svg className="lucide-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const audiences: Array<{ icon: IconName; text: string }> = [
  { icon: "sparkles", text: "Está começando como recreador" },
  { icon: "brain", text: "Tem medo de dar branco durante a festa" },
  { icon: "search", text: "Vive pesquisando brincadeiras no Google" },
  { icon: "star", text: "Quer impressionar os pais" },
  { icon: "party", text: "Trabalha com festas infantis" },
  { icon: "bolt", text: "Quer ter sempre uma brincadeira pronta" },
];

const bonuses: Array<{ icon: IconName; title: string; text: string; image: string }> = [
  { icon: "clock", title: "Roteiro completo de festa", text: "Uma sequência prática para conduzir 2 horas de evento.", image: "https://i.postimg.cc/MKcZbLLp/imagem-2026-08-03-001927954.png" },
  { icon: "music", title: "Playlist para cada momento", text: "Músicas organizadas para acompanhar o ritmo da festa.", image: "https://i.postimg.cc/Nj5N06L6/imagem-2026-08-03-002806620.png" },
  { icon: "bag", title: "Checklist da Mochila", text: "Uma lista objetiva do que levar para trabalhar preparado.", image: "https://i.postimg.cc/yYWhhVBJ/imagem-2026-08-03-003058814.png" },
  { icon: "palette", title: "40 Brincadeiras Temáticas", text: "Atividades extras para festas com temas especiais.", image: "https://i.postimg.cc/cJdrmmYj/imagem-2026-08-03-003428173.png" },
];

const faqs = [
  {
    question: "O material é físico?",
    answer: "Não. O Kit do Recreador é um material digital em PDF, feito para você consultar pelo celular, tablet ou computador.",
  },
  {
    question: "Quando recebo o acesso?",
    answer: "O acesso é liberado logo após a confirmação do pagamento.",
  },
  {
    question: "Qual é a diferença entre os planos?",
    answer: "O Plano Básico traz as 200 brincadeiras. O Plano Completo inclui o mesmo acervo e os bônus: roteiro, playlist, checklist e brincadeiras temáticas.",
  },
  {
    question: "Consigo usar mesmo sendo iniciante?",
    answer: "Sim. As brincadeiras foram organizadas para uma consulta rápida, com orientações diretas para aplicar durante a festa.",
  },
];

function Feature({ children, negative = false }: { children: React.ReactNode; negative?: boolean }) {
  return <li className={negative ? "feature negative" : "feature"}><span aria-hidden="true">{negative ? "×" : "✓"}</span>{children}</li>;
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setModalOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalOpen]);

  return (
    <main>
      <section className="headline-section" id="inicio">
        <div className="headline-inner">
          <span className="brand-pill">KIT DO RECREADOR · MATERIAL DIGITAL EM PDF</span>
          <h1>Nunca fique sem ideias durante uma festa infantil.</h1>
          <p>Tenha 200 brincadeiras prontas, organizadas e fáceis de aplicar em qualquer festa, sem perder tempo pesquisando na internet.</p>
        </div>
      </section>

      <section className="product-section section-shell">
        <div className="section-heading">
          <span className="section-kicker">POR DENTRO DO KIT</span>
          <h2>Veja como o material é por dentro</h2>
          <p>Material organizado para consulta rápida durante qualquer evento.</p>
        </div>
        <div className="product-showcase">
          <img src={productMockup} alt="Mockup do Kit do Recreador" loading="eager" fetchPriority="high" decoding="async" />
        </div>
        <div className="center-action"><a className="primary-button" href="#planos">QUERO VER OS PLANOS <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="audience-section section-shell">
        <div className="section-heading compact-heading">
          <span className="section-kicker">FEITO PARA A ROTINA REAL</span>
          <h2>Esse material é perfeito para você que...</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((item) => <article className="audience-card" key={item.text}><span className="icon-box"><Icon name={item.icon} /></span><h3>{item.text}</h3></article>)}
        </div>
      </section>

      <section className="receive-section section-shell">
        <div className="section-heading">
          <span className="section-kicker">O QUE VOCÊ VAI RECEBER</span>
          <h2>Um material feito para encontrar e aplicar.</h2>
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

      <section className="bonus-section section-shell">
        <div className="section-heading">
          <span className="exclusive-badge">EXCLUSIVO DO PLANO COMPLETO</span>
          <h2>Mais organização para conduzir a festa inteira.</h2>
        </div>
        <div className="bonus-grid">
          {bonuses.map((bonus) => (
            <article className="bonus-card" key={bonus.title}>
              <div className="bonus-image"><img src={bonus.image} alt={bonus.title} loading="lazy" decoding="async" /></div>
              <div className="bonus-copy"><span className="bonus-icon"><Icon name={bonus.icon} /></span><div><h3>{bonus.title}</h3><p>{bonus.text}</p></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-section section-shell" id="planos">
        <div className="section-heading">
          <span className="section-kicker">ESCOLHA SEU ACESSO</span>
          <h2>Tenha o repertório que faltava na sua próxima festa.</h2>
        </div>
        <div className="plans-grid">
          <article className="plan-card basic-plan">
            <span className="plan-name">PLANO BÁSICO</span>
            <h3>200 brincadeiras prontas</h3>
            <div className="price"><span>R$</span><strong>10</strong><small>,00</small></div>
            <p className="payment-copy">pagamento único · acesso imediato</p>
            <ul>
              <Feature>200 brincadeiras</Feature>
              <Feature>Consulta rápida</Feature>
              <Feature>PDF imediato</Feature>
              <Feature negative>Roteiro, playlist e checklist</Feature>
              <Feature negative>40 brincadeiras temáticas</Feature>
            </ul>
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
            <ul>
              <Feature>As mesmas 200 brincadeiras</Feature>
              <Feature>Roteiro de Festa</Feature>
              <Feature>Playlist</Feature>
              <Feature>Checklist</Feature>
              <Feature>40 Brincadeiras Temáticas</Feature>
            </ul>
            <a className="plan-button complete-button" href={completeCheckout}>QUERO O PLANO COMPLETO</a>
          </article>
        </div>
      </section>

      <section className="guarantee-section section-shell">
        <div className="guarantee-card">
          <span className="guarantee-icon"><Icon name="sparkles" /></span>
          <div>
            <span className="section-kicker">COMPRA COM TRANQUILIDADE</span>
            <h2>Seu acesso é simples e imediato.</h2>
            <p>Após a confirmação do pagamento, você recebe o material digital para consultar quando precisar. As condições da compra ficam sempre visíveis no checkout.</p>
          </div>
        </div>
      </section>

      <section className="faq-section section-shell">
        <div className="section-heading">
          <span className="section-kicker">PERGUNTAS FREQUENTES</span>
          <h2>Ficou com alguma dúvida?</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta-section">
        <div className="final-cta-inner">
          <h2>Pronto para ter uma brincadeira certa para cada momento?</h2>
          <a className="primary-button" href="#planos">QUERO ESCOLHER MEU PLANO <span aria-hidden="true">↑</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-mark">K</div>
        <p><strong>KIT DO RECREADOR</strong> é um material digital em PDF desenvolvido para consulta rápida durante recreações em festas infantis.<br />Após a confirmação do pagamento, o acesso é liberado imediatamente.</p>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button ref={modalCloseRef} className="modal-close" aria-label="Fechar oferta" onClick={() => setModalOpen(false)}>×</button>
            <span className="modal-badge">OFERTA ESPECIAL</span>
            <h2 id="modal-title">Espere! Você pode levar MUITO MAIS por apenas <em>R$ 19,90.</em></h2>
            <p>Antes de finalizar, aproveite esta oferta exclusiva e leve também todos os bônus do Plano Completo por um valor especial.</p>
            <a className="modal-accept" href={completeCheckout}>SIM, QUERO O COMPLETO</a>
            <a className="modal-decline" href={basicCheckout}>NÃO, CONTINUAR COM O BÁSICO</a>
          </div>
        </div>
      )}
    </main>
  );
}
