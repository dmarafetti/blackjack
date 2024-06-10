jest.setTimeout(60000)

describe('Basic game playing', () => {

    beforeAll(async () => {

        await page.setViewport({width: 1366, height: 768, deviceScaleFactor: 1});
        await page.goto('http://localhost:8001');
        //
    });


    it('Should see the play now button and being redirected to a new game', async () => {

        await expect(page.title()).resolves.toMatch('Blackjack Game');
        await page.waitForSelector('#player_name_input');
        await page.type('#player_name_input', 'Gambler');
        await jestPuppeteer.debug();
        await page.waitForSelector( "#start" );
        await expect(page).toClick("#start", { text: "Play Now" });
        await jestPuppeteer.debug();
        await expect(page).toMatchTextContent("Are you ready?");

    })
});