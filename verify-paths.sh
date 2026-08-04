#!/bin/bash

# Script para verificar caminhos de importação

echo "🔍 Verificando caminhos de importação..."
echo ""

# Verificar LoginPage.jsx
echo "📄 Verificando LoginPage.jsx..."
if grep -q "from '../../../services/authService'" src/modules/login/pages/LoginPage.jsx; then
  echo "✅ LoginPage.jsx - Caminho correto"
else
  echo "❌ LoginPage.jsx - Caminho incorreto"
fi

# Verificar LoginForm.jsx
echo "📄 Verificando LoginForm.jsx..."
if grep -q "from '../../../services/authService'" src/modules/login/components/LoginForm.jsx; then
  echo "✅ LoginForm.jsx - Caminho correto"
else
  echo "❌ LoginForm.jsx - Caminho incorreto"
fi

# Verificar ProtectedRoute.jsx
echo "📄 Verificando ProtectedRoute.jsx..."
if grep -q "from '../services/authService'" src/components/ProtectedRoute.jsx; then
  echo "✅ ProtectedRoute.jsx - Caminho correto"
else
  echo "❌ ProtectedRoute.jsx - Caminho incorreto"
fi

# Verificar useAuth.js
echo "📄 Verificando useAuth.js..."
if grep -q "from '../services/authService'" src/hooks/useAuth.js; then
  echo "✅ useAuth.js - Caminho correto"
else
  echo "❌ useAuth.js - Caminho incorreto"
fi

echo ""
echo "✨ Verificação concluída!"
