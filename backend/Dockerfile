# Stage 1: Build (install all deps, including dev)
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production (slim image, only production deps)
FROM node:18-slim
WORKDIR /app
COPY --from=build /app .

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV MONGO_URI=mongodb://mongodb:27017/inventory

EXPOSE 3000
CMD ["node", "src/server.js"]