# syntax=docker/dockerfile:1

FROM node:21.7.3-alpine3.20

LABEL mantainer="Diego Marafetti"
LABEL description="Blackjack game"

RUN mkdir /home/frontend

WORKDIR /home/frontend

COPY package*.json ./

RUN npm install --silent

COPY . .

# run at start
ENTRYPOINT ["npm"]
CMD ["run", "dev"]
