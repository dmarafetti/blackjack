const {Blackjack} = require("../../src/domain");
const {Player} = require("../../src/domain/players");


test('It creates a game and can be retrieved again by uuid', () => {

    const game = Blackjack.newGame(new Player('gambler'));
    expect(game.uuid).not.toBe(undefined);
    const sameGame = Blackjack.getGame(game.uuid);
    expect(sameGame).toBe(game);
    expect(sameGame.uuid).toBe(game.uuid);

});


test('It removes an existing game', () => {

    const game = Blackjack.newGame(new Player('gambler'));
    expect(game.uuid).not.toBe(undefined);
    expect(Blackjack.removeGame(game.uuid)).toBeTruthy();
});


test('It checks a non existing game', () => {

    const game = Blackjack.newGame(new Player('gambler'));
    expect(Blackjack.hasGame('no-valid-id')).toBeFalsy();
});

