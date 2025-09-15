#!/bin/bash

# Script to build and deploy multiple game variants
# Usage: ./deploy-variants.sh [variant] [action]
# Examples:
#   ./deploy-variants.sh desktop build
#   ./deploy-variants.sh mobile deploy
#   ./deploy-variants.sh all build

set -e

VARIANT=${1:-"all"}
ACTION=${2:-"build"}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

build_variant() {
    local variant=$1
    local port=$2
    local tag_suffix=$3

    log_info "Building ${variant} variant..."

    # Set environment variables for the build
    export GAME_VARIANT=${variant}
    export NEXT_PUBLIC_BASE_PATH="/game-148-${tag_suffix}"

    # Build Docker image
    docker build \
        --build-arg GAME_VARIANT=${variant} \
        --build-arg NEXT_PUBLIC_BASE_PATH="/game-148-${tag_suffix}" \
        -t sedie-multiplayer-${variant}:latest \
        -t sedie-multiplayer-${variant}:$(date +%Y%m%d-%H%M%S) \
        .

    log_success "${variant} variant built successfully"
}

deploy_variant() {
    local variant=$1
    local port=$2
    local tag_suffix=$3

    log_info "Deploying ${variant} variant on port ${port}..."

    # Stop existing container if running
    docker stop sedie-multiplayer-${variant} 2>/dev/null || true
    docker rm sedie-multiplayer-${variant} 2>/dev/null || true

    # Run new container
    docker run -d \
        --name sedie-multiplayer-${variant} \
        -p ${port}:5000 \
        -e GAME_VARIANT=${variant} \
        -e NEXT_PUBLIC_BASE_PATH="/game-148-${tag_suffix}" \
        sedie-multiplayer-${variant}:latest

    log_success "${variant} variant deployed on port ${port}"
}

case ${VARIANT} in
    "desktop"|"d")
        case ${ACTION} in
            "build")
                build_variant "desktop" "5001" "d"
                ;;
            "deploy")
                deploy_variant "desktop" "5001" "d"
                ;;
            "all")
                build_variant "desktop" "5001" "d"
                deploy_variant "desktop" "5001" "d"
                ;;
            *)
                log_error "Invalid action: ${ACTION}"
                echo "Usage: $0 desktop [build|deploy|all]"
                exit 1
                ;;
        esac
        ;;
    "mobile"|"m")
        case ${ACTION} in
            "build")
                build_variant "mobile" "5002" "m"
                ;;
            "deploy")
                deploy_variant "mobile" "5002" "m"
                ;;
            "all")
                build_variant "mobile" "5002" "m"
                deploy_variant "mobile" "5002" "m"
                ;;
            *)
                log_error "Invalid action: ${ACTION}"
                echo "Usage: $0 mobile [build|deploy|all]"
                exit 1
                ;;
        esac
        ;;
    "tablet"|"t")
        case ${ACTION} in
            "build")
                build_variant "tablet" "5003" "t"
                ;;
            "deploy")
                deploy_variant "tablet" "5003" "t"
                ;;
            "all")
                build_variant "tablet" "5003" "t"
                deploy_variant "tablet" "5003" "t"
                ;;
            *)
                log_error "Invalid action: ${ACTION}"
                echo "Usage: $0 tablet [build|deploy|all]"
                exit 1
                ;;
        esac
        ;;
    "all")
        log_info "Building and deploying all variants..."

        # Desktop
        build_variant "desktop" "5001" "d"
        deploy_variant "desktop" "5001" "d"

        # Mobile
        build_variant "mobile" "5002" "m"
        deploy_variant "mobile" "5002" "m"

        # Tablet
        build_variant "tablet" "5003" "t"
        deploy_variant "tablet" "5003" "t"

        log_success "All variants deployed successfully!"
        echo ""
        echo "Access URLs:"
        echo "  Desktop: http://localhost:5001/game-148-d"
        echo "  Mobile:  http://localhost:5002/game-148-m"
        echo "  Tablet:  http://localhost:5003/game-148-t"
        ;;
    *)
        log_error "Invalid variant: ${VARIANT}"
        echo "Usage: $0 [desktop|mobile|tablet|all] [build|deploy|all]"
        echo ""
        echo "Examples:"
        echo "  $0 desktop build    # Build desktop variant"
        echo "  $0 mobile deploy    # Deploy mobile variant"
        echo "  $0 all build        # Build all variants"
        echo "  $0 all all          # Build and deploy all variants"
        exit 1
        ;;
esac
