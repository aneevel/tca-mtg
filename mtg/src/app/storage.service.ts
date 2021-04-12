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

  addPlayer(player: Player) {
    let players = this.get("players");
    if (!players) {
      this.set("players", JSON.stringify([{ "name": player.name}]));
      return;
    } else {
      let players = [...this.get("players")];
      this.set("players", JSON.stringify([...players, { "name": player.name}]));
    }

  }

  addDeck(deck: Deck) {
    let decks = this.get("decks");
    if (!decks) {
      this.set("decks", JSON.stringify([{ "name": deck.name, "colors": deck.colors, "description": deck.description}]));
      return;
    } else {
      let decks = [...this.get("decks")];
      this.set("decks", JSON.stringify([...decks, { "name": deck.name, "colors": deck.colors, "description": deck.description}]));
    }
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
