import { Injectable } from '@angular/core';

import { Deck } from './deck';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  addDeck(deckName) {
    this.storageService.addDeck({ 'name': deckName, 'colors': [], 'description': '' });
  }

  getDecks() {
    if (this.storageService.get("decks") != null) {
      return this.storageService.get("decks");
    } else {
      return [];
    }
  }

  getDeck(deckName) {
    return this.storageService.getDeck(deckName);
  }

  deckExists(deckName): boolean {
    console.log(`Searching for ${deckName} results in `, this.getDeck(deckName));
    return false;
  }

  constructor(private storageService: StorageService) { }
}
