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

  addPlayer(player: Player) {
    this.players.push(player);
  }

  addDeck(deck: Deck) {
    this.decks.push(deck);
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

  getDecks(): Deck[] {
    return this.decks;
  }

  getLifes(): Number[] {
    return this.lifes;
  }

  getPlayerMana(index: string) {
    return this.manas[index];
  }

  constructor() { }
}
