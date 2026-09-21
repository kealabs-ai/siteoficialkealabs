import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/kealabs_logo_strategic.png';

const skills = [
  'Scrum & Kanban', 'SAFe 6.0 (SSM & POPM)', 'Lead Time & Cycle Time',
  'WIP Management', 'OKRs', 'Power BI', 'Looker Studio', 'Metabase',
  'Gestão End-to-End', 'Data Analytics', 'Roadmap de Produto', 'DevOps Culture',
  'Inteligência Artificial Estratégica', 'Consultoria Tech for Business', 'Lean', 'Maturidade KMM de times',
];

const timeline = [
  {
    period: '2010 – 2011',
    company: 'Ideal Assessoria Empresarial',
    role: 'Analista de Sistemas e Projetos',
    desc: 'Desenvolvimento Web com Java, JSP, JSF, Hibernate e SVN. Gestão de infraestrutura e projetos internos.',
    tags: ['Java', 'JSP', 'JSF', 'Hibernate', 'SVN'],
    phase: 'Base Técnica',
  },
  {
    period: '2010 – 2012',
    company: 'Resource IT — Projeto C&A Modas',
    role: 'Analista de Negócios e Sistemas Java',
    desc: 'Sustentação e evolução de sistemas críticos para o varejo de moda. Ponte entre negócio e tecnologia.',
    tags: ['Java', 'Varejo', 'Análise de Negócios'],
    phase: 'Base Técnica',
  },
  {
    period: '2012 – 2013',
    company: 'ITGS — IT Global Services',
    role: 'Desenvolvedor Web',
    desc: 'Migração de Oracle Forms para Java Web. Primeiros passos com Scrum, Jenkins e Jira.',
    tags: ['Java Web', 'Oracle Forms', 'Scrum', 'Jenkins', 'Jira'],
    phase: 'Base Técnica',
  },
  {
    period: '2013 – 2019',
    company: 'Sonda · Dextra · CI&T · Levva',
    role: 'Desenvolvedor Sênior & Tech Lead',
    desc: 'Aplicações complexas e mobile para GEA, Nortel, Copel, CEEE, Empiricus, Catho, Edenred, Alelo, Serasa Experian e Grupo EMS. Transição natural para a agilidade.',
    tags: ['Cordova', 'Xamarin', 'Android Nativo', 'Java', 'Agile'],
    phase: 'Aceleração & Grandes Contas',
  },
  {
    period: '2019 – 2022',
    company: 'Liderança Ágil & Governança — CI&T',
    role: 'Agile Master / Scrum Master',
    desc: 'Estruturação de times end-to-end (Dados, Web/Mobile, Sustentação). Implementação de OKRs, métricas avançadas de fluxo e conquista das certificações SAFe SSM e POPM.',
    tags: ['SAFe 6.0', 'OKRs', 'Métricas de Fluxo', 'SSM', 'POPM'],
    phase: 'Liderança Ágil',
  },
  {
    period: '2022 – Atual',
    company: 'Compass UOL',
    role: 'Delivery Leader / Agile Specialist',
    desc: 'Liderança de equipes de Data Analytics, otimização de fluxo de valor e eficiência operacional corporativa em escala.',
    tags: ['Delivery Leadership', 'Data Analytics', 'Value Stream', 'OKRs'],
    phase: 'Momento Atual',
    current: true,
  },
];

const clients = [
  { name: 'Serasa Experian', domain: 'serasaexperian.com.br' },
  { name: 'QuintoAndar',     domain: 'quintoandar.com.br' },
  { name: 'Catho',           domain: 'catho.com.br' },
  { name: 'Edenred',         domain: 'edenred.com' },
  { name: 'Alelo',           domain: 'alelo.com.br' },
  { name: 'Energisa',        domain: 'energisa.com.br' },
  { name: 'Empiricus',       domain: 'empiricus.com.br' },
  { name: 'Copel',           domain: 'copel.com' },
  { name: 'C&A Modas',       domain: 'cea.com.br' },
  { name: 'Nortel',          domain: 'nortel.com.br', logoUrl: 'https://www.nortel.com.br/wp-content/themes/nortel/assets/img/logos/logo.png' },
  { name: 'Petrobras',       domain: 'petrobras.com.br' },
  { name: 'GEA',             domain: 'gea.com' },
  { name: 'Grupo EMS',       domain: 'ems.com.br', logoUrl: 'https://www.ems.com.br/wp-content/themes/ems/assets/images/logo-ems.png' },
  { name: 'Compass UOL',     domain: 'uol.com.br' },
  { name: 'CEEE',            domain: 'ceee.com.br', logoUrl: 'https://diariodamanhapelotas.com.br/site/wp-content/uploads/2017/05/ceee-logo.jpg' },
  { name: 'Protege',         domain: 'protege.com.br' },
  { name: 'Grupo JCPM',      domain: 'jcpm.com.br' },
];

const phaseColors = {
  'Base Técnica': 'from-[#0A2540] to-[#00B4D8]',
  'Aceleração & Grandes Contas': 'from-[#00B4D8] to-[#10B981]',
  'Liderança Ágil': 'from-[#10B981] to-[#00B4D8]',
  'Momento Atual': 'from-[#10B981] to-[#0A2540]',
};

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ClientLogo({ client, delay }) {
  const [imgError, setImgError] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);
  const sources = [
    ...(client.logoUrl ? [client.logoUrl] : []),
    `https://img.logo.dev/${client.domain}?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ`,
    `https://logo.clearbit.com/${client.domain}`,
    `https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`,
  ];

  const handleError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(i => i + 1);
    } else {
      setImgError(true);
    }
  };

  return (
    <FadeIn delay={delay}>
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-5 flex flex-col items-center justify-center gap-2 hover:border-[#00B4D8]/50 hover:shadow-md transition-all duration-200 group min-h-[90px]">
        {!imgError ? (
          <img
            src={sources[srcIndex]}
            alt={client.name}
            className="h-8 max-w-[120px] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            onError={handleError}
          />
        ) : null}
        <span className={`text-[#64748B] font-semibold text-xs text-center transition-colors group-hover:text-[#0A2540] ${!imgError ? 'opacity-0 group-hover:opacity-100 text-[10px]' : ''}`}>
          {client.name}
        </span>
      </div>
    </FadeIn>
  );
}

function TimelineItem({ item, index }) {
  const [ref, visible] = useIntersection(0.1);
  const isLeft = index % 2 === 0;
  return (
    <div
      ref={ref}
      className={`relative flex md:items-center mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${isLeft ? '-40px' : '40px'})`,
        transition: `opacity 0.6s ease ${index * 80}ms, transform 0.6s ease ${index * 80}ms`,
      }}
    >
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#00B4D8]/50 hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${phaseColors[item.phase]} text-white`}>
              {item.phase}
            </span>
            {item.current && (
              <span className="flex items-center gap-1 text-xs text-[#10B981] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse inline-block" />
                Atual
              </span>
            )}
          </div>
          <p className="text-[#00B4D8] text-sm font-medium mb-1">{item.period}</p>
          <h3 className="text-[#0A2540] font-bold text-lg leading-tight mb-1">{item.company}</h3>
          <p className="text-[#64748B] text-sm font-medium mb-3">{item.role}</p>
          <p className="text-[#64748B] text-sm leading-relaxed mb-4">{item.desc}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-[#0A2540] border border-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#00B4D8] bg-white z-10 items-center justify-center shadow-sm">
        <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${phaseColors[item.phase]}`} />
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  );
}

export default function CtoKea() {
  return (
    <div className="min-h-screen bg-slate-50 text-[#0A2540]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-white">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#0A2540 1px, transparent 1px), linear-gradient(90deg, #0A2540 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00B4D8]/8 blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#0A2540]/5 border border-[#00B4D8]/40 rounded-full px-4 py-1.5 text-[#0A2540] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Consultoria estratégica para negócios com IA
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#64748B] bg-clip-text text-transparent">
            Celso Henrique Leite
          </h1>

          <p className="text-[#00B4D8] text-lg md:text-xl font-semibold mb-3 tracking-wide">
            Delivery Leader · Agile Specialist · Ex-Desenvolvedor Sênior · Gestor de Projetos Sênior · IA Manager
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-[#64748B] text-sm">Co-Founder</span>
            <a href="https://www.kealabs.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <img src={logo} alt="Kealabs Intelligence" className="h-6 transition-all duration-300" />
              <span className="text-[#64748B] text-sm font-medium group-hover:text-[#10B981] transition-colors duration-300">Intelligence</span>
            </a>
          </div>

          <p className="text-[#64748B] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Mais de <span className="text-[#0A2540] font-semibold">15 anos em tecnologia</span> — 12 anos de desenvolvimento de software (Backend, Frontend & Mobile) evoluídos para a <span className="text-[#00B4D8] font-semibold">liderança estratégica de times ágeis e de dados</span>.
          </p>

          <div className="flex justify-center">
            <a
              href="#experiencia"
              className="inline-flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#0A2540]/85 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              Ver Experiência
            </a>
          </div>
        </div>
      </section>

      {/* ── SOBRE / DIFERENCIAL ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#00B4D8] text-sm font-semibold uppercase tracking-widest mb-3">Diferencial Comercial</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A2540] mb-4">A ponte entre código e estratégia</h2>
              <p className="text-[#64748B] max-w-2xl mx-auto leading-relaxed">
                A transição de desenvolvedor sênior para líder ágil cria um perfil raro: alguém que fala a <span className="text-[#0A2540] font-semibold">mesma língua dos times técnicos</span> e ao mesmo tempo entrega a <span className="text-[#00B4D8] font-semibold">visão estratégica que a alta gestão precisa</span>. Sem ruído na comunicação. Sem perda de contexto.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: '⚙️', title: '12 anos de Dev', desc: 'Backend, Frontend e Mobile. Entende o que o time técnico enfrenta no dia a dia.' },
                { icon: '🎯', title: 'Liderança Ágil', desc: 'SAFe 6.0 certificado (SSM & POPM). Estrutura times, processos e cultura de entrega.' },
                { icon: '📊', title: 'Data-Driven', desc: 'Métricas de fluxo, OKRs e dashboards para decisões baseadas em evidências.' },
              ].map(c => (
                <div key={c.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#00B4D8]/50 hover:shadow-md transition-all duration-300">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-[#0A2540] font-bold text-lg mb-2">{c.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={250}>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-[#64748B] text-sm font-semibold uppercase tracking-widest mb-5">Competências-chave</p>
              <div className="flex flex-wrap gap-3">
                {skills.map(s => (
                  <span key={s} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[#0A2540] text-sm font-medium hover:border-[#00B4D8] hover:text-[#00B4D8] transition-all duration-200 cursor-default shadow-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section id="experiencia" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-[#00B4D8] text-sm font-semibold uppercase tracking-widest mb-3">Trajetória</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A2540]">Da base técnica à liderança estratégica</h2>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTES ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-[#00B4D8] text-sm font-semibold uppercase tracking-widest mb-3">Portfólio</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A2540] mb-4">Grandes contas atendidas</h2>
              <p className="text-[#64748B] max-w-xl mx-auto">Empresas líderes de mercado que fizeram parte desta trajetória como desenvolvedor, tech lead e líder ágil.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {clients.map((c, i) => (
              <ClientLogo key={c.name} client={c} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RODAPÉ / CONTATO ── */}
      <footer className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#0A2540]/5 border border-[#00B4D8]/40 rounded-full px-4 py-1.5 text-[#0A2540] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              Consultoria estratégica para negócios com IA
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A2540] mb-4">Transforme seu negócio com IA Estratégica</h2>
            <p className="text-[#64748B] max-w-lg mx-auto mb-10 leading-relaxed">
              Consultoria especializada para empresas que querem aplicar <span className="text-[#0A2540] font-semibold">Inteligência Artificial de forma estratégica</span> — com foco em resultados reais, processos mais inteligentes e vantagem competitiva sustentável.
            </p>

            <div className="flex justify-center mb-14">
              <a
                href="https://www.linkedin.com/in/celsohleite/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0A2540] hover:bg-[#0A2540]/85 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </a>
            </div>

            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Celso Henrique Leite · Powered by{' '}
              <a href="/" className="text-[#64748B] hover:text-[#10B981] transition-colors">Kealabs</a>
            </p>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
