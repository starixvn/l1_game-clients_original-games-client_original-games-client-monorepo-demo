FROM hub.lumigame.com/base/node:24-alpine-25h2 AS base

FROM base AS deps
WORKDIR /app

ENV YARN_CACHE_FOLDER=/root/.yarn

RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
     yarn cache dir && yarn cache list

# Install monorepo dependencies (workspaces)
COPY package.json yarn.lock ./
COPY packages/shared/package.json packages/shared/package.json
COPY packages/sedie/package.json packages/sedie/package.json
RUN --mount=type=cache,target=$YARN_CACHE_FOLDER \
     yarn install --frozen-lockfile --verbose

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/yarn.lock ./yarn.lock

# Copy root tsconfig.json that sedie extends
COPY tsconfig.json ./tsconfig.json

# Copy sedie-specific files
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

# Copy source code
COPY packages/sedie/src packages/sedie/src
COPY packages/sedie/public packages/sedie/public
COPY packages/sedie/configs packages/sedie/configs

# Copy shared package
COPY packages/shared packages/shared

# Copy scripts directory for copy-standalone-assets
COPY scripts scripts

# Build sedie app using the same pattern as original
WORKDIR /app/packages/sedie

# Allow configuring Next.js basePath/assetPrefix at build time
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

# Obfuscate deployment configs and build (same as original)
RUN yarn obfuscator-config-file
RUN npx next build

# Go back to root and run copy-standalone-assets
WORKDIR /app
RUN yarn copy-standalone-assets

FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

# Optionally expose base path at runtime for any custom logic
ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH

RUN addgroup --system --gid 1001 nodejs  \
     && adduser --system --uid 1001 nextjs

# Copy the built app files directly (since standalone is not working)
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/server.js ./server.js
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/game-settings.json ./game-settings.json
COPY --from=builder --chown=nextjs:nodejs /app/packages/sedie/configs.json ./configs.json

USER nextjs

EXPOSE 5000
ENV PORT=5000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]