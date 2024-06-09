const Game = require('../../src/domain/game');
const {Dealer, Player} = require('../../src/domain/players');
const Card = require('../../src/domain/card');


test('Creates a player correctly with empty score and no cards', () => {

    const player = new Player('dealer_name');
    expect(player.name).toEqual('dealer_name');
    expect(player.getHandSize()).toBe(0);
    expect(player.getPoints()).toBe(0);
});


test('The player receives a card and update the score with simple cards', () => {

    const player = new Player('player_name');
    const hearts_2 = new Card({suit: 'hearts', name: '2', value: 2});
    const hearts_3 = new Card({suit: 'hearts', name: '5', value: 3});

    player.receiveCard(hearts_2);
    player.receiveCard(hearts_3);

    expect(player.getPoints()).toBe(5);
});


test('The player receives receives an ace and worth 11', () => {

    const player = new Player('player_name');
    const hearts_2 = new Card({suit: 'hearts', name: '2', value: 2});
    const spades_A = new Card({suit: 'spades', name: 'A', value: 1});

    player.receiveCard(hearts_2);
    player.receiveCard(spades_A);

    expect(player.getPoints()).toBe(13);
});


test('The player receives receives an ace and worth 1', () => {

    const player = new Player('player_name');
    const hearts_2 = new Card({suit: 'hearts', name: '2', value: 2});
    const clubs_10 = new Card({suit: 'clubs', name: '10', value: 10});
    const spades_A = new Card({suit: 'spades', name: 'A', value: 1});

    player.receiveCard(hearts_2);
    player.receiveCard(clubs_10);
    player.receiveCard(spades_A);

    expect(player.getPoints()).toBe(13);
});
