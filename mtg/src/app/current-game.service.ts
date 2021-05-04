import { Injectable } from '@angular/core';

import { Player } from './player';
import { Deck } from './deck';
import { GameResult } from './game-result';
import { GameResultsService } from './game-results.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentGameService {

  players: Player[] = [];
  decks: Deck[] = []
  lifes: Number[] = []
  manas: string[][] = [];
  gameResult: GameResult;

  initializeGame() {
    this.players.forEach(player => {
      this.lifes.push(20);
    });
  }

  finalizeGame() {

    // Construct basic game result
    this.gameResult = {
      dateOccurred: new Date(),
      winner: this.players[0],
      loser: this.players[0],
      winningLife: 0,
      winnerDeck: this.decks[0],
      loserDeck: this.decks[0]
    };
    this.gameResult.dateOccurred = new Date();

    // Determine who won
    if (this.lifes[1] === 0) {

      // Setup winner variables
      this.gameResult.winner = this.players[0];
      this.gameResult.winnerDeck = this.decks[0];
      this.gameResult.winningLife = this.lifes[0];

      // Setup loser variables
      this.gameResult.loser = this.players[1];
      this.gameResult.loserDeck = this.decks[1];
    }  else {

      // Setup winner variables
      this.gameResult.winner = this.players[1];
      this.gameResult.winnerDeck = this.decks[1];
      this.gameResult.winningLife = this.lifes[1];

      // Setup loser variables
      this.gameResult.loser = this.players[0];
      this.gameResult.loserDeck = this.decks[0];
    }

    this.gameResultsService.addResult(this.gameResult);
    this.clearGame();
  }

  clearGame() {
    this.resetLife();
    this.resetMana();
    this.resetPlayers();
    this.resetDecks();
    this.resetResult();
  }

  resetResult() {
    this.gameResult = null;
  }

  addPlayer(playerName: string) {
    this.players.push({ 'name': playerName });
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

  resetPlayers() {
    this.players = [];
  }

  getPlayer(index: string) {
    return this.players[index];
  }

  getDecks(): Deck[] {
    return this.decks;
  }

  resetDecks() {
    this.decks = [];
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

  incrementLife(player: string) {
    this.changeLife(player, 1);
  }

  decrementLife(player: string) {
    this.changeLife(player, -1);
  }

  constructor(private gameResultsService: GameResultsService) { }
}
