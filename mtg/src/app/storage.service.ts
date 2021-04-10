import { Injectable } from '@angular/core';

import { Player } from './player';
import { Deck } from './deck';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  localStorage: Storage;

  constructor() { 
    this.localStorage = window.localStorage;
  }

  set(key: string, value): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, value);

      return true;
    }

    return false;
  }

  addPlayer(player: Player): boolean {
    let players = this.get("players");
    console.log(players);
    return false;
  }

  addDeck(deck: Deck): boolean {
    let decks = this.get("decks");
    console.log(decks);
    return false;
  }

  getPlayer(playerName: string) {
    return null;
  }

  getDeck(deckName: string) {
    return null;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return null;
  }

  getUniquePlayers(): Player[] {
    return [];
  }

  getUniqueDecks(): Deck[] {
    return [];
  }

  remove(key: string) {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);

      return true;
    }

    return false;
  }

  clear() {
    localStorage.clear();
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
