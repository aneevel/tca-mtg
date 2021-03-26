import { Injectable } from '@angular/core';

import { Deck } from './deck';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  decks: Deck[] = [];

  addDeck(deck) {
    this.decks.push(deck);
  }

  getDecks() {
    return this.decks;
  }

  getDeck(deckName) {
    return this.decks.find(deck => deck.name === deckName);
  }

  constructor() { }
}
