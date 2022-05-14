# syntax=docker/dockerfile:1.2

# 1. Dependencies Install 단계
FROM node:16-alpine AS deps
WORKDIR /app
RUN ["apk", "add", "--no-cache", "libc6-compat"]

COPY package.json yarn.lock ./
RUN --mount=type=cache,id=yarn,sharing=locked,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile


# 2. Build 단계
FROM node:16-alpine AS builder
WORKDIR /app

ARG BUILD_ID=none

ENV NEXT_PUBLIC_BUILD_ID=${BUILD_ID}

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN ["yarn", "build"]


# 3. Run 단계
FROM node:16-alpine AS runner
WORKDIR /app

RUN ["apk", "add", "--no-cache", "curl"]
RUN ["addgroup", "-g", "1001", "-S", "appgroup"]
RUN ["adduser", "-u", "1001", "-S", "appuser"]
RUN ["mkdir", "-p", "/app/build/cache/images", "&&", "chown", "appuser:appgroup", "/app/build/cache/images"]

ENV NODE_ENV=production

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER appuser

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]