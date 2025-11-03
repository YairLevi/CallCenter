# build project

FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# serve files

FROM node:alpine

COPY --from=builder /app/dist ./dist

EXPOSE 80

CMD ["npx", "serve", "-l", "80", "-s", "dist"]
