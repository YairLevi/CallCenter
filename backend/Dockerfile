# ---- Build Stage ----
FROM node:20-alpine AS builder
ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 80
CMD ["node", "dist/main.js"]
