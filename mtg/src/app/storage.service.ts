import { Injectable } from '@angular/core';

import { Player } from './player';
import { Deck } from './deck';
import { GameResult } from './game-result';

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
    } else {
      this.set("players", JSON.stringify([...players, { "name": player.name}]));
    }

  }

  addDeck(deck: Deck) {
    let decks = this.get("decks");
    if (!decks) {
      this.set("decks", JSON.stringify([{ "name": deck.name, "colors": deck.colors, "description": deck.description}]));
    } else {
      this.set("decks", JSON.stringify([...decks, { "name": deck.name, "colors": deck.colors, "description": deck.description}]));
    }
  }

  addResult(result: GameResult) {
    let results = this.get("results");
    if (!results) {
      this.set("results", JSON.stringify([{ "dateOccurred": result.dateOccurred,
          "winner": result.winner,
          "loser": result.loser,
          "winningLife": result.winningLife,
          "winnerDeck": result.winnerDeck,
          "loserDeck": result.loserDeck}]));
    } else {
      this.set("results", JSON.stringify([...results, { "dateOccurred": result.dateOccurred,
          "winner": result.winner,
          "loser": result.loser,
          "winningLife": result.winningLife,
          "winnerDeck": result.winnerDeck,
          "loserDeck": result.loserDeck}]));
    }
  }

  getPlayers() {
    let players = this.get("players");
    if (players)
      return players;

    return null;
  }

  getDecks() {
    let decks = this.get("decks");
    if (decks)
      return decks;
    
    return null;
  }

  getResults() {
    let results = this.get("results");
    if (results)
      return results;

    return null;
  }

  getPlayer(playerName: string) {
    let players = this.getPlayers();
    if (!players) 
      return null;

    let player = players.find(player => player.name === playerName);
    if (player !== undefined) 
      return player;
    return null;
  }

  getDeck(deckName: string) {
    let decks = this.getDecks();
    if (!decks) 
      return null;

    let deck = decks.find(deck => deck.name === deckName);
    if (deck !== undefined)
      return deck;
    return null;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return null;
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
