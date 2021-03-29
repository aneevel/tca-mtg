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

  incrementLife(player) {
      
  }

  decrementLife(player) {

  }

}
