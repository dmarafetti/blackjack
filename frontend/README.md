# ♣ Blackjack - Frontend v1.0.0

This is a vanilla JavaScript application built with Vite. This README will guide you through setting up, running the application, running unit tests, and running end-to-end (E2E) tests with Puppeteer.

## Setup standalone frontend instance with Docker

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


# Running the application locally

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

```sh 
$ npm install
```

##  Development
Run webserver on local instance.


```sh 
$ npm run dev 
```


## Running Unit Tests

To run unit tests, we are using testing-library with Jest. Use the following command to run unit tests:

``` ssh
# npm run test:unit 
```


## Running End-to-End (E2E) Tests with Puppeteer

> Make sure the docker container or the app is running. If not, executes run it. Afterward, run the test command with npm. 

In another terminal window, run the E2E tests using the following command:

``` ssh
# npm run test:e2e 
```
