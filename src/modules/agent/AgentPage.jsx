import React, { useState, useEffect } from 'react';
import useAgentChat from './hooks/useAgentChat';
import useSettings from '../configuracoes/useSettings';
import ChatSidebar from './components/ChatSidebar';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';

const AgentPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { agent: agentProfile } = useSettings();
  const {
    sessions,
    activeSessionId,
    messages,
    loading,
    error,
    selectedModel,
    createNewSession,
    switchSession,
    deleteSession,
    sendMessage,
    changeModel,
    setError
  } = useAgentChat();

  const handleSuggestClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full max-w-full overflow-hidden">
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={switchSession}
        onCreateSession={createNewSession}
        onDeleteSession={deleteSession}
        isOpen={sidebarOpen}
      />

      <div className={`flex-1 flex flex-col overflow-hidden w-full transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          agentProfile={agentProfile}
          selectedModel={selectedModel}
          onChangeModel={changeModel}
          sidebarOpen={sidebarOpen}
        />

        <ChatMessages
          messages={messages}
          loading={loading}
          agentProfile={agentProfile}
          onSuggestClick={handleSuggestClick}
        />

        <ChatInput
          onSendMessage={sendMessage}
          loading={loading}
          error={error}
          onClearError={() => setError(null)}
        />
      </div>
    </div>
  );
};

export default AgentPage;
