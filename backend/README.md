# ♣ Blackjack - Backend v1.0.0

## Setup standalone backend instance

### Build docker image

```sh 
$ docker build -t blackjack-be .
```

### Configure the env file

It must be specified the Node.js server port: 

```
NODE_LOCAL_PORT=3001
```

### Run container

```sh 
$ docker run -d -it -p 3001:3001  --name=blackjack-service  --env-file ./.env  blackjack-be
```


# Running the application locally

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js (version 18 or higher)
- npm (Node Package Manager)
- 
## Installation

```sh 
$ npm install
```

##  Development
Run node on local instance.


```sh 
$ npm run dev 
```


## Run unit tests

Make sure the docker container is running. If not, executes run it. Afterward, run the test command with npm. 

``` ssh
# npm run test 
```
