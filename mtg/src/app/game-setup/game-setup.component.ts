import { Component, OnInit } from '@angular/core';

import { PlayersService } from '../players.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

    players = [];

  constructor(
      private playerService: PlayersService
  ) { 
    this.players = playerService.getPlayers();
  }

  ngOnInit(): void {
  }

}
