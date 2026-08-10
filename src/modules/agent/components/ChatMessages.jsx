import React, { useEffect, useRef } from 'react';

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
    
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-sm font-bold mt-2 mb-1">$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-base font-bold mt-2 mb-1">$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-lg font-bold mt-2 mb-1">$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
    html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-2 rounded text-xs font-mono overflow-x-auto my-1"><code>$1</code></pre>');
    html = html.replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li.*?<\/li>)/s, '<ul class="list-disc">$1</ul>');
    html = html.replace(/^• (.*?)$/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li.*?<\/li>)/s, '<ul class="list-disc">$1</ul>');
    html = html.replace(/^\d+\. (.*?)$/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/(<li.*?<\/li>)/s, '<ol class="list-decimal">$1</ol>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:text-emerald-700 underline">$1</a>');
    html = html.replace(/\n/g, '<br />');
    
    return html;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return new Date().toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
    
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    }
    
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit'
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-6 flex flex-col items-center justify-center transition-all duration-300">
        <div className="max-w-sm w-full">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <span className="text-xl sm:text-2xl">✨</span>
            <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center">Olá! Sou {agentProfile?.name || 'Agent Kea'} 👋</h3>
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-1">
            {agentProfile?.role || 'Assistente IA'}
          </p>
          
          <div className="grid grid-cols-1 gap-2 mt-4 sm:mt-6">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-700 transition-all text-left"
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
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 flex flex-col gap-3 sm:gap-4 scroll-smooth transition-all duration-300">
      {messages.map((message, index) => (
        <div key={message.id || index} className={`flex gap-2 sm:gap-3 animate-in slide-in-from-bottom-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center text-sm sm:text-lg">
              🤖
            </div>
          )}
          <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm leading-relaxed ${
            message.role === 'user' 
              ? 'bg-emerald-600 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none'
          }`}>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(message.content) 
              }}
            />
            <span className={`block text-xs mt-1 ${message.role === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
              {formatTime(message.timestamp || message.created_at || message.sent_at)}
            </span>
          </div>
          {message.role === 'user' && (
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-sm sm:text-lg">
              👤
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div className="flex gap-2 sm:gap-3 justify-start">
          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center text-sm sm:text-lg">
            🤖
          </div>
          <div className="bg-gray-100 border border-gray-200 text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg rounded-bl-none">
            <div className="flex gap-1 items-center">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <span className="text-xs text-gray-500 block mt-1">Respondendo...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
