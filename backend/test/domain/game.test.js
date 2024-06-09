const Deck = require("../../src/domain/deck");
const {Player, Dealer} = require("../../src/domain/players");
const {Game} = require("../../src/domain");
const Card = require("../../src/domain/card");
const {Observer} = require("../../src/domain/observable");
const {useTranslation} = require("../../src/lang");

let game;
let player;
let dealer;
let t;


beforeEach(() => {

    dealer = new Dealer('dealer');
    player = new Player('gambler');
    game = new Game({dealer, player});
    t = useTranslation();

})



test('It creates a new game with the expected stats initialized', () => {

    const stats = game.getStats();

    expect(stats.uuid).toBeDefined();
    expect(stats.deckSize).toBe(52);
    expect(stats.running).toBeFalsy();
    expect(stats.finished).toBeFalsy();
    expect(stats.dealerMove).toBeFalsy();
});


test('It properly starts the game', () => {

    game.start();

    const stats = game.getStats();

    expect(stats.uuid).toBeDefined();
    expect(stats.running).toBe(true);
    expect(stats.deckSize).toBe(48);
});



test('The player starts wining the game with blackjack', () => {

    const observer = new Observer();

    // instrument hand by hacking both players
    game.observe(Game.BEFORE_MOVE_VALIDATION, {

        notify(params) {

            const clubs_k = new Card({suit: 'clubs', name: 'K', value: 10});
            const spades_a = new Card({suit: 'spades', name: 'A', value: 1});

            const hearts_2 = new Card({suit: 'hearts', name: '2', value: 2});
            const hearts_3 = new Card({suit: 'hearts', name: '3', value: 3});

            // hack player's hand
            params.player.hand = [clubs_k, spades_a];
            params.dealer.hand = [hearts_2, hearts_3];
        }

    });

    game.start();
    const stats = game.getStats();
    expect(stats.status).toBe(t('PLAYER_BLACKJACK'));
    expect(stats.finished).toBeTruthy();

});


test('The dealer starts wining the game with blackjack', () => {

    const observer = new Observer();

    // instrument hand by hacking both players
    game.observe(Game.BEFORE_MOVE_VALIDATION, {

        notify(params) {

            const clubs_k = new Card({suit: 'clubs', name: 'K', value: 10});
            const spades_a = new Card({suit: 'spades', name: 'A', value: 1});

            const hearts_2 = new Card({suit: 'hearts', name: '2', value: 2});
            const hearts_3 = new Card({suit: 'hearts', name: '3', value: 3});

            // hack player's hand
            params.player.hand = [hearts_2, hearts_3];
            params.dealer.hand = [clubs_k, spades_a];
        }

    });

    game.start();
    const stats = game.getStats();
    expect(stats.status).toBe(t('DEALER_BLACKJACK'));
    expect(stats.finished).toBeTruthy();

});


test('The dealer starts wining the game with blackjack on tie', () => {

    const observer = new Observer();

    // instrument hand by hacking both players
    game.observe(Game.BEFORE_MOVE_VALIDATION, {

        notify(params) {

            const clubs_k = new Card({suit: 'clubs', name: 'K', value: 10});
            const spades_a = new Card({suit: 'spades', name: 'A', value: 1});

            const hearts_q = new Card({suit: 'hearts', name: 'Q', value: 10});
            const hearts_a = new Card({suit: 'hearts', name: 'A', value: 1});

            // hack player's hand
            params.player.hand = [hearts_q, hearts_a];
            params.dealer.hand = [clubs_k, spades_a];
        }

    });

    game.start();
    const stats = game.getStats();
    expect(stats.status).toBe(t('21_TIE'));
    expect(stats.finished).toBeTruthy();

});


test('Neither of them wins at the start', () => {

    const observer = new Observer();

    // instrument hand by hacking both players
    game.observe(Game.BEFORE_MOVE_VALIDATION, {

        notify(params) {

            const clubs_k = new Card({suit: '5', name: '5', value: 5});
            const spades_8 = new Card({suit: '8', name: '8', value: 8});

            const hearts_4 = new Card({suit: 'hearts', name: '4', value: 4});
            const hearts_5 = new Card({suit: 'hearts', name: '5', value: 5});

            // hack player's hand
            params.player.hand = [clubs_k, spades_8];
            params.dealer.hand = [hearts_4, hearts_5];
        }

    });

    game.start();
    const stats = game.getStats();
    expect(stats.status).toBe(t('HIT_OR_STAND'));

});
