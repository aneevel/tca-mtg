import { Component, OnInit } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';

import { Player } from '../player';
import { Deck } from '../deck';
import { CurrentGameService } from '../current-game.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  players: Player[] = [];
  decks: Deck[] = [];
  lifes: Number[] = [];
  manas: string[][] = [];

  constructor(currentGame: CurrentGameService) { 

    currentGame.initializeGame();
    this.players = currentGame.getPlayers();
    this.decks = currentGame.getDecks();
    this.lifes = currentGame.getLifes();
    this.manas = currentGame.getManas();
  }

  ngOnInit(): void {
  }

}
