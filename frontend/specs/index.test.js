jest.setTimeout(60000);

describe('Basic game playing', () => {

    /**
     * Go to page. Env variables are mandatory
     */
    beforeAll(async () => {

        await page.setViewport({width: 1366, height: 768, deviceScaleFactor: 1});
        const {VITE_DEV_SERVER_HOST, VITE_DEV_SERVER_PORT} = process.env;
        await page.goto(`${VITE_DEV_SERVER_HOST}:${VITE_DEV_SERVER_PORT}`);
    });

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

            if (window.blackjack) {

                window.blackjack.setGamingService(mockService);
            }

        });

    });


    it('Should see the play now button disabled with no name', async () => {

        await expect(page.title()).resolves.toMatch('Blackjack Game');
        await page.waitForSelector('#player_name_input');
        // Check if the button has the disabled attribute
        const isDisabled = await page.$eval('#start', button => button.hasAttribute('disabled'));
        expect(isDisabled).toBe(true);

    })


    it('Should see the play now button and being redirected to a new game', async () => {

        await page.type('#player_name_input', 'Gambler');
        await page.waitForSelector("#start");
        await expect(page).toClick("#start", {text: "Play Now"});
        await expect(page).toMatchTextContent("Are you ready?");
        await expect(page).toMatchTextContent("Dealer");
        await expect(page).toMatchTextContent("Gambler");

    });

    it('Should start a new game and press deal cards', async () => {

        await expect(page).toClick("#new_game", {text: "Deal"});
        await page.waitForSelector("#hit");
        await page.waitForSelector("#stand");
        await expect(page).toMatchTextContent("48"); // deck
        await expect(page).toMatchTextContent("14"); // player score

    });

    it('Should start a new game and press deal cards', async () => {

        await expect(page).toClick("#hit", {text: "Hit"});
        await expect(page).toMatchTextContent("21"); // player score
        await expect(page).toMatchTextContent("Congratulations! you win 21 Blackjack"); // deck

    });


});
