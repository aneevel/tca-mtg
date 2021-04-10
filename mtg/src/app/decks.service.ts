import { Injectable } from '@angular/core';

import { Deck } from './deck';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  addDeck(deckName) {
    this.storageService.add(deckName, JSON.stringify({ 'name': deckName, 'colors': [], 'description': '' }));
  }

  getDecks() {
    if (this.storageService.get("decks") != null) {
      return this.storageService.get("decks");
    } else {
      return [];
    }
  }

  getDeck(deckName) {
    return this.getDecks().filter(x => x["name"] === deckName);
  }

  constructor(private storageService: StorageService) { }
}
