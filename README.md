# Gaming Platform Monorepo

A monorepo structure for deploying individual games as microsites while maximizing code reuse.

## 🏗️ Architecture

```
gaming-platform/
├── packages/
│   ├── shared/           # Merged shared-core and shared-ui (temporary)
│   └── sedie/            # game-sedie package (to be isolated)
├── apps/
│   └── web/              # Next.js host (this repo)
└── deployment-configs/   # Microsite deployment configs
```

## 🚀 Quick Start

### Prerequisites

-   Node.js 20+
-   npm or yarn
-   Docker (for deployment)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd gaming-platform-monorepo
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Build shared packages**

    ```bash
    npm run build:shared
    ```

4. **Start development servers**

    ```bash
    # Start SeDie game
    npm run dev:sedie

    # Start new game (when created)
    npm run dev:newgame
    ```

## 📦 Package Structure

### Shared (merged) (`packages/shared/`)

Contains the game engine and base classes:

-   Game base classes and handlers
-   React contexts and hooks
-   Utilities and helpers
-   State management (Zustand stores)
-   WebSocket handling
-   Internationalization

Contains reusable UI components:

-   Game components (buttons, modals, etc.)
-   Page components (headers, layouts)
-   Loading and error states
-   Scoreboards and statistics
-   Provably fair components

### Game Packages (`packages/*`)

Individual game implementations:

-   Game-specific components
-   Bet choice layouts
-   Scoreboard implementations
-   Game-specific animations
-   Result displays

## 🎮 Available Games

### SeDie Multiplayer (`game-sedie/`)

-   **Game ID**: 148
-   **URL**: `sedie.yourdomain.com`
-   **Features**: Dice-based betting game with multiplayer support

### New Game (`game-newgame/`)

-   **Status**: Template ready for new game implementation
-   **Features**: Extensible template using shared components

## 🛠️ Development

### Adding a New Game

1. **Create game package**

    ```bash
    mkdir game-newgame
    cd game-newgame
    npm init
    ```

2. **Copy template structure**

    ```bash
    cp -r game-sedie/* game-newgame/
    ```

3. **Update package.json**

    - Change package name
    - Update game-specific dependencies
    - Modify build scripts

4. **Implement game-specific logic**
    - Create bet choice layouts
    - Implement scoreboard
    - Add game-specific animations
    - Configure game constants

### Shared Code Development

1. **Modify shared packages**

    ```bash
    cd shared-core
    # or
    cd shared-ui
    ```

2. **Build and test**

    ```bash
    npm run build
    npm run test
    ```

3. **Test in games**
    ```bash
    npm run dev:sedie
    npm run dev:newgame
    ```

## 🚀 Deployment

### Docker Deployment

1. **Build game image**

    ```bash
    cd game-sedie
    docker build -t sedie-game:latest .
    ```

2. **Deploy to Kubernetes**
    ```bash
    kubectl apply -f deployment-configs/sedie-deployment.yaml
    ```

### Environment Variables

Each game package supports the following environment variables:

```bash
# Required
NEXT_PUBLIC_TOLGEE_API_KEY=your_api_key
NEXT_PUBLIC_TOLGEE_API_URL=https://app.tolgee.io

# Game-specific
GAME_ID=148
GAME_NAME="SeDie Multiplayer"
NODE_ENV=production
```

### Deployment Strategies

1. **Independent Microsites**

    - Each game on separate subdomain
    - Example: `sedie.yourdomain.com`, `newgame.yourdomain.com`
    - Independent scaling and monitoring

2. **Subdirectory Deployment**

    - Games on subdirectories
    - Example: `yourdomain.com/sedie`, `yourdomain.com/newgame`
    - Shared CDN and infrastructure

3. **Edge Deployment**
    - Deploy to Vercel, Netlify, or Cloudflare
    - Global performance optimization
    - Automatic scaling

## 📊 Code Reuse Strategy

### Shared Components (90% reuse)

-   ✅ Game base classes
-   ✅ UI components (buttons, modals, etc.)
-   ✅ Hooks and contexts
-   ✅ Utilities and helpers
-   ✅ Sound management
-   ✅ WebSocket handling
-   ✅ Internationalization

### Game-Specific Components (10% unique)

-   🎯 Bet choice layouts
-   🎯 Game-specific animations
-   🎯 Result displays
-   🎯 Scoreboard implementations
-   🎯 Game-specific constants

## 🧪 Testing

### Run All Tests

```bash
npm run test:all
```

### Test Specific Package

```bash
cd shared-core && npm test
cd shared-ui && npm test
cd game-sedie && npm test
```

### Test Coverage

```bash
npm run test:coverage
```

## 📈 Monitoring

### Performance Monitoring

-   Bundle size analysis
-   Load time monitoring
-   Error tracking per microsite

### Health Checks

-   `/health` endpoint for each game
-   Kubernetes liveness and readiness probes
-   Automated monitoring and alerting

## 🔧 Configuration

### Game Configuration

Each game can be configured independently:

```javascript
// game-sedie/next.config.js
module.exports = {
    basePath: process.env.NODE_ENV === "production" ? "/sedie" : "",
    assetPrefix: process.env.NODE_ENV === "production" ? "/sedie" : "",
    env: {
        GAME_ID: "148",
        GAME_NAME: "SeDie Multiplayer",
    },
};
```

### Shared Package Configuration

```javascript
// shared-core/tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true
  }
}
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**
    ```bash
    git checkout -b feature/new-game
    ```
3. **Make changes**
4. **Test thoroughly**
    ```bash
    npm run test:all
    npm run build:all
    ```
5. **Submit pull request**

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

-   Create an issue in the repository
-   Contact the development team
-   Check the documentation in each package

## 🔄 Migration from Legacy

If migrating from the legacy single-repo structure:

1. **Run migration script**

    ```bash
    npm run migrate
    ```

2. **Update import paths**

    ```bash
    # The migration script handles most updates automatically
    # Manual updates may be needed for complex imports
    ```

3. **Test thoroughly**

    ```bash
    npm run test:all
    npm run build:all
    ```

4. **Deploy incrementally**
    - Deploy shared packages first
    - Deploy games one by one
    - Monitor for issues

## 📚 Additional Resources

-   [Deployment Guide](deployment-guide.md)
-   [Migration Script](migration-script.js)
-   [API Documentation](docs/api.md)
-   [Component Library](docs/components.md)
