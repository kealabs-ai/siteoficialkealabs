import React, { useEffect, useRef } from 'react';
import '../agent.css';

const ChatMessages = ({ 
  messages, 
  loading, 
  agentProfile,
  onSuggestClick 
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const renderMarkdown = (text) => {
    let html = text;
    
    // Escapar HTML especial
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Títulos (# ## ###)
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    
    // Negrito **texto**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Itálico *texto*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Código inline `código`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Blocos de código ```código```
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Listas com -
    html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');
    
    // Listas com •
    html = html.replace(/^• (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');
    
    // Listas numeradas
    html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ol>$1</ol>');
    
    // Links [texto](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Quebras de linha
    html = html.replace(/\n/g, '<br />');
    
    return html;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return new Date().toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return new Date().toLocaleString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
    }
    
    return date.toLocaleString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const suggestions = [
    'Quais são seus serviços?',
    'Qual é o preço?',
    'O que é um AI Agent?',
    'Como funciona o suporte?',
    'Opções de hospedagem',
    'Integração com WhatsApp'
  ];

  if (messages.length === 0 && !loading) {
    return (
      <div className="chat-messages empty">
        <div className="empty-state">
          <div className="empty-avatar">
            <span className="avatar-icon">✨</span>
            <span className="online-badge"></span>
          </div>
          <h3>Olá! Sou {agentProfile?.name || 'Agent Kea'} 👋</h3>
          <p className="empty-subtitle">
            {agentProfile?.role || 'Assistente IA'} • {agentProfile?.company || 'Kealabs'}
          </p>
          
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => onSuggestClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div key={message.id || index} className={`message ${message.role}`}>
          <div className="message-avatar">
            {message.role === 'user' ? '👤' : '🤖'}
          </div>
          <div className="message-content">
            <div 
              className="message-text"
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(message.content) 
              }}
            />
            <span className="message-time">
              {formatTime(message.timestamp || message.created_at || message.sent_at)}
            </span>
          </div>
        </div>
      ))}

      {loading && (
        <div className="message bot typing">
          <div className="message-avatar">🤖</div>
          <div className="message-content">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="typing-text">Respondendo...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
