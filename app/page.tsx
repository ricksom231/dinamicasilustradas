"use client";

import { useEffect, useRef, useState } from "react";

const completeCheckout =
  "https://zuckpay.com.br/checkout/plano-completo-200-dinamicas-para-recreadores";
const basicCheckout =
  "https://zuckpay.com.br/checkout/plano-basico-200-dinamicas-para-recreadores";

const audience = [
  {
    icon: "01",
    title: "Está começando agora",
    text: "e quer chegar à primeira festa com um repertório pronto para consultar.",
  },
  {
    icon: "02",
    title: "Tem medo de travar",
    text: "na frente dos pais ou da criança aniversariante quando a energia cair.",
  },
  {
    icon: "03",
    title: "Perde tempo pesquisando",
    text: "ideias soltas e ainda precisa adaptar tudo antes de aplicar.",
  },
  {
    icon: "04",
    title: "Quer trabalhar com segurança",
    text: "sem depender da memória ou improvisar cada momento da festa.",
  },
];

const basicItems = [
  "+200 brincadeiras e dinâmicas prontas",
  "Idade recomendada em cada atividade",
  "Número de crianças e material necessário",
  "Tempo médio e passo a passo direto",
  "Acesso digital imediato no celular, tablet ou computador",
];

const completeItems = [
  "Tudo do Plano Básico",
  "Roteiro pronto para uma festa de 2 horas",
  "Playlist organizada por momento da festa",
  "Checklist Mochila do Recreador",
  "40 brincadeiras temáticas: heróis, princesas, safari, festa junina e espaço",
];

const faqs = [
  {
    q: "Como recebo o material?",
    a: "O acesso é digital e liberado após a confirmação do pagamento. Você pode abrir no celular, tablet ou computador.",
  },
  {
    q: "Sou iniciante. Vou conseguir aplicar?",
    a: "Sim. Cada brincadeira traz idade, número de crianças, materiais, tempo médio e um passo a passo objetivo.",
  },
  {
    q: "Preciso imprimir tudo?",
    a: "Não. Você pode consultar digitalmente. Se preferir, o arquivo também foi preparado para impressão.",
  },
  {
    q: "Qual é a diferença entre os planos?",
    a: "O Básico reúne as brincadeiras prontas. O Completo inclui o material principal e os extras de planejamento: roteiro, playlist, checklist e atividades temáticas.",
  },
  {
    q: "As brincadeiras usam materiais caros?",
    a: "O kit reúne opções com material simples e também atividades sem material, para você escolher conforme a estrutura da festa.",
  },
  {
    q: "Posso acessar pelo celular durante a festa?",
    a: "Sim. O conteúdo pode ser consultado no celular para encontrar rapidamente uma opção adequada ao momento.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. Você tem 7 dias para conhecer o material e solicitar o reembolso caso ele não faça sentido para você.",
  },
  {
    q: "O acesso expira?",
    a: "O material é entregue em formato digital para download. Guarde o arquivo em seus dispositivos para consultar quando precisar.",
  },
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="check" aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modalOpen]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Kit do Recreador — início">
          <span className="brand-mark" aria-hidden="true">K</span>
          <span>KIT DO <strong>RECREADOR</strong></span>
        </a>
        <a className="header-link" href="#planos">Ver planos</a>
      </header>

      <section className="hero" id="inicio">
        <div className="confetti confetti-one" aria-hidden="true" />
        <div className="confetti confetti-two" aria-hidden="true" />
        <div className="hero-copy">
          <span className="eyebrow">Seu repertório pronto para a próxima festa</span>
          <h1>Chegue com segurança.<br />Nunca mais fique sem saber <em>qual brincadeira puxar.</em></h1>
          <p>
            Mais de 200 brincadeiras e dinâmicas organizadas para você abrir,
            escolher e aplicar — mesmo que esteja começando agora.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#planos">Quero meu kit agora</a>
            <span className="microcopy"><span aria-hidden="true">✓</span> Acesso digital imediato</span>
          </div>
        </div>
        <div className="product-stage" aria-label="Capas dos planos Básico e Completo">
          <div className="spark spark-one" aria-hidden="true">✦</div>
          <div className="spark spark-two" aria-hidden="true">✦</div>
          <div className="cover cover-back">
            <img src="/capa-basico.png" alt="Capa do Kit do Recreador — Plano Básico" />
          </div>
          <div className="cover cover-front">
            <span className="popular-tag">MAIS COMPLETO</span>
            <img src="/capa-completo.png" alt="Capa do Kit do Recreador — Plano Completo" />
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="section-heading">
          <span className="eyebrow">Feito para quem precisa de confiança rápida</span>
          <h2>Se você se reconhece aqui, este kit foi pensado para você.</h2>
        </div>
        <div className="audience-grid">
          {audience.map((item) => (
            <article className="audience-card" key={item.icon}>
              <span className="number-badge">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contents-section">
        <div className="section-heading light-heading">
          <span className="eyebrow">Escolha o nível de apoio que você precisa</span>
          <h2>O essencial para aplicar ou o pacote completo para planejar.</h2>
        </div>
        <div className="contents-grid">
          <article className="content-card">
            <span className="plan-label">PLANO BÁSICO</span>
            <h3>Repertório pronto na palma da mão</h3>
            <p className="card-intro">Para parar de procurar ideias soltas e ter opções claras para cada momento.</p>
            <ul>{basicItems.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
          </article>
          <article className="content-card featured-content">
            <span className="plan-label">PLANO COMPLETO</span>
            <h3>Repertório + organização da festa</h3>
            <p className="card-intro">Para saber o que fazer, em que ordem conduzir e o que levar com você.</p>
            <ul>{completeItems.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
          </article>
        </div>
      </section>

      <section className="section steps-section">
        <div className="section-heading">
          <span className="eyebrow">Simples como deve ser</span>
          <h2>Da compra à primeira brincadeira em 3 passos.</h2>
        </div>
        <div className="steps-grid">
          <article><span>1</span><h3>Escolha seu plano</h3><p>Selecione o kit que combina com o apoio que você quer agora.</p></article>
          <article><span>2</span><h3>Receba o acesso</h3><p>Após a confirmação, abra o material no seu dispositivo.</p></article>
          <article><span>3</span><h3>Abra, escolha e aplique</h3><p>Use os filtros de cada ficha e conduza a atividade passo a passo.</p></article>
        </div>
      </section>

      <section className="section objections-section">
        <div className="objection-copy">
          <span className="eyebrow">Sem complicação</span>
          <h2>Você não precisa decorar 200 brincadeiras.</h2>
          <p>O kit existe justamente para ser sua consulta rápida antes e durante a festa.</p>
        </div>
        <div className="objection-list">
          <div><span>✓</span><p><strong>“Não tenho experiência.”</strong><br />O passo a passo mostra exatamente como conduzir.</p></div>
          <div><span>✓</span><p><strong>“Tenho poucos materiais.”</strong><br />Há opções simples e atividades sem material.</p></div>
          <div><span>✓</span><p><strong>“Cada festa tem uma idade.”</strong><br />A recomendação de faixa etária ajuda a escolher rápido.</p></div>
        </div>
      </section>

      <section className="guarantee-section">
        <div className="guarantee-seal" aria-hidden="true"><strong>7</strong><span>DIAS</span></div>
        <div>
          <span className="eyebrow">Sua escolha protegida</span>
          <h2>Teste o kit por 7 dias.</h2>
          <p>Conheça o material com calma. Se não fizer sentido para você, solicite o reembolso dentro do prazo de garantia.</p>
        </div>
      </section>

      <section className="section pricing-section" id="planos">
        <div className="section-heading">
          <span className="eyebrow">Escolha seu acesso</span>
          <h2>Um investimento pequeno para chegar muito mais preparado.</h2>
        </div>
        <div className="pricing-grid">
          <article className="price-card basic-card">
            <span className="plan-label">BÁSICO</span>
            <h3>+200 brincadeiras prontas</h3>
            <p className="price-description">Seu repertório organizado para consulta rápida.</p>
            <div className="price"><small>R$</small><strong>10</strong><span>,00</span></div>
            <p className="payment-note">pagamento único</p>
            <ul>{basicItems.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
            <button className="button button-outline" onClick={() => setModalOpen(true)}>Escolher Plano Básico</button>
          </article>

          <article className="price-card complete-card">
            <span className="best-choice">MELHOR ESCOLHA</span>
            <span className="plan-label">COMPLETO</span>
            <h3>Kit completo + bônus de planejamento</h3>
            <p className="price-description">Mais clareza para preparar e conduzir a festa inteira.</p>
            <p className="old-price">De R$ 47,00 por</p>
            <div className="price"><small>R$</small><strong>27</strong><span>,90</span></div>
            <p className="payment-note">pagamento único</p>
            <ul>{completeItems.map((item) => <CheckItem key={item}>{item}</CheckItem>)}</ul>
            <a className="button button-gold" href={completeCheckout}>Quero o Plano Completo</a>
            <span className="safe-note">✓ Compra segura · acesso digital</span>
          </article>
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2>O que você precisa saber antes de começar.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}<span aria-hidden="true">+</span></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="eyebrow">Sua próxima festa pode ser mais leve</span>
        <h2>Tenha sempre uma boa brincadeira pronta para puxar.</h2>
        <p>Abra o kit, escolha uma opção adequada e conduza com confiança.</p>
        <a className="button button-gold" href="#planos">Escolher meu plano</a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark">K</span><span>KIT DO <strong>RECREADOR</strong></span></a>
        <p>Material digital de consulta rápida para recreadores.</p>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button ref={closeRef} className="modal-close" aria-label="Fechar" onClick={() => setModalOpen(false)}>×</button>
            <span className="modal-kicker">OFERTA ESPECIAL</span>
            <h2 id="modal-title">Antes de ficar só com o Básico…</h2>
            <p>Leve também roteiro, playlist, checklist e 40 brincadeiras temáticas por uma condição especial.</p>
            <div className="modal-price"><span>Plano Completo por</span><strong>R$ 19,90</strong></div>
            <a className="button button-gold" href={completeCheckout}>Sim, quero o Completo por R$ 19,90</a>
            <a className="modal-basic-link" href={basicCheckout}>Não, continuar apenas com o Básico por R$ 10,00</a>
          </div>
        </div>
      )}
    </main>
  );
}
