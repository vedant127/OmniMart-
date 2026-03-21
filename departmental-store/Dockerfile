FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--experimental-modules"

EXPOSE 9000

CMD ["node", "src/index.js"]
