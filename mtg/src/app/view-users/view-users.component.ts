import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

import { Player } from '../player';
import { Deck } from '../deck';
import { PlayerViewCreatorService } from '../player-view-creator.service';
import { PlayersService } from '../players.service';
import { StorageService } from '../storage.service';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  playerViews = [];
  private renderer: Renderer2;
  
  constructor(
    private playersService: PlayersService,
    private playerViewCreatorService: PlayerViewCreatorService,
    private storageService: StorageService,
    rendererFactory: RendererFactory2) 
  { 
    this.renderer = rendererFactory.createRenderer(null, null);
    this.playerViews = playerViewCreatorService.generatePlayerViews(this.storageService.getPlayers());
  }

  ngOnInit(): void {
    this.playerViews.forEach(playerView => this.renderer.appendChild(document.getElementById('players-container'), playerView));
    this.playerViews.forEach(playerView => console.log(playerView));
  }

  calculateWinLossRecord(playerName: string) {

  }

  //determineTopDecksUsed(playerName: string): Deck {
  // const playerResults = this.storageService.getResults();


  //}

}
