import React, { useState, useRef, useEffect } from 'react';
import '../agent.css';

const ChatInput = ({ onSendMessage, loading, error, onClearError }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '36px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 60) + 'px';
    }
  };

  useEffect(() => {
    autoResize();
  }, [message]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '36px';
        textareaRef.current.focus();
      }
    }
  };

  return (
    <div className="chat-input-container">
      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <div className="error-content">
            <p className="error-message">
              {typeof error === 'string' ? error : error.message}
            </p>
            {error.status && (
              <details className="error-details">
                <summary>Ver resposta completa</summary>
                <pre>{JSON.stringify(error.data, null, 2)}</pre>
              </details>
            )}
          </div>
          <button 
            className="btn-close-error"
            onClick={onClearError}
          >
            ✕
          </button>
        </div>
      )}

      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem... (Shift+Enter para quebra de linha)"
          className="message-input"
          disabled={loading}
          rows="1"
        />
        <button
          className="btn-send"
          onClick={handleSend}
          disabled={loading || !message.trim()}
          title="Enviar (Enter)"
        >
          📤
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
