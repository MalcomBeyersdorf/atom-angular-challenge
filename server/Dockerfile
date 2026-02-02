FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx tsc

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY atom-angular-challenge-firebase-adminsdk.json ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
