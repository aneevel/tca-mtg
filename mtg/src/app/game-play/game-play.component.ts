import { Component, Inject, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentGameService } from '../current-game.service';
import { ManaCreatorService } from '../mana-creator.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {

  private renderer: Renderer2;
  private playerOneColorCycle = 0;
  private playerTwoColorCycle = 1;
  private colors = ["Crimson", "DarkBlue", "DarkSeaGreen", "BlanchedAlmond", "DarkSlateGray"];

  constructor(public currentGame: CurrentGameService,
    private router: Router,
    private manaCreator: ManaCreatorService,
    rendererFactory: RendererFactory2) { 

    this.renderer = rendererFactory.createRenderer(null, null);
    currentGame.initializeGame();
  }

  ngOnInit(): void {
  }

  addMana(manaType: string, player) {
    this.renderer.appendChild(document.getElementById(`${player}-mana-container`), this.manaCreator.buildMana(manaType, player));
  }

  resetMana(player) {
    // Get all used mana icons with player class
    const manaButtons = document.getElementsByClassName(`used-mana ${player}`);

    // Remove used mana class
    while (manaButtons.length > 0 ) {
      manaButtons[0].classList.remove('used-mana');
    }
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
    this.currentGame.finalizeGame();
    this.router.navigate(['/']);
  }

  cycleColor(player) {

    let mat;
    let nextColor;
    if (player === 0) {
      mat = "player-one";
      if (this.playerOneColorCycle === 4) {
        this.playerOneColorCycle = 0;
      } else {
        this.playerOneColorCycle++;
      }
      nextColor = this.colors[this.playerOneColorCycle];
    } else {
      mat = "player-two";
      if (this.playerTwoColorCycle === 4) {
        this.playerTwoColorCycle = 0;
      } else {
        this.playerTwoColorCycle++;
      }
      nextColor = this.colors[this.playerTwoColorCycle];
    }

    this.renderer.setStyle(document.getElementById(`${mat}-mat`), "background-color", nextColor);
  }

}