FROM node:20-alpine AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
    
COPY pnpm-lock.yaml ./ 
COPY package.json ./
    
RUN pnpm install --frozen-lockfile
    
FROM node:20-alpine AS builder
    
WORKDIR /app
    
RUN corepack enable && corepack prepare pnpm@latest --activate
    
COPY --from=deps /app/node_modules ./node_modules
COPY . .
    
RUN pnpm build
    
FROM node:20-alpine AS runner
    
WORKDIR /app
    
ENV NODE_ENV=production
ENV PORT=3000
    
RUN corepack enable && corepack prepare pnpm@latest --activate
    
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./  
    
EXPOSE 3000

CMD ["pnpm", "start"]
    