import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

import { Player } from '../player';
import { PlayerViewCreatorService } from '../player-view-creator.service';
import { PlayersService } from '../players.service';

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
    rendererFactory: RendererFactory2) 
  { 
    this.renderer = rendererFactory.createRenderer(null, null);
    this.playerViews = playerViewCreatorService.generatePlayerViews([ { name: "Alec" }, { name: "Alison" }, { name: "Ryan" }]);
  }

  ngOnInit(): void {
    this.playerViews.forEach(playerView => this.renderer.appendChild(document.getElementById('players-container'), playerView));
    this.playerViews.forEach(playerView => console.log(playerView));
  }

}
