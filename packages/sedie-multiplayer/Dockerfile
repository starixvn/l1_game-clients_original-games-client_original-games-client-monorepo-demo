FROM hub.lumigame.com/base/node:24-alpine-25h2 AS base

FROM base AS deps
WORKDIR /app

ENV YARN_CACHE_FOLDER=/root/.yarn

RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
     yarn cache dir && yarn cache list

# Copy only the necessary package files for sedie-multiplayer
COPY package.json yarn.lock ./
COPY packages/shared/package.json packages/shared/package.json
COPY packages/sedie-multiplayer/package.json packages/sedie-multiplayer/package.json
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
     yarn install --frozen-lockfile --verbose

FROM base AS builder
WORKDIR /app

# Copy the installed dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock

# Copy root tsconfig files that sedie-multiplayer extends
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.node.json ./tsconfig.node.json

# Copy only sedie-multiplayer-specific files
COPY packages/sedie-multiplayer/package.json packages/sedie-multiplayer/package.json
COPY packages/sedie-multiplayer/next.config.js packages/sedie-multiplayer/next.config.js
COPY packages/sedie-multiplayer/tsconfig.json packages/sedie-multiplayer/tsconfig.json
COPY packages/sedie-multiplayer/tailwind.config.js packages/sedie-multiplayer/tailwind.config.js
COPY packages/sedie-multiplayer/postcss.config.js packages/sedie-multiplayer/postcss.config.js
COPY packages/sedie-multiplayer/sentry.client.config.js packages/sedie-multiplayer/sentry.client.config.js
COPY packages/sedie-multiplayer/sentry.edge.config.js packages/sedie-multiplayer/sentry.edge.config.js
COPY packages/sedie-multiplayer/sentry.server.config.js packages/sedie-multiplayer/sentry.server.config.js
COPY packages/sedie-multiplayer/configs.json packages/sedie-multiplayer/configs.json
COPY packages/sedie-multiplayer/game-settings.json packages/sedie-multiplayer/game-settings.json

# Copy source code
COPY packages/sedie-multiplayer/src packages/sedie-multiplayer/src
COPY packages/sedie-multiplayer/public packages/sedie-multiplayer/public
COPY packages/sedie-multiplayer/configs packages/sedie-multiplayer/configs

# Copy shared package
COPY packages/shared packages/shared

# Copy standalone assets script (needed for standalone builds)
COPY scripts/copy-standalone-assets.js scripts/copy-standalone-assets.js

# Build sedie-multiplayer app
WORKDIR /app/packages/sedie-multiplayer

# Allow configuring Next.js basePath/assetPrefix at build time
ARG NEXT_PUBLIC_BASE_PATH=/game-148
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

# Ensure we're in the right directory and have all dependencies
RUN pwd && ls -la && \
    echo "Node version: $(node --version)" && \
    echo "Yarn version: $(yarn --version)" && \
    yarn obfuscator-config-file

# Build with detailed logging and standalone output verification
RUN echo "Starting Next.js standalone build from $(pwd)..." && \
    echo "Next.js version: $(yarn next --version 2>/dev/null || echo 'unknown')" && \
    yarn build:standalone 2>&1; \
    BUILD_EXIT_CODE=$?; \
    echo "Build exit code: $BUILD_EXIT_CODE"; \
    if [ "$BUILD_EXIT_CODE" -ne 0 ]; then \
        echo "Build failed with exit code $BUILD_EXIT_CODE!"; \
        echo "Checking if any .next directory was created:"; \
        ls -la .next/ 2>/dev/null || echo "No .next directory found"; \
        exit "$BUILD_EXIT_CODE"; \
    fi && \
    echo "Build completed. Checking if standalone was actually created:" && \
    if [ ! -d ".next/standalone" ]; then \
        echo "WARNING: .next/standalone directory not found after build!" && \
        echo "This suggests the build did not create standalone output as expected." && \
        echo "Checking next.config.js output setting..." && \
        grep -n "output.*standalone" next.config.js || echo "output: standalone not found in config"; \
    else \
        echo "Standalone directory found. Checking for server files:" && \
        find .next/standalone -maxdepth 2 -name "*.js" -type f 2>/dev/null | head -5; \
    fi

# Copy standalone assets (required for standalone builds to work)
RUN echo "Copying standalone assets..." && \
    if [ -f "/app/scripts/copy-standalone-assets.js" ]; then \
        echo "Found copy-standalone-assets script, running it..." && \
        node /app/scripts/copy-standalone-assets.js 2>&1 || echo "Asset copy failed"; \
    else \
        echo "copy-standalone-assets.js not found, using manual asset copy:" && \
        if [ -d ".next/static" ] && [ -d ".next/standalone" ]; then \
            echo "Copying .next/static to .next/standalone/.next/static..." && \
            mkdir -p .next/standalone/.next && \
            cp -r .next/static .next/standalone/.next/ 2>/dev/null || echo "Static copy failed"; \
        fi && \
        if [ -d "public" ] && [ -d ".next/standalone" ]; then \
            echo "Copying public to .next/standalone/public..." && \
            cp -r public .next/standalone/ 2>/dev/null || echo "Public copy failed"; \
        fi; \
    fi

# Verify build output
RUN echo "Build completed successfully. Current directory: $(pwd)" && \
    echo "Checking .next directory structure:" && \
    ls -la .next/ 2>/dev/null || echo ".next directory not found!" && \
    if [ -d ".next/standalone" ]; then \
        echo "Standalone directory found:" && \
        ls -la .next/standalone/ && \
        echo "Contents of server.js (first 20 lines):" && \
        head -20 .next/standalone/server.js 2>/dev/null || echo "Cannot read server.js"; \
    else \
        echo "Standalone directory NOT found! Listing all .next contents:" && \
        find .next -type f 2>/dev/null | head -20 || echo "No .next directory found"; \
        echo "Checking for alternative server files:" && \
        find .next -name "*server*" -type f 2>/dev/null || echo "No server files found"; \
    fi

FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

# Optionally expose base path at runtime for any custom logic
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

RUN addgroup --system --gid 1001 nodejs  \
     && adduser --system --uid 1001 nextjs

# Copy the built app and required assets
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie-multiplayer/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie-multiplayer/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie-multiplayer/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie-multiplayer/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie-multiplayer/game-settings.json ./game-settings.json
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie-multiplayer/configs.json ./configs.json

# Ensure proper permissions for the .next directory and verify standalone structure
RUN echo "Runner stage - checking copied files:" && \
    ls -la /app/ && \
    if [ -d ".next" ]; then \
        echo ".next directory found in runner:" && \
        ls -la .next/ && \
        if [ -d ".next/standalone" ]; then \
            echo "Standalone directory exists in runner:" && \
            ls -la .next/standalone/ && \
            if [ -f ".next/standalone/server.js" ]; then \
                echo "server.js found! First few lines:" && \
                head -10 .next/standalone/server.js; \
            else \
                echo "server.js NOT found in standalone directory"; \
            fi; \
        else \
            echo "Standalone directory NOT found in runner. Available directories:" && \
            find .next -type d 2>/dev/null || echo "No directories in .next"; \
        fi; \
    else \
        echo ".next directory NOT found in runner!"; \
        echo "Available files in /app:" && \
        ls -la; \
    fi && \
    chown -R nextjs:nodejs .next 2>/dev/null || echo "Failed to set permissions on .next"

USER nextjs

EXPOSE 5000
ENV PORT=5000
ENV HOSTNAME=0.0.0.0

CMD ["sh", "-c", "cd /app && \
    echo 'Starting server... Checking standalone directory contents:' && \
    if [ -d '.next/standalone' ]; then \
        echo 'Standalone directory exists. Contents:' && \
        ls -la .next/standalone/ && \
        echo 'Looking for server files in standalone directory:' && \
        find .next/standalone -name '*.js' -type f 2>/dev/null | head -10 && \
        echo 'Checking for server.js specifically:' && \
        if [ -f '.next/standalone/server.js' ]; then \
            echo 'Found server.js! Starting...' && \
            NEXT_PUBLIC_DEFAULT_GAME_ID=148 PORT=5000 node .next/standalone/server.js; \
        elif [ -f '.next/standalone/index.js' ]; then \
            echo 'Found index.js instead of server.js, trying that...' && \
            NEXT_PUBLIC_DEFAULT_GAME_ID=148 PORT=5000 node .next/standalone/index.js; \
        else \
            echo 'No server.js or index.js found in standalone. Checking for any main JS files:' && \
            find .next/standalone -name '*.js' -type f -exec grep -l 'createServer\|listen' {} \; 2>/dev/null | head -5 && \
            SERVER_FILE=$(find .next/standalone -name '*.js' -type f -exec grep -l 'createServer\|listen' {} \; 2>/dev/null | head -1) && \
            if [ -n \"$SERVER_FILE\" ]; then \
                echo \"Found server file: $SERVER_FILE, starting...\" && \
                NEXT_PUBLIC_DEFAULT_GAME_ID=148 PORT=5000 node \"$SERVER_FILE\"; \
            else \
                echo 'No suitable server file found with server code' && \
                exit 1; \
            fi; \
        fi; \
    else \
        echo 'Standalone directory not found! Checking .next directory:' && \
        ls -la .next/ 2>/dev/null || echo 'No .next directory found' && \
        echo 'Cannot start server - missing standalone build output' && \
        exit 1; \
    fi"]