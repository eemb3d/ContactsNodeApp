FROM node:22-alpine@sha256:ed9736a13b88ba55cbc08c75c9edac8ae7f72840482e40324670b299336680c1

WORKDIR /app
COPY . .
RUN npm ci --silent && npm run build

CMD ["npm", "run", "start:dev"]