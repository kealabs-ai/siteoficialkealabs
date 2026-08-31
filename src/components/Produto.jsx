import React, { useState } from 'react';
import './Produto.css';

const Produto = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const produtos = [
    {
      id: 1,
      titulo: 'Consultoria Online',
      descricaoResumida: 'Plataforma completa para vender consultorias online com checkout integrado',
      icone: '🎯',
      descricaoCompleta: {
        titulo: 'Plataforma de Consultoria Online',
        subtitulo: 'Venda de consultoria online com checkout de pagamento',
        descricao: 'Uma solução completa para consultores que desejam vender suas consultorias online com um checkout de pagamento seguro e integrado. Transforme seu conhecimento em receita recorrente com uma plataforma profissional e fácil de usar.',
        funcionalidades: [
          {
            titulo: 'Criação do Site de Apresentação',
            descricao: 'Site profissional e responsivo que apresenta sua consultoria de forma elegante e convincente. Uma vitrine digital que atrai clientes, comunica sua proposta de valor e converte visitantes em consultorias agendadas.'
          },
          {
            titulo: 'Checkout Integrado',
            descricao: 'Receba pagamentos de forma segura com integração com as principais gateways de pagamento. Suporte a cartão de crédito, PIX e boleto.'
          },
          {
            titulo: 'Gestão de Clientes',
            descricao: 'Centralize informações de todos os seus clientes, histórico de consultorias, notas e acompanhamento de progresso em um único lugar.'
          },
          {
            titulo: 'Dashboard Analítico',
            descricao: 'Acompanhe suas métricas em tempo real: receita, número de consultorias, taxa de conversão e satisfação dos clientes.'
          }
        ],
        modeloNegocio: [
          {
            titulo: 'Consultoria Sob Demanda',
            descricao: 'Clientes agendam consultorias conforme sua necessidade. Você define o preço, duração e disponibilidade. A plataforma cuida do agendamento e pagamento.'
          },
          {
            titulo: 'Pacotes de Consultorias',
            descricao: 'Ofereça pacotes com múltiplas sessões com desconto. Ideal para clientes que desejam acompanhamento contínuo e você garante receita recorrente.'
          },
          {
            titulo: 'Programas de Transformação',
            descricao: 'Crie programas estruturados com múltiplas fases, materiais complementares e acompanhamento. Agregue valor e justifique preços premium.'
          }
        ],
        beneficios: [
          'Aumente sua receita sem limites geográficos',
          'Automatize processos administrativos',
          'Profissionalize sua operação',
          'Receba pagamentos de forma segura',
          'Acesse relatórios e análises detalhadas'
        ]
      }
    },
    {
      id: 2,
      titulo: 'Matheus Personal',
      descricaoResumida: 'Plataforma de consultoria esportiva online com gestão de alunos e pagamentos integrados',
      icone: '💪',
      tag: 'Case de Sucesso',
      descricaoCompleta: {
        titulo: 'Matheus Personal',
        subtitulo: 'Transforme Conhecimento em Performance',
        descricao: 'Um ecossistema digital completo de consultoria esportiva online projetado para escalar negócios do setor fitness. Desenvolvemos uma plataforma robusta que une tecnologia de ponta e experiência do usuário impecável, estruturando uma solução de alta conversão capaz de centralizar a gestão de alunos, a entrega de treinos periodizados e a automação de pagamentos.',
        funcionalidades: [
          {
            titulo: 'Área do Aluno Inteligente',
            descricao: 'Portal web exclusivo com experiência fluida para acompanhamento de treinos, histórico de cargas e visualização de evolução.'
          },
          {
            titulo: 'Escalabilidade de Nichos',
            descricao: 'Arquitetura flexível desenvolvida para suportar desde alunos de musculação de alta performance até demandas específicas de endurance e reabilitação.'
          },
          {
            titulo: 'Ecossistema de Pagamentos Integrado',
            descricao: 'Automação financeira integrada via gateway, facilitando a conversão e a retenção de assinaturas de forma recorrente.'
          },
          {
            titulo: 'Gestão de Treinos Periodizados',
            descricao: 'Sistema inteligente de periodização de treinos com acompanhamento de progressão e adaptação automática.'
          },
          {
            titulo: 'Rompimento de Barreiras Geográficas',
            descricao: 'Plataforma que permite atender alunos em qualquer lugar, escalando o negócio além do atendimento presencial tradicional.'
          },
          {
            titulo: 'Análise de Evolução',
            descricao: 'Visualização clara do progresso do aluno com gráficos, métricas e relatórios de desempenho.'
          }
        ],
        modeloNegocio: [
          {
            titulo: 'O Desafio',
            descricao: 'Estruturar uma plataforma digital de alta conversão capaz de centralizar a gestão de alunos, a entrega de treinos periodizados e a automação de pagamentos, rompendo as barreiras do atendimento presencial tradicional.'
          },
          {
            titulo: 'A Solução',
            descricao: 'Desenvolvemos um ecossistema completo que integra gestão de alunos, treinos personalizados e pagamentos automáticos em uma única plataforma.'
          },
          {
            titulo: 'Resultado',
            descricao: 'Negócio escalável que permite atender múltiplos alunos simultaneamente com qualidade e automação operacional.'
          },
          {
            titulo: 'Próximos Passos',
            descricao: 'Quer levar o seu negócio para o próximo nível com uma plataforma digital sob medida? Vamos conversar sobre o seu próximo projeto.'
          }
        ],
        beneficios: [
          'Escalabilidade sem limites geográficos',
          'Automação completa de pagamentos',
          'Gestão centralizada de alunos',
          'Treinos periodizados e personalizados',
          'Aumento de conversão e retenção',
          'Redução de sobrecarga operacional'
        ]
      }
    },
    {
      id: 3,
      titulo: 'KeaLex',
      descricaoResumida: 'Escritório virtual inteligente para advocacia moderna com IA integrada',
      icone: '⚖️',
      tag: 'Case de Sucesso',
      descricaoCompleta: {
        titulo: 'KeaLex',
        subtitulo: 'O Escritório Virtual Inteligente para a Advocacia Moderna',
        descricao: 'Desenvolvido com uma arquitetura de microsserviços de alta performance e inteligência artificial integrada, o KeaLex transforma o modelo de trabalho tradicional em um escritório virtual completo, automatizado e inteligente, revolucionando a rotina jurídica de advogados autônomos e escritórios de médio porte.',
        funcionalidades: [
          {
            titulo: 'Captura Automática de Processos',
            descricao: 'Monitoramento inteligente de andamentos processuais e publicações nos diários oficiais, reduzindo a zero o risco de perda de prazos.'
          },
          {
            titulo: 'Agentes de IA para Triagem',
            descricao: 'Assistência de inteligência artificial embutida para auxiliar na análise de documentos, estruturação de minutas e sumarização de dossiês complexos.'
          },
          {
            titulo: 'Portal do Cliente Integrado',
            descricao: 'Um canal transparente e seguro para que os clientes acompanhem o status de seus processos e compartilhem documentos em tempo real.'
          },
          {
            titulo: 'Gestão Financeira Jurídica',
            descricao: 'Automação de honorários, emissão de cobranças recorrentes e controle de fluxo de caixa específico para o setor jurídico.'
          },
          {
            titulo: 'Mobilidade Total em Nuvem',
            descricao: 'Acesso seguro em nuvem de qualquer dispositivo, garantindo que o seu escritório esteja na palma da sua mão, 24 horas por dia.'
          },
          {
            titulo: 'Segurança de Dados Avançada',
            descricao: 'Conformidade rigorosa com padrões de proteção de dados e criptografia de ponta para sigilo absoluto das informações dos clientes.'
          }
        ],
        modeloNegocio: [
          {
            titulo: 'O Desafio',
            descricao: 'Eliminar a sobrecarga operacional dos advogados — como o acompanhamento manual de publicações em diários oficiais, o controle rigoroso de prazos processuais fatais e a dispersão na comunicação com clientes.'
          },
          {
            titulo: 'Foco na Estratégia Jurídica',
            descricao: 'Permitir que o profissional foque exclusivamente na estratégia jurídica e no ganho de causas, deixando a operação para a plataforma.'
          },
          {
            titulo: 'Escalabilidade Modular',
            descricao: 'Estrutura modular que cresce junto com o seu escritório, seja você um advogado solo ou gestor de uma equipe em expansão.'
          },
          {
            titulo: 'Transformação Digital',
            descricao: 'Descubra como o KeaLex pode elevar o padrão do seu escritório com uma plataforma desenvolvida sob medida para a sua operação.'
          }
        ],
        beneficios: [
          'Eliminação de risco de perda de prazos',
          'Automação de tarefas operacionais',
          'Inteligência artificial integrada',
          'Segurança e conformidade garantidas',
          'Mobilidade total do escritório',
          'Escalabilidade para crescimento'
        ]
      }
    }
  ];

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <section id="produtos" className="produtos">
        <div className="container">
          <h2>Nossos Produtos</h2>
          <p className="produtos-subtitle">Soluções inovadoras para impulsionar seu negócio</p>
          
          <div className="produtos-grid">
            {produtos.map((produto) => (
              <div key={produto.id} className="produto-card-resumido">
                {produto.tag && <span className="card-tag">{produto.tag}</span>}
                <div className="card-icone">{produto.icone}</div>
                <h3>{produto.titulo}</h3>
                <p>{produto.descricaoResumida}</p>
                <button 
                  className="btn-saiba-mais"
                  onClick={() => setSelectedProduct(produto)}
                >
                  Saiba Mais
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            <div className="modal-header">
              <div className="modal-icone">{selectedProduct.icone}</div>
              <h2>{selectedProduct.descricaoCompleta.titulo}</h2>
              <p className="modal-subtitulo">{selectedProduct.descricaoCompleta.subtitulo}</p>
              {selectedProduct.id === 2 && (
                <a href="https://www.matheuspersonal.com.br" target="_blank" rel="noopener noreferrer" className="modal-link" title="Visitar site">
                  🌐
                </a>
              )}
              {selectedProduct.id === 3 && (
                <a href="https://www.kealex.com.br" target="_blank" rel="noopener noreferrer" className="modal-link" title="Visitar site">
                  🌐
                </a>
              )}
            </div>

            <div className="modal-body">
              <p className="modal-descricao">{selectedProduct.descricaoCompleta.descricao}</p>

              {/* Funcionalidades */}
              <div className="modal-section">
                <h3>Funcionalidades Principais</h3>
                <div className="funcionalidades-grid">
                  {selectedProduct.descricaoCompleta.funcionalidades.map((func, idx) => (
                    <div key={idx} className="funcionalidade-item">
                      <h4>{func.titulo}</h4>
                      <p>{func.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modelo de Negócio */}
              <div className="modal-section">
                <h3>Modelo de Negócio</h3>
                <div className="modelo-grid">
                  {selectedProduct.descricaoCompleta.modeloNegocio.map((modelo, idx) => (
                    <div key={idx} className="modelo-item">
                      <h4>{modelo.titulo}</h4>
                      <p>{modelo.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefícios */}
              <div className="modal-section">
                <h3>Benefícios</h3>
                <div className="beneficios-lista">
                  {selectedProduct.descricaoCompleta.beneficios.map((beneficio, idx) => (
                    <div key={idx} className="beneficio-item">
                      <span className="beneficio-check">✓</span>
                      <p>{beneficio}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="modal-cta">
                <a href="#contato" className="btn-primary" onClick={closeModal}>
                  Solicite uma Demonstração
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Produto;
