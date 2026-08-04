@echo off
REM Script de Build para Kealabs
REM Uso: build.bat

echo.
echo ========================================
echo   Kealabs - Build Script
echo ========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js nao esta instalado
    pause
    exit /b 1
)

echo [INFO] Node.js encontrado
echo.

REM Navegar para app
echo [INFO] Navegando para diretorio app...
cd app

REM Verificar se package.json existe
if not exist package.json (
    echo [ERRO] package.json nao encontrado em app/
    pause
    exit /b 1
)

REM Instalar dependências
echo [INFO] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo [ERRO] Falha ao instalar dependencias
    pause
    exit /b 1
)

echo.
echo [INFO] Iniciando build...
call npm run build
if errorlevel 1 (
    echo [ERRO] Falha ao fazer build
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build concluido com sucesso!
echo ========================================
echo.
echo Arquivos gerados em: app\dist\
echo.
pause
