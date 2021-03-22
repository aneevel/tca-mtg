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

  getDeck(deck) {
    return this.decks.find(deck);
  }

  constructor() { }
}
