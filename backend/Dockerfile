# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS production
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["node", "dist/main"]
