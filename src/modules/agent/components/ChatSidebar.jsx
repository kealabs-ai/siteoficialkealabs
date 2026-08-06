import React from 'react';
import '../agent.css';

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
    <div className={`chat-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h3>Conversas</h3>
        <button className="btn-new-session" onClick={onCreateSession} title="Nova conversa">
          +
        </button>
      </div>

      <div className="sessions-list">
        {sessions.length === 0 ? (
          <p className="empty-sessions">Nenhuma conversa ainda</p>
        ) : (
          sessions.map(session => (
            <div
              key={session.id}
              className={`session-item ${activeSessionId === session.id ? 'active' : ''}`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="session-content">
                <div className="session-icon">💬</div>
                <div className="session-info">
                  <div className="session-name">{session.agent_name || 'Agent Kea'}</div>
                  <div className="session-meta">
                    {session.model} • {formatDate(session.created_at)}
                  </div>
                </div>
              </div>
              <button
                className="btn-delete-session"
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
