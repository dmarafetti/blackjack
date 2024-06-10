/**
 * Creates a mock service on each test to bypass the http service implementation
 * Execute JavaScript on the page and set a new service instanceto Blackjack controller.
 *
 * TODO: Since objects cannot be passed as parameters to 'evaluate' I must declare the mock object inline
 */
beforeEach(async () => {

    //
    await page.evaluate(() => {

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


            },

            hit: async () => {

            },

            stand: async () => {


            },

            restart: async () => {


            }

        }

        if(window.blackjack) {

            window.blackjack.setGamingService(mockService);
        }

    });

});
