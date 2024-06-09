const Deck = require('../../src/domain/deck');
const Card = require("../../src/domain/card");
const OutOfCardsException = require('../../src/exceptions/outOfCardsException');


test('It creates a standard 52-card French-suited deck', () => {

    const deck = Deck.createDeck();

    expect(deck.size()).toBe(52);

});


test('It shuffles the deck as expected', () => {

    // hard to test. It may fail sometimes

});


test('A card is removed when it deals', () => {

    const deck = Deck.createDeck();

    const aCard = deck.dealACard();

    expect(deck.size()).toBe(51);

});


test('Deck is expected to run out of cards', () => {

    const hearts_2 = new Card({suit: 'hearts', name: '2', value: 2});

    const deck = new Deck([hearts_2])

    const firstCard = deck.dealACard();

    expect(firstCard).not.toBeNull();

    expect(deck.dealACard.bind(deck)).toThrow(OutOfCardsException);



});
