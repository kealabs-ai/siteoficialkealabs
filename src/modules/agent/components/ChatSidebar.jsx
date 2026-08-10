import React from 'react';

const ChatSidebar = ({ 
  sessions, 
  activeSessionId, 
  onSelectSession, 
  onCreateSession, 
  onDeleteSession,
  isOpen 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className={`w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden shadow-sm ${
      isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
    }`}>
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">Conversas</h3>
        <button 
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white border-none cursor-pointer text-base transition-all hover:bg-emerald-700 hover:shadow-md"
          onClick={onCreateSession} 
          title="Nova conversa"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1">
        {sessions.length === 0 ? (
          <p className="px-3 py-4 text-center text-gray-500 text-xs">Nenhuma conversa ainda</p>
        ) : (
          sessions.map(session => (
            <div
              key={session.id}
              className={`group flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer transition-all border-2 border-transparent ${
                activeSessionId === session.id 
                  ? 'bg-emerald-50 border-emerald-600 shadow-sm' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex gap-2 flex-1 min-w-0">
                <div className="text-base flex-shrink-0">💬</div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">{session.agent_name || 'Agent Kea'}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {session.model} • {formatDate(session.created_at)}
                  </div>
                </div>
              </div>
              <button
                className="text-base opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Deletar esta conversa?')) {
                    onDeleteSession(session.id);
                  }
                }}
                title="Deletar"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
