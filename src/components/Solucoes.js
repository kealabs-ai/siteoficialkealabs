import React, { useState } from 'react';
import './Solucoes.css';

const Solucoes = () => {
  const [modalOpen, setModalOpen] = useState(null);

  const solucoes = [
    {
      titulo: 'Desenvolvimento de APIs',
      descricao: 'Conecte dados do seu sistema de forma simples para tomar decisões inteligentes, otimizar vendas e reduzir custos.',
      cor: 'verde',
      icon: '🔌'
    },
    {
      titulo: 'Desenvolvimento Front-end',
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
              onClick={() => setModalOpen(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className="solucao-icon">{solucao.icon}</div>
              <h3>{solucao.titulo}</h3>
              <p>{solucao.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {modalOpen === 0 && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon">🔌</div>
              <h2>Desenvolvimento de APIs</h2>
            </div>
            <p className="modal-intro">
              Conecte os dados do seu sistema e transforme informações brutas em insights valiosos para o seu negócio.
            </p>
            
            <div className="modal-section">
              <h3>Conexão Simples e Direta:</h3>
              <p>
                Nossa plataforma se conecta de forma segura e descomplicada ao seu sistema de gestão (ERP, CRM, etc.), 
                sem a necessidade de conhecimento técnico. Em poucos cliques, você sincroniza seus dados.
              </p>
            </div>

            <div className="modal-section">
              <h3>Análise Inteligente de Dados:</h3>
              <p>
                Extraímos e processamos seus dados automaticamente. Isso permite identificar padrões e tendências, 
                transformando números complexos em gráficos e relatórios fáceis de entender.
              </p>
            </div>

            <div className="modal-section">
              <h3>Informações Valiosas para Decisões Inteligentes:</h3>
              <p>Com os dados organizados, você obtém uma visão completa do seu desempenho. Isso te ajuda a:</p>
              <ul>
                <li><strong>Impulsionar Vendas:</strong> Entenda o que vende mais e identifique oportunidades para criar novas estratégias.</li>
                <li><strong>Reduzir Custos:</strong> Analise seus gastos em tempo real e encontre áreas onde é possível economizar.</li>
                <li><strong>Otimizar Processos:</strong> Descubra gargalos e ineficiências na sua operação para tornar o trabalho mais ágil e produtivo.</li>
              </ul>
            </div>

            <div className="modal-section">
              <h3>Acesse de Onde Estiver:</h3>
              <p>
                Todas essas informações estão disponíveis em um painel interativo, acessível a qualquer momento. 
                Assim, você tem controle total para tomar decisões estratégicas com base em dados, não em suposições.
              </p>
            </div>
          </div>
        </div>
      )}

      {modalOpen === 1 && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon">💻</div>
              <h2>Desenvolvimento Front-end</h2>
            </div>
            <p className="modal-intro">
              Como a Kealabs cria telas inteligentes?
            </p>
            <p className="modal-intro-text">
              Na Kealabs, transformamos a entrada de dados em uma experiência eficiente e sem esforço. 
              Usamos a inteligência de software para criar telas personalizadas que não apenas parecem boas, 
              mas que otimizam o seu fluxo de trabalho.
            </p>
            
            <div className="modal-section">
              <h3>Telas Personalizadas e Intuitivas:</h3>
              <p>
                Projetamos cada tela pensando na sua equipe. O design é claro, a navegação é simples e a 
                experiência do usuário é intuitiva, garantindo que o seu time use a solução sem precisar de 
                longos treinamentos. O foco é na produtividade, não na complexidade.
              </p>
            </div>

            <div className="modal-section">
              <h3>Importação Inteligente de Dados:</h3>
              <p>
                A entrada manual de dados é coisa do passado. Nossa tecnologia permite que você importe 
                informações diretamente de arquivos XLS, CSV ou PDFs. Nosso sistema lê o conteúdo e mapeia 
                os dados automaticamente, eliminando erros e poupando um tempo precioso.
              </p>
            </div>

            <div className="modal-section">
              <h3>Automação para Produtividade Máxima:</h3>
              <p>
                As telas são desenvolvidas para automatizar tarefas repetitivas. Ao importar um arquivo, 
                o sistema preenche os campos, organiza as informações e as valida. Isso libera sua equipe 
                para focar em tarefas mais estratégicas.
              </p>
            </div>

            <div className="modal-section">
              <h3>Acabe com o Trabalho Manual:</h3>
              <p>
                Com a Kealabs, você não apenas digitaliza processos, mas os otimiza. Chega de copiar e colar 
                informações ou de digitar dados de planilhas e documentos. Nossas telas inteligentes fazem o 
                trabalho pesado por você.
              </p>
            </div>
          </div>
        </div>
      )}

      {modalOpen === 2 && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon">🤖</div>
              <h2>Engenharia de IA</h2>
            </div>
            <p className="modal-intro">
              Como nossos agentes e prompts de IA funcionam?
            </p>
            <p className="modal-intro-text">
              Utilizamos inteligência artificial para criar assistentes virtuais e ferramentas que potencializam 
              o seu time, permitindo que eles trabalhem de forma mais inteligente e estratégica.
            </p>
            
            <div className="modal-section">
              <h3>Agentes de IA para Resolução de Dúvidas:</h3>
              <p>
                Nossos agentes de IA são treinados com a base de conhecimento da sua empresa. Eles podem responder 
                perguntas frequentes e complexas de forma instantânea, liberando seus colaboradores do trabalho manual 
                de busca por informações. Eles servem como um assistente sempre disponível para apoiar as equipes de 
                vendas, suporte, RH e outras áreas, garantindo que a informação certa esteja acessível no momento exato.
              </p>
            </div>

            <div className="modal-section">
              <h3>Prompts Inteligentes para Otimização da Comunicação:</h3>
              <p>
                Criamos prompts personalizados que agilizam a criação de conteúdos, como e-mails, relatórios, propostas 
                e comunicados. Em vez de começar do zero, seus colaboradores usam os prompts para gerar rascunhos 
                otimizados e profissionais, garantindo uma comunicação clara e eficiente, tanto interna quanto externamente.
              </p>
            </div>

            <div className="modal-section">
              <h3>Análises Aceleradas e Inteligentes:</h3>
              <p>
                Nossos agentes podem processar grandes volumes de dados rapidamente, gerando insights e resumos executivos. 
                Em vez de gastar horas analisando planilhas, sua equipe pode usar a IA para identificar tendências, criar 
                relatórios e obter análises aprofundadas com agilidade, transformando dados em decisões.
              </p>
            </div>

            <div className="modal-section">
              <h3>Foco na Estratégia:</h3>
              <p>
                Ao automatizar tarefas repetitivas e aprimorar a comunicação e a análise, nossa solução permite que seus 
                colaboradores deixem o trabalho operacional de lado e dediquem seu tempo e energia à criação de novas 
                estratégias, inovações e ao crescimento do seu negócio.
              </p>
            </div>
          </div>
        </div>
      )}

      {modalOpen === 3 && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon">📊</div>
              <h2>Criação de Dashboards</h2>
            </div>
            <p className="modal-intro">
              Como transformamos dados em decisões?
            </p>
            <p className="modal-intro-text">
              Nossa solução de Business Intelligence (BI) vai além de simplesmente apresentar números. 
              Nós organizamos e visualizamos seus dados de forma intuitiva para que você tenha uma visão clara 
              e acionável do seu negócio.
            </p>
            
            <div className="modal-section">
              <h3>Coleta e Conexão de Dados:</h3>
              <p>
                Nós conectamos a nossa plataforma às suas fontes de dados, como sistemas de vendas, planilhas financeiras, 
                ou qualquer outra fonte de informação relevante para a sua empresa. Este processo é automatizado para 
                garantir que os dados estejam sempre atualizados, eliminando o trabalho manual de coleta.
              </p>
            </div>

            <div className="modal-section">
              <h3>Criação de Dashboards Intuitivos:</h3>
              <p>
                Com os dados coletados, criamos dashboards personalizados e fáceis de usar. Gráficos, tabelas e 
                indicadores-chave são organizados de forma visual para mostrar o desempenho do seu negócio em tempo real. 
                Você não precisa ser um analista de dados para entender o que está acontecendo.
              </p>
            </div>

            <div className="modal-section">
              <h3>Análise e Acompanhamento Completo:</h3>
              <p>
                Os dashboards permitem que você acompanhe o desempenho de diferentes áreas, como vendas, marketing, 
                estoque e finanças. Você pode ver tendências, identificar pontos de melhoria e antecipar problemas, 
                tudo em um só lugar. Tenha uma visão 360º do seu negócio e tome decisões baseadas em fatos, não em suposições.
              </p>
            </div>

            <div className="modal-section">
              <h3>Ação e Otimização de Resultados:</h3>
              <p>
                A informação é a base para a ação. Com nossos dashboards, você pode identificar rapidamente quais 
                estratégias estão funcionando e onde estão as oportunidades. Use os insights obtidos para otimizar campanhas, 
                reduzir custos e aumentar a sua receita, garantindo que o seu negócio esteja sempre crescendo.
              </p>
            </div>
          </div>
        </div>
      )}

      {modalOpen === 4 && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(null)}>✕</button>
            <div className="modal-header">
              <div className="modal-icon">🚀</div>
              <h2>Consultoria de Lean Delivery</h2>
            </div>
            <p className="modal-intro">
              Acelere suas entregas e elimine desperdícios
            </p>
            <p className="modal-intro-text">
              Nossa consultoria em Lean Delivery ajuda sua empresa a otimizar processos, reduzir desperdícios e 
              acelerar o fluxo de valor. Começamos com o que você tem hoje e transformamos para entregar melhor amanhã.
            </p>
            
            <div className="modal-section">
              <h3>Diagnóstico e Mapeamento de Valor:</h3>
              <p>
                Analisamos seus processos atuais para identificar gargalos, desperdícios e oportunidades de melhoria. 
                Mapeamos todo o fluxo de valor, desde a solicitação até a entrega, revelando onde seu tempo e recursos 
                estão sendo desperdiçados.
              </p>
            </div>

            <div className="modal-section">
              <h3>Implementação de Práticas Ágeis:</h3>
              <p>
                Aplicamos metodologias Lean e Ágeis adaptadas à realidade da sua empresa. Implementamos ciclos curtos 
                de entrega, reuniões eficientes e rituais que aumentam a colaboração e a transparência entre as equipes.
              </p>
            </div>

            <div className="modal-section">
              <h3>Otimização Contínua:</h3>
              <p>
                Estabelecemos métricas claras e processos de melhoria contínua. Sua equipe aprende a identificar problemas 
                rapidamente e implementar soluções de forma autônoma, criando uma cultura de excelência operacional.
              </p>
            </div>

            <div className="modal-section">
              <h3>O que você ganha:</h3>
              <ul>
                <li><strong>Entregas mais rápidas:</strong> Reduza o tempo de ciclo e aumente a velocidade de entrega ao mercado.</li>
                <li><strong>Menos desperdício:</strong> Elimine atividades que não agregam valor e otimize recursos.</li>
                <li><strong>Equipes mais produtivas:</strong> Times alinhados, motivados e focados no que realmente importa.</li>
                <li><strong>Maior previsibilidade:</strong> Planejamento mais assertivo e entregas consistentes.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Solucoes;
