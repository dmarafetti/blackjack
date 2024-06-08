/**
 * Game DTO
 *
 * @author diego
 * @since 1.0.0
 * @class
 */
export default class Game {

    uuid;

    dealer;

    player;

    deckSize;

    status;

    dealerMove;

    running;

    finished;

    constructor({uuid, deckSize, dealer, player, status, dealerMove, running, finished}) {

        this.uuid = uuid;
        this.dealer = dealer;
        this.player = player;
        this.deckSize = deckSize;
        this.status = status;
        this.dealerMove = dealerMove;
        this.running = running;
        this.finished = finished;
    }


    static fromStats (stats) {

        return new Game(stats)

    }

}
