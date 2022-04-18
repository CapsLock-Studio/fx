FROM node:16.14.2-alpine

WORKDIR /app

COPY . .

RUN npm install --global pnpm && \
  pnpm install --prod

EXPOSE 3000

ENTRYPOINT ["pnpm", "start"]