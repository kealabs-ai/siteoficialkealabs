import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, loading, error, onClearError }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 80) + 'px';
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
        textareaRef.current.style.height = '40px';
        textareaRef.current.focus();
      }
    }
  };

  return (
    <div className="px-2 sm:px-4 py-2 sm:py-3 bg-white border-t border-gray-200 flex-shrink-0 shadow-sm transition-all duration-300">
      {error && (
        <div className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-900 mb-2 sm:mb-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium">
              {typeof error === 'string' ? error : error.message}
            </p>
            {error.status && (
              <details className="mt-1 sm:mt-2">
                <summary className="text-xs text-red-700 underline cursor-pointer">Ver detalhes</summary>
                <pre className="mt-1 sm:mt-2 p-2 bg-white border border-red-200 rounded text-xs overflow-x-auto max-h-40">
                  {JSON.stringify(error.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
          <button 
            className="text-red-700 hover:text-red-900 transition-colors flex-shrink-0"
            onClick={onClearError}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex gap-2 sm:gap-3 items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem... (Shift+Enter para quebra de linha)"
          className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg font-inherit text-xs sm:text-sm text-gray-900 resize-none min-h-10 max-h-20 transition-all focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-50 disabled:text-gray-500"
          disabled={loading}
          rows="1"
        />
        <button
          className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-600 text-white border-none cursor-pointer text-sm sm:text-base transition-all hover:bg-emerald-700 hover:shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
          onClick={handleSend}
          disabled={loading || !message.trim()}
          title="Enviar (Enter)"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
