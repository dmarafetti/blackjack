# Blackjack 21 - Frontend

## Setup standalone frontend instance

### Build docker image

```sh 
$ docker build -t blackjack-fe .
```

### Configure the env file

It must be specified the Vite server port/host: 

```
VITE_DEV_SERVER_HOST=http://localhost
VITE_DEV_SERVER_PORT=8001
```
 
And also configure the Blackjack's backend:

```
VITE_BACKEND_HOST=http://0.0.0.0
VITE_BACKEND_PORT=3001
```



### Run container

```sh 
$ docker run -d -it -p 8001:8001  --name=blackjack-game  --env-file ./.env  blackjack-fe
```


## Installation

```sh 
$ npm install
```

##  Development
Run webserver on local instance.


```sh 
$ npm run dev 
```


## Run unit tests

``` ssh
# npm run test:unit 
```



## Run e2e tests

> Make sure the docker container is running. If not, executes run it. Afterward, run the test command with npm. 

``` ssh
# npm run test:e2e 
```
