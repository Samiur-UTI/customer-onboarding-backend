# Use Node.js 20 LTS (single stage)
FROM node:20-alpine

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package files and install all dependencies (dev included for build)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all project files from the root directory
COPY config ./config
COPY prisma ./prisma
COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

# Debug: Verify copied files, especially config/
RUN ls -la /app && ls -la /app/config

# Generate Prisma client
RUN yarn prisma generate

# Build the NestJS app
RUN yarn build

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["yarn", "start:prod"]