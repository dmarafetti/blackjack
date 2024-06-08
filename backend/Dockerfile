# syntax=docker/dockerfile:1

FROM node:21.7.3-alpine3.20

LABEL mantainer="Diego Marafetti"
LABEL description="Blackjack game"

# prepare working folder
RUN mkdir /home/backend

WORKDIR /home/backend

COPY package*.json ./

RUN npm install --silent

COPY . .

# run at start
ENTRYPOINT ["node"]
CMD ["index.js"]
