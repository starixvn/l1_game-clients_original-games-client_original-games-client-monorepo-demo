# Advanced multi-stage optimized Dockerfile for Sedie game
# This version includes additional optimizations for production use

FROM hub.lumigame.com/base/node:24-alpine-25h2 AS base

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Dependencies stage with better caching
FROM base AS deps
WORKDIR /app

# Set up yarn cache and configuration
ENV YARN_CACHE_FOLDER=/root/.yarn
ENV YARN_ENABLE_IMMUTABLE_INSTALLS=false
ENV YARN_ENABLE_NETWORK_TIMEOUT=300000

# Copy only package files for dependency installation
COPY package.json yarn.lock ./
COPY packages/shared/package.json packages/shared/package.json
COPY packages/sedie/package.json packages/sedie/package.json

# Install dependencies with optimizations
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
    yarn install --frozen-lockfile --production=false --prefer-offline --network-timeout 300000

# Builder stage with optimized copying
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock

# Copy configuration files in order of change frequency (least to most frequent)
COPY tsconfig.json ./

# Copy sedie package configs
COPY packages/sedie/package.json packages/sedie/package.json
COPY packages/sedie/next.config.js packages/sedie/next.config.js
COPY packages/sedie/tsconfig.json packages/sedie/tsconfig.json
COPY packages/sedie/tailwind.config.js packages/sedie/tailwind.config.js
COPY packages/sedie/postcss.config.js packages/sedie/postcss.config.js
COPY packages/sedie/sentry.client.config.js packages/sedie/sentry.client.config.js
COPY packages/sedie/sentry.edge.config.js packages/sedie/sentry.edge.config.js
COPY packages/sedie/sentry.server.config.js packages/sedie/sentry.server.config.js
COPY packages/sedie/configs.json packages/sedie/configs.json
COPY packages/sedie/game-settings.json packages/sedie/game-settings.json

# Copy shared package (changes less frequently than app source)
COPY packages/shared packages/shared

# Copy source code (changes most frequently)
COPY packages/sedie/src packages/sedie/src
COPY packages/sedie/public packages/sedie/public
COPY packages/sedie/configs packages/sedie/configs

# Set build environment
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
WORKDIR /app/packages/sedie

# Build with optimizations
RUN yarn obfuscator-config-file && \
    yarn build:standalone

# Production dependencies stage (only production deps)
FROM base AS prod-deps
WORKDIR /app

ENV YARN_CACHE_FOLDER=/root/.yarn
ENV YARN_ENABLE_IMMUTABLE_INSTALLS=false

COPY package.json yarn.lock ./
COPY packages/shared/package.json packages/shared/package.json
COPY packages/sedie/package.json packages/sedie/package.json

RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
    yarn install --frozen-lockfile --production=true --prefer-offline

# Final production image
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/packages/sedie/.next/standalone ./
COPY --from=builder /app/packages/sedie/.next/static ./.next/static
COPY --from=builder /app/packages/sedie/public ./public

# Copy only essential config files
COPY --from=builder /app/packages/sedie/package.json ./package.json
COPY --from=builder /app/packages/sedie/next.config.js ./next.config.js
COPY --from=builder /app/packages/sedie/game-settings.json ./game-settings.json
COPY --from=builder /app/packages/sedie/configs.json ./configs.json

# Set proper ownership and permissions
RUN chown -R nextjs:nodejs /app && \
    chmod -R 755 /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 5000

# Health check with better error handling
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))" || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
