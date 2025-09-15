#!/bin/bash

# Simple deployment script for single container multi-path approach
# Usage: ./deploy-single.sh [build|deploy|all]

set -e

ACTION=${1:-"all"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

build_app() {
    log_info "Building single container app..."

    # Build Docker image
    docker build -t sedie-multiplayer:latest .

    if [ $? -eq 0 ]; then
        log_success "App built successfully"
    else
        log_error "Build failed"
        exit 1
    fi
}

deploy_app() {
    log_info "Deploying single container app..."

    # Stop existing container if running
    docker stop sedie-multiplayer 2>/dev/null || true
    docker rm sedie-multiplayer 2>/dev/null || true

    # Run new container
    docker run -d \
        --name sedie-multiplayer \
        -p 5000:5000 \
        -e NEXT_PUBLIC_DEFAULT_GAME_ID=148 \
        sedie-multiplayer:latest

    if [ $? -eq 0 ]; then
        log_success "App deployed successfully"
        echo ""
        echo "Multi-path URLs available:"
        echo "  Desktop: http://localhost:5000/game-148-d"
        echo "  Mobile:  http://localhost:5000/game-148-m"
        echo "  Tablet:  http://localhost:5000/game-148-t"
        echo "  Default: http://localhost:5000/game-148"
        echo ""
        echo "All paths serve the same responsive app with shared resources!"
    else
        log_error "Deployment failed"
        exit 1
    fi
}

case ${ACTION} in
    "build")
        build_app
        ;;
    "deploy")
        deploy_app
        ;;
    "all")
        build_app
        deploy_app
        ;;
    *)
        log_error "Invalid action: ${ACTION}"
        echo "Usage: $0 [build|deploy|all]"
        echo ""
        echo "Examples:"
        echo "  $0 build    # Build only"
        echo "  $0 deploy   # Deploy only"
        echo "  $0 all      # Build and deploy"
        exit 1
        ;;
esac
