# 1. install dependencies only when needed 
FROM node:16.13-alpine AS deps
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# 2. build the source code only when needed
FROM node:16.13-alpine AS builder
WORKDIR /app

# build args
ARG WEBUPJS_APP_CONTEXT=/webup.js
ARG WEBUPJS_IS_LOCAL=false
ARG WEBUPJS_HTTPS_REJECT_UNAUTHORIZED=false
ARG WEBUPJS_PING_SECONDS_INTERVAL=60
ARG WEBUPJS_AXIOS_REQUEST_TIMEOUT=60

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. production image, create nextjs user and run
FROM node:16.13-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ARG WEBUPJS_HTTPS_REJECT_UNAUTHORIZED=false
ARG WEBUPJS_PING_SECONDS_INTERVAL=60
ARG WEBUPJS_AXIOS_REQUEST_TIMEOUT=60

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]