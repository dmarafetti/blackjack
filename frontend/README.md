## Setup standalone frontend instance

### Build docker image

```sh 
$ docker build -t blackjack:1.0.0 .
```


### Run container

```sh 
$ docker run \
      -d \
      -it \
      -p 8001:8001 \
      --name=blackjack-game \
      --env-file ./.env \
      blackjack:1.0.0
```
