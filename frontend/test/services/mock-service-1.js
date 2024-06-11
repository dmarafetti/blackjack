const mockService = {

    startGame: async (params) => {

        return {
            "uuid": "dummy-game",
            "running": false,
            "finished": false,
            "deckSize": 52,
            "dealer": {
                "name": "Dealer",
                "cards": [],
                "score": 0
            },
            "player": {
                "name": params.name,
                "cards": [],
                "score": 0
            },
            "status": "Are you ready?",
            "dealerMove": false
        }
    },

    beginGame: async () => {

        return {
            "uuid": "dummy-game",
            "running": true,
            "finished": false,
            "deckSize": 48,
            "dealer": {
                "name": "Dealer",
                "cards": [
                    {
                        "suit": "hearts",
                        "name": "5",
                        "value": 5,
                        "facedDown": false
                    },
                    {
                        "suit": "hearts",
                        "name": "2",
                        "value": 2,
                        "facedDown": true
                    }
                ],
                "score": 7
            },
            "player": {
                "name": "Gambler",
                "cards": [
                    {
                        "suit": "clubs",
                        "name": "4",
                        "value": 4,
                        "facedDown": false
                    },
                    {
                        "suit": "hearts",
                        "name": "10",
                        "value": 10,
                        "facedDown": false
                    }
                ],
                "score": 14
            },
            "status": "Hit or Stand? your move",
            "dealerMove": false
        }

    },

    hit: async () => {

        return {
            "uuid": "90b17163-fc17-4c86-84de-7da6eec93f58",
            "running": false,
            "finished": true,
            "deckSize": 46,
            "dealer": {
                "name": "Dealer",
                "cards": [
                    {
                        "suit": "hearts",
                        "name": "5",
                        "value": 5,
                        "facedDown": false
                    },
                    {
                        "suit": "hearts",
                        "name": "2",
                        "value": 2,
                        "facedDown": false
                    },
                    {
                        "suit": "diamonds",
                        "name": "j",
                        "value": 10,
                        "facedDown": false
                    }
                ],
                "score": 17
            },
            "player": {
                "name": "diego",
                "cards": [
                    {
                        "suit": "clubs",
                        "name": "4",
                        "value": 4,
                        "facedDown": false
                    },
                    {
                        "suit": "hearts",
                        "name": "10",
                        "value": 10,
                        "facedDown": false
                    },
                    {
                        "suit": "hearts",
                        "name": "7",
                        "value": 7,
                        "facedDown": false
                    }
                ],
                "score": 21
            },
            "status": "Congratulations! you win 21 Blackjack",
            "dealerMove": true
        }
    },

    stand: async () => {


    },

    restart: async () => {


    }

}

export default mockService;
