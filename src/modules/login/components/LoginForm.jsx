import React, { useState } from 'react';
import { login } from '../../../services/authService';

const LoginForm = ({ onSubmit, isLoading: externalIsLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      onSubmit({ email, password, ...response });
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const isSubmitting = isLoading || externalIsLoading;

  return (
    <form 
      className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl animate-slideUp"
      onSubmit={handleSubmit}
    >
      {/* Campo Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
          Email
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">✉️</span>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            disabled={isSubmitting}
            className="w-full pl-12 pr-4 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:bg-white/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            autoComplete="email"
          />
        </div>
      </div>

      {/* Campo Senha */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-bold text-white uppercase tracking-wider mb-3">
          Senha
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isSubmitting}
            className="w-full pl-12 pr-12 py-3 bg-white/20 border-2 border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 focus:bg-white/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isSubmitting}
            title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? '👁️' : '👁️🗨️'}
          </button>
        </div>
      </div>

      {/* Opções */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer text-white text-sm font-medium">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isSubmitting}
            className="w-4 h-4 accent-emerald-400 cursor-pointer"
          />
          <span>Lembrar-me</span>
        </label>
        <a 
          href="#forgot" 
          className="text-emerald-400 hover:text-cyan-400 text-sm font-semibold transition-colors"
        >
          Esqueceu a senha?
        </a>
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="mb-6 bg-red-500/20 border-l-4 border-orange-500 rounded-lg p-4 flex items-center gap-3 animate-shake">
          <span className="text-lg">⚠️</span>
          <span className="text-red-200 text-sm">{error}</span>
        </div>
      )}

      {/* Botão de Login */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>Entrando...</span>
          </>
        ) : (
          <>
            <span>Entrar</span>
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </>
        )}
      </button>

      {/* Footer */}
      <div className="mt-6 text-center border-t border-white/20 pt-6">
        <p className="text-white/80 text-sm">
          Não tem uma conta?{' '}
          <a href="#signup" className="text-emerald-400 hover:text-cyan-400 font-bold transition-colors">
            Solicite acesso
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
