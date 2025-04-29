FROM node:22-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:22-alpine AS production-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci --omit=dev

FROM node:22-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:22-alpine
#COPY ./package.json package-lock.json /app/dist/
#COPY ./packages/server/package.json /app/dist/packages/server/
#COPY ./packages/client/package.json /app/dist/packages/client/client/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/dist /app/dist
WORKDIR /app
#CMD ["npm", "run", "start:prod"]
CMD ["node", "dist/packages/server/main.js"]
