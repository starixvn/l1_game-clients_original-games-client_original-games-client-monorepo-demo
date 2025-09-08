# Multi-stage optimized Dockerfile for Sedie game
FROM hub.lumigame.com/base/node:24-alpine-25h2 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Set up yarn cache
ENV YARN_CACHE_FOLDER=/root/.yarn
ENV YARN_ENABLE_IMMUTABLE_INSTALLS=false

# Copy package files first for better layer caching
COPY package.json yarn.lock ./
COPY packages/shared/package.json packages/shared/package.json
COPY packages/sedie/package.json packages/sedie/package.json

# Install dependencies with cache mount
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
    yarn install --frozen-lockfile --production=false --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock

# Copy configuration files (these change less frequently)
COPY tsconfig.json ./
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

# Copy source code (this changes most frequently)
COPY packages/sedie/src packages/sedie/src
COPY packages/sedie/public packages/sedie/public
COPY packages/sedie/configs packages/sedie/configs

# Copy shared package
COPY packages/shared packages/shared

# Set build arguments and environment variables
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
WORKDIR /app/packages/sedie

# Obfuscate configs and build with optimizations
RUN yarn obfuscator-config-file && \
    yarn build:standalone

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=5000
ENV HOSTNAME=0.0.0.0

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/packages/sedie/.next/standalone ./
COPY --from=builder /app/packages/sedie/.next/static ./.next/static
COPY --from=builder /app/packages/sedie/public ./public

# Copy only necessary config files
COPY --from=builder /app/packages/sedie/package.json ./package.json
COPY --from=builder /app/packages/sedie/next.config.js ./next.config.js
COPY --from=builder /app/packages/sedie/game-settings.json ./game-settings.json
COPY --from=builder /app/packages/sedie/configs.json ./configs.json

# Set proper ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["node", "server.js"]
