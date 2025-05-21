FROM node:18-alpine

# Create app directory and set ownership
WORKDIR /app
RUN chown -R node:node /app

# Switch to non-root user
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

# Copy source with correct ownership
COPY --chown=node:node . .

# Ensure proper cache directory permissions and clean caches
RUN mkdir -p .next/cache
RUN chown -R node:node .next/cache
RUN npm cache clean --force
RUN rm -rf .next/cache

# Build the application
RUN npm run build

CMD ["npm", "start"]