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

  constructor(public currentGame: CurrentGameService) { 

    currentGame.initializeGame();
  }

  ngOnInit(): void {
  }

  addMana(manaType: string, player) {
    console.log(`${manaType} Mana added to ${this.currentGame.players[player].name}'s Mana pool!`);
  }

  incrementLife(player) {
      this.currentGame.incrementLife(player);
      this.checkGameStatus();
  }

  decrementLife(player) {
      this.currentGame.decrementLife(player);
      this.checkGameStatus();
  }

  checkGameStatus() {
    if (this.currentGame.lifes[0] === 0 || this.currentGame.lifes[1] === 0) {
      this.endGame();
    }
  }

  endGame() {
    window.alert("Game Over!");
  }

}
