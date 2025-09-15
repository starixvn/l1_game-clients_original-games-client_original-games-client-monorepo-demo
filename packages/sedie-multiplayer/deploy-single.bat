@echo off
REM Simple deployment script for single container multi-path approach (Windows)
REM Usage: deploy-single.bat [build|deploy|all]

setlocal enabledelayedexpansion

set "ACTION=%1"
if "%ACTION%"=="" set "ACTION=all"

REM Colors for output (Windows CMD)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

:log_info
echo [INFO] %~1
goto :eof

:log_success
echo [SUCCESS] %~1
goto :eof

:log_warning
echo [WARNING] %~1
goto :eof

:log_error
echo [ERROR] %~1
goto :eof

:build_app
call :log_info "Building single container app..."

REM Build Docker image
docker build -t sedie-multiplayer:latest .

if %errorlevel% neq 0 (
    call :log_error "Build failed"
    exit /b 1
)

call :log_success "App built successfully"
goto :eof

:deploy_app
call :log_info "Deploying single container app..."

REM Stop existing container if running
docker stop sedie-multiplayer 2>nul
docker rm sedie-multiplayer 2>nul

REM Run new container
docker run -d ^
  --name sedie-multiplayer ^
  -p 5000:5000 ^
  -e NEXT_PUBLIC_DEFAULT_GAME_ID=148 ^
  sedie-multiplayer:latest

if %errorlevel% neq 0 (
    call :log_error "Deployment failed"
    exit /b 1
)

call :log_success "App deployed successfully"
echo.
echo Multi-path URLs available:
echo   Desktop: http://localhost:5000/game-148-d
echo   Mobile:  http://localhost:5000/game-148-m
echo   Tablet:  http://localhost:5000/game-148-t
echo   Default: http://localhost:5000/game-148
echo.
echo All paths serve the same responsive app with shared resources!
goto :eof

REM Main logic
if "%ACTION%"=="build" (
    call :build_app
) else if "%ACTION%"=="deploy" (
    call :deploy_app
) else if "%ACTION%"=="all" (
    call :build_app
    call :deploy_app
) else (
    call :log_error "Invalid action: %ACTION%"
    echo Usage: %0 [build^|deploy^|all]
    echo.
    echo Examples:
    echo   %0 build    [Build only]
    echo   %0 deploy   [Deploy only]
    echo   %0 all      [Build and deploy]
    exit /b 1
)

goto :eof
