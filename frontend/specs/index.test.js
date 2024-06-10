require('./mocks');

jest.setTimeout(60000);

describe('Basic game playing', () => {

    /**
     * Go to page. Env variables are mandatory
     */
    beforeAll(async () => {

        await page.setViewport({width: 1366, height: 768, deviceScaleFactor: 1});
        const { VITE_DEV_SERVER_HOST, VITE_DEV_SERVER_PORT } = process.env;
        await page.goto(`${VITE_DEV_SERVER_HOST}:${VITE_DEV_SERVER_PORT}`);
    });


    it('Should see the play now button disabled with no name', async () => {

        await expect(page.title()).resolves.toMatch('Blackjack Game');
        await page.waitForSelector('#player_name_input');
        // Check if the button has the disabled attribute
        const isDisabled = await page.$eval('#start', button => button.hasAttribute('disabled'));
        expect(isDisabled).toBe(true);

    })


    it('Should see the play now button and being redirected to a new game', async () => {

        await expect(page.title()).resolves.toMatch('Blackjack Game');
        await page.waitForSelector('#player_name_input');
        await page.type('#player_name_input', 'Gambler');
        await page.waitForSelector( "#start" );
        await expect(page).toClick("#start", { text: "Play Now" });
        await expect(page).toMatchTextContent("Are you ready?");
        await expect(page).toMatchTextContent("Dealer");
        await expect(page).toMatchTextContent("Gambler");

    });
});
