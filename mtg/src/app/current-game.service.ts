import { Injectable } from '@angular/core';

import { Player } from './player';
import { Deck } from './deck';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {

  players: Player[] = [];
  decks: Deck[] = []
  lifes: Number[] = []
  manas: string[][] = [];

  initializeGame() {
    this.players.forEach(player => {
      this.lifes.push(20);
    });

    this.players.forEach(player => console.log(player.name));
  }

  addPlayer(playerName: string) {
    this.players.push({ 'name': playerName });
  }

  addDeck(deckName: string) {
    this.decks.push({ 'name': deckName, 'colors': [], 'description': ''});
  }

  resetLife() {
    this.lifes = [];  
  }

  changeLife(index: string, change: Number) {
    this.lifes[index] += change; 
  }

  resetMana() {
    this.manas = [];
  }

  addMana(index: string, manaType: string) {
    this.manas[index].push(manaType);
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getPlayer(index: string) {
    return this.players[index];
  }

  getDecks(): Deck[] {
    return this.decks;
  }

  getDeck(index: string) {
    return this.decks[index];
  }

  getLifes(): Number[] {
    return this.lifes;
  }

  getPlayerMana(index: string) {
    return this.manas[index];
  }

  getManas(): string[][] {
    return this.manas;
  }

  constructor(
  ) { }
}
