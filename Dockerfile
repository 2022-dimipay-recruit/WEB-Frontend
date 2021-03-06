FROM node:14.15.1-alpine3.12
ARG BACK_URL

RUN yarn add global serve

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn install

COPY . .

RUN VITE_API_URI=${BACK_URL} \ 
  yarn run build

EXPOSE 3000

ENTRYPOINT ["npx", "serve", "-s", "dist"]