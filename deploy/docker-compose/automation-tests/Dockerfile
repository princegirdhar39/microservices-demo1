# automation-tests/Dockerfile

FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "test"]
