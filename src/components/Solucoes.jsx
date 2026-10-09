import React, { useEffect, useState } from 'react';
import './Solucoes.css';
import ProductModal from './ProductModal';

const Solucoes = () => {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (!selectedService) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedService(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  const solucoes = [
    {
      titulo: 'Integração entre sistemas',
      descricao: 'Conecte dados do seu sistema de forma simples para tomar decisões inteligentes, otimizar vendas e reduzir custos.',
      cor: 'verde',
      icon: '🔌'
    },
    {
      titulo: 'Desenvolvimento Front-end e Sites Corporativos',
      descricao: 'Crie telas inteligentes e intuitivas. Importe dados de XLS, CSV e PDFs de forma automática, eliminando o trabalho manual e aumentando a produtividade.',
      cor: 'ciano',
      icon: '💻'
    },
    {
      titulo: 'Engenharia de IA',
      descricao: 'Otimize processos com agentes de IA. Melhore a comunicação, forneça análises inteligentes e permita que sua equipe foque na estratégia.',
      cor: 'laranja',
      icon: '🤖'
    },
    {
      titulo: 'Criação de Dashboards',
      descricao: 'Transforme dados em decisões. Crie dashboards intuitivos para acompanhar o desempenho do seu negócio e identificar oportunidades de otimização.',
      cor: 'verde',
      icon: '📊'
    },
    {
      titulo: 'Consultoria de Lean Delivery',
      descricao: 'Ajustamos seus processos, eliminamos o desperdício e aceleramos seu fluxo de valor. Comece com o que você tem hoje, entregue melhor amanhã.',
      cor: 'ciano',
      icon: '🚀'
    }
  ];

  const serviceDetails = {
    0: {
      titulo: 'Integração entre sistemas',
      subtitulo: 'Dados conectados',
      descricao: 'Conecte os dados do seu sistema e transforme informações brutas em insights valiosos para o seu negócio.',
      funcionalidades: [
        {
          titulo: 'Conexão Simples e Direta',
          descricao: 'Nossa plataforma se conecta de forma segura e descomplicada ao seu sistema de gestão (ERP, CRM, etc.), sem a necessidade de conhecimento técnico. Em poucos cliques, você sincroniza seus dados.'
        },
        {
          titulo: 'Análise Inteligente de Dados',
          descricao: 'Extraímos e processamos seus dados automaticamente. Isso permite identificar padrões e tendências, transformando números complexos em gráficos e relatórios fáceis de entender.'
        },
        {
          titulo: 'Informações Valiosas para Decisões Inteligentes',
          descricao: 'Com os dados organizados, você obtém uma visão completa do seu desempenho. Isso te ajuda a impulsionar vendas, reduzir custos e otimizar processos.'
        },
        {
          titulo: 'Acesse de Onde Estiver',
          descricao: 'Todas essas informações estão disponíveis em um painel interativo, acessível a qualquer momento. Assim, você tem controle total para tomar decisões estratégicas com base em dados.'
        }
      ]
    },
    1: {
      titulo: 'Desenvolvimento Front-end e Sites Corporativos',
      subtitulo: 'Experiência digital',
      descricao: 'Na Kealabs, transformamos a entrada de dados em uma experiência eficiente e sem esforço. Usamos a inteligência de software para criar telas personalizadas que não apenas parecem boas, mas que otimizam o seu fluxo de trabalho.',
      funcionalidades: [
        {
          titulo: 'Telas Personalizadas e Intuitivas',
          descricao: 'Projetamos cada tela pensando na sua equipe. O design é claro, a navegação é simples e a experiência do usuário é intuitiva.'
        },
        {
          titulo: 'Importação Inteligente de Dados',
          descricao: 'A entrada manual de dados é coisa do passado. Nossa tecnologia permite que você importe informações diretamente de arquivos XLS, CSV ou PDFs.'
        },
        {
          titulo: 'Automação para Produtividade Máxima',
          descricao: 'As telas são desenvolvidas para automatizar tarefas repetitivas. Ao importar um arquivo, o sistema preenche os campos, organiza as informações e as valida.'
        },
        {
          titulo: 'Acabe com o Trabalho Manual',
          descricao: 'Com a Kealabs, você não apenas digitaliza processos, mas os otimiza. Chega de copiar e colar informações ou de digitar dados de planilhas.'
        }
      ]
    },
    2: {
      titulo: 'Engenharia de IA',
      subtitulo: 'Inteligência aplicada',
      descricao: 'Utilizamos inteligência artificial para criar assistentes virtuais e ferramentas que potencializam o seu time, permitindo que eles trabalhem de forma mais inteligente e estratégica.',
      funcionalidades: [
        {
          titulo: 'Agentes de IA para Resolução de Dúvidas',
          descricao: 'Nossos agentes de IA são treinados com a base de conhecimento da sua empresa. Eles podem responder perguntas frequentes e complexas de forma instantânea.'
        },
        {
          titulo: 'Prompts Inteligentes para Otimização da Comunicação',
          descricao: 'Criamos prompts personalizados que agilizam a criação de conteúdos, como e-mails, relatórios, propostas e comunicados.'
        },
        {
          titulo: 'Análises Aceleradas e Inteligentes',
          descricao: 'Nossos agentes podem processar grandes volumes de dados rapidamente, gerando insights e resumos executivos.'
        },
        {
          titulo: 'Foco na Estratégia',
          descricao: 'Ao automatizar tarefas repetitivas, nossa solução permite que seus colaboradores dediquem seu tempo à criação de novas estratégias.'
        }
      ]
    },
    3: {
      titulo: 'Criação de Dashboards',
      subtitulo: 'Visão executiva',
      descricao: 'Nossa solução de Business Intelligence (BI) vai além de simplesmente apresentar números. Nós organizamos e visualizamos seus dados de forma intuitiva para que você tenha uma visão clara e acionável do seu negócio.',
      funcionalidades: [
        {
          titulo: 'Coleta e Conexão de Dados',
          descricao: 'Nós conectamos a nossa plataforma às suas fontes de dados, como sistemas de vendas, planilhas financeiras, ou qualquer outra fonte de informação relevante.'
        },
        {
          titulo: 'Criação de Dashboards Intuitivos',
          descricao: 'Com os dados coletados, criamos dashboards personalizados e fáceis de usar. Gráficos, tabelas e indicadores-chave são organizados de forma visual.'
        },
        {
          titulo: 'Análise e Acompanhamento Completo',
          descricao: 'Os dashboards permitem que você acompanhe o desempenho de diferentes áreas, como vendas, marketing, estoque e finanças.'
        },
        {
          titulo: 'Ação e Otimização de Resultados',
          descricao: 'A informação é a base para a ação. Com nossos dashboards, você pode identificar rapidamente quais estratégias estão funcionando.'
        }
      ]
    },
    4: {
      titulo: 'Consultoria de Lean Delivery',
      subtitulo: 'Fluxo de valor',
      descricao: 'Nossa consultoria em Lean Delivery ajuda sua empresa a otimizar processos, reduzir desperdícios e acelerar o fluxo de valor. Começamos com o que você tem hoje e transformamos para entregar melhor amanhã.',
      funcionalidades: [
        {
          titulo: 'Diagnóstico e Mapeamento de Valor',
          descricao: 'Analisamos seus processos atuais para identificar gargalos, desperdícios e oportunidades de melhoria.'
        },
        {
          titulo: 'Implementação de Práticas Ágeis',
          descricao: 'Aplicamos metodologias Lean e Ágeis adaptadas à realidade da sua empresa. Implementamos ciclos curtos de entrega.'
        },
        {
          titulo: 'Otimização Contínua',
          descricao: 'Estabelecemos métricas claras e processos de melhoria contínua. Sua equipe aprende a identificar problemas rapidamente.'
        },
        {
          titulo: 'Resultados Mensuráveis',
          descricao: 'Entregas mais rápidas, menos desperdício, equipes mais produtivas e maior previsibilidade.'
        }
      ]
    }
  };

  return (
    <section id="servicos" className="solucoes">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Soluções completas em dados e inteligência artificial
        </p>
        
        <div className="solucoes-grid">
          {solucoes.map((solucao, index) => (
            <div 
              key={index} 
              className={`solucao-card ${solucao.cor}`}
              onClick={() => setSelectedService(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedService(index);
                }
              }}
              role="button"
              tabIndex="0"
            >
              <div className="solucao-card-top">
                <span className="solucao-index">0{index + 1}</span>
                <span className="solucao-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="solucao-icon" aria-hidden="true">{solucao.icon}</div>
              <div className="solucao-card-body">
                <h3>{solucao.titulo}</h3>
                <p>{solucao.descricao}</p>
              </div>
              <span className="solucao-card-link">Ver solução <span aria-hidden="true">→</span></span>
            </div>
          ))}
        </div>
      </div>

      <ProductModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        data={selectedService !== null ? { ...solucoes[selectedService], icon: solucoes[selectedService].icon, ...serviceDetails[selectedService] } : null}
        type="service"
      />
    </section>
  );
};

export default Solucoes;
