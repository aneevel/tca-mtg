import { Injectable } from '@angular/core';

import { Deck } from './deck';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  decks: Deck[] = [];

  addDeck(deckName) {
    this.decks.push({ 'name': deckName, 'colors': [], 'description': '' });
  }

  getDecks() {
    return this.decks;
  }

  getDeck(deckName) {
    return this.decks.find(deck => deck.name === deckName);
  }

  constructor(private storageService: StorageService) { }
}
