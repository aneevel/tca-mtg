import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';

import { Player } from '../player';
import { Deck } from '../deck';
import { CurrentGameService } from '../current-game.service';
import { ManaCreatorService } from '../mana-creator.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  private renderer: Renderer2;

  constructor(public currentGame: CurrentGameService,
    private manaCreator: ManaCreatorService,
    rendererFactory: RendererFactory2) { 

    this.renderer = rendererFactory.createRenderer(null, null);
    currentGame.initializeGame();
  }

  ngOnInit(): void {
  }

  addMana(manaType: string, player) {
    this.renderer.appendChild(document.getElementById(`${player}-mana-container`), this.manaCreator.buildMana(manaType));
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
