@echo off
REM Script to build and deploy multiple game variants for Windows
REM Usage: deploy-variants.bat [variant] [action]
REM Examples:
REM   deploy-variants.bat desktop build
REM   deploy-variants.bat mobile deploy
REM   deploy-variants.bat all build

setlocal enabledelayedexpansion

set "VARIANT=%1"
if "%VARIANT%"=="" set "VARIANT=all"

set "ACTION=%2"
if "%ACTION%"=="" set "ACTION=build"

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

:build_variant
set "variant=%1"
set "port=%2"
set "tag_suffix=%3"

call :log_info "Building %variant% variant..."

REM Build Docker image
docker build ^
  --build-arg GAME_VARIANT=%variant% ^
  --build-arg NEXT_PUBLIC_BASE_PATH="/game-148-%tag_suffix%" ^
  -t sedie-multiplayer-%variant%:latest ^
  -t sedie-multiplayer-%variant%:%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2% ^
  .

if %errorlevel% neq 0 (
    call :log_error "%variant% variant build failed"
    exit /b 1
)

call :log_success "%variant% variant built successfully"
goto :eof

:deploy_variant
set "variant=%1"
set "port=%2"
set "tag_suffix=%3"

call :log_info "Deploying %variant% variant on port %port%..."

REM Stop existing container if running
docker stop sedie-multiplayer-%variant% 2>nul
docker rm sedie-multiplayer-%variant% 2>nul

REM Run new container
docker run -d ^
  --name sedie-multiplayer-%variant% ^
  -p %port%:5000 ^
  -e GAME_VARIANT=%variant% ^
  -e NEXT_PUBLIC_BASE_PATH="/game-148-%tag_suffix%" ^
  sedie-multiplayer-%variant%:latest

if %errorlevel% neq 0 (
    call :log_error "%variant% variant deployment failed"
    exit /b 1
)

call :log_success "%variant% variant deployed on port %port%"
goto :eof

REM Main logic
if "%VARIANT%"=="desktop" (
    if "%ACTION%"=="build" (
        call :build_variant "desktop" "5001" "d"
    ) else if "%ACTION%"=="deploy" (
        call :deploy_variant "desktop" "5001" "d"
    ) else if "%ACTION%"=="all" (
        call :build_variant "desktop" "5001" "d"
        call :deploy_variant "desktop" "5001" "d"
    ) else (
        call :log_error "Invalid action: %ACTION%"
        echo Usage: %0 desktop [build^|deploy^|all]
        exit /b 1
    )
) else if "%VARIANT%"=="mobile" (
    if "%ACTION%"=="build" (
        call :build_variant "mobile" "5002" "m"
    ) else if "%ACTION%"=="deploy" (
        call :deploy_variant "mobile" "5002" "m"
    ) else if "%ACTION%"=="all" (
        call :build_variant "mobile" "5002" "m"
        call :deploy_variant "mobile" "5002" "m"
    ) else (
        call :log_error "Invalid action: %ACTION%"
        echo Usage: %0 mobile [build^|deploy^|all]
        exit /b 1
    )
) else if "%VARIANT%"=="tablet" (
    if "%ACTION%"=="build" (
        call :build_variant "tablet" "5003" "t"
    ) else if "%ACTION%"=="deploy" (
        call :deploy_variant "tablet" "5003" "t"
    ) else if "%ACTION%"=="all" (
        call :build_variant "tablet" "5003" "t"
        call :deploy_variant "tablet" "5003" "t"
    ) else (
        call :log_error "Invalid action: %ACTION%"
        echo Usage: %0 tablet [build^|deploy^|all]
        exit /b 1
    )
) else if "%VARIANT%"=="all" (
    call :log_info "Building and deploying all variants..."

    REM Desktop
    call :build_variant "desktop" "5001" "d"
    call :deploy_variant "desktop" "5001" "d"

    REM Mobile
    call :build_variant "mobile" "5002" "m"
    call :deploy_variant "mobile" "5002" "m"

    REM Tablet
    call :build_variant "tablet" "5003" "t"
    call :deploy_variant "tablet" "5003" "t"

    call :log_success "All variants deployed successfully!"
    echo.
    echo Access URLs:
    echo   Desktop: http://localhost:5001/game-148-d
    echo   Mobile:  http://localhost:5002/game-148-m
    echo   Tablet:  http://localhost:5003/game-148-t
) else (
    call :log_error "Invalid variant: %VARIANT%"
    echo Usage: %0 [desktop^|mobile^|tablet^|all] [build^|deploy^|all]
    echo.
    echo Examples:
    echo   %0 desktop build    [Build desktop variant]
    echo   %0 mobile deploy    [Deploy mobile variant]
    echo   %0 all build        [Build all variants]
    echo   %0 all all          [Build and deploy all variants]
    exit /b 1
)

goto :eof
