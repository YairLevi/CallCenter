# build project

FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_ENV=production

# vite auto loads .env.production
ARG FRONT_PROD_ENV
RUN echo "$FRONT_PROD_ENV" > .env.production

RUN npm run build

# serve files

FROM node:alpine

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["npx", "serve", "-l", "80", "-s", "dist"]
