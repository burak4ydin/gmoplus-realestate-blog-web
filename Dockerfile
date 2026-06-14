FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG NEXT_PUBLIC_BLOG_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_BLOG_API_URL=$NEXT_PUBLIC_BLOG_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN mkdir -p public && npm run build

FROM node:20-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
RUN chown -R appuser:appgroup /app
USER appuser
ENV PORT=3016
EXPOSE 3016
CMD ["node", "server.js"]