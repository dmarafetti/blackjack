# syntax=docker/dockerfile:1

FROM node:21.7.3-alpine3.20

LABEL mantainer="Diego Marafetti"
LABEL description="Blackjack game"

# prepare working folder
WORKDIR /home
RUN mkdir frontend
COPY src ./frontend/
COPY package.json ./frontend

# build project
WORKDIR frontend
RUN npm install --silent

# run at start
ENTRYPOINT ["npm"]
CMD ["run", "dev"]
