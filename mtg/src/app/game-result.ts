import { Player } from './player';
import { Deck } from './deck';

export interface GameResult {
    dateOccurred: string,
    winner: Player,
    loser: Player,
    winningLife: Number,
    winnerDeck: Deck, 
    loserDeck: Deck
}
