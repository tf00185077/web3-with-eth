# build
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN npx prisma generate

COPY . .

RUN pnpm build

# run
FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
EXPOSE 3001
RUN npm install -g pnpm

CMD ["pnpm", "start"]