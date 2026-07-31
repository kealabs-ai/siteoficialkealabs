import React, { useState } from 'react';
import './styles/global.css';
import Login from './components/Login';
import ClientHeader from './components/ClientHeader';

interface UserData {
  email: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);

  const handleLogin = (userData: UserData): void => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <ClientHeader onLogout={handleLogout} user={user || undefined} />
      <main className="client-main">
        <div className="container">
          <h1>Bem-vindo, {user?.email}!</h1>
          <p>Você está na sua área de cliente Kealabs</p>
        </div>
      </main>
    </div>
  );
};

export default App;
