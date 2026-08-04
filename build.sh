#!/bin/bash

# Script de Build para Kealabs
# Uso: ./build.sh

echo ""
echo "========================================"
echo "  Kealabs - Build Script"
echo "========================================"
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "[ERRO] Node.js não está instalado"
    exit 1
fi

echo "[INFO] Node.js encontrado: $(node --version)"
echo ""

# Navegar para app
echo "[INFO] Navegando para diretório app..."
cd app || exit 1

# Verificar se package.json existe
if [ ! -f package.json ]; then
    echo "[ERRO] package.json não encontrado em app/"
    exit 1
fi

# Instalar dependências
echo "[INFO] Instalando dependências..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERRO] Falha ao instalar dependências"
    exit 1
fi

echo ""
echo "[INFO] Iniciando build..."
npm run build
if [ $? -ne 0 ]; then
    echo "[ERRO] Falha ao fazer build"
    exit 1
fi

echo ""
echo "========================================"
echo "  Build concluído com sucesso!"
echo "========================================"
echo ""
echo "Arquivos gerados em: app/dist/"
echo ""
