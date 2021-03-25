import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Player } from "./player";

@Injectable({
  providedIn: 'root'
})
export class PlayerViewCreatorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) { 

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createPlayerContainer(player: Player): HTMLElement {
    
    /**  Create all html elements */

    // Top level player container
    const playerContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerContainer, 'class', 'player-container');
    
    const playerNameContainer = this.renderer.createElement('div');

    const playerWinLossContainer = this.createWinLossContainer();
    const playerResultsContainer = this.createRecentResultsContainer();
    const playerDecksContainer = this.createDecksUsedContainer();

    // Name
    const playerNameHeader = this.renderer.createElement('h2');
    this.renderer.setProperty(playerNameHeader, 'innerHTML', player.name);

    const playerTopDecksHeader = this.renderer.createElement('h3');
    const playerTopDecksList = this.renderer.createElement('ul');

    /** Tie all HTML elements together properly */

    // Name
    this.renderer.appendChild(playerNameContainer, playerNameHeader);

    // Top Decks used
    this.renderer.appendChild(playerDecksContainer, playerTopDecksHeader);
    this.renderer.appendChild(playerDecksContainer, playerTopDecksList);

    // Top-level 
    this.renderer.appendChild(playerContainer, playerNameContainer);
    this.renderer.appendChild(playerContainer, playerWinLossContainer);
    this.renderer.appendChild(playerContainer, playerResultsContainer);
    this.renderer.appendChild(playerContainer, playerDecksContainer);

    return playerContainer;
  }

  createWinLossContainer() {

    const playerWinLossContainer = this.renderer.createElement('div');
    this.renderer.setProperty(playerWinLossContainer, 'class', 'player-win-loss-container');

    const playerGlobalWinLossHeader = this.renderer.createElement('h3');
    this.renderer.setProperty(playerGlobalWinLossHeader, 'class', 'player-global-wl-header');

    const playerVsRecordsList = this.renderer.createElement('ul');
    this.renderer.setProperty(playerVsRecordsList, 'class', 'player-vs-records-list');

    this.renderer.appendChild(playerWinLossContainer, playerGlobalWinLossHeader);
    this.renderer.appendChild(playerWinLossContainer, playerVsRecordsList);

    // TODO: Setup and attach each individual vs record

    return playerWinLossContainer;
  }

  createRecentResultsContainer() {

    const playerResultsContainer = this.renderer.createElement('div');
    this.renderer.setProperty(playerResultsContainer, 'class', 'player-results-container');

    const playerResultsHeader = this.renderer.createElement('h3');
    this.renderer.setProperty(playerResultsHeader, 'class', 'player-results-header');

    const playerRecentResultsList = this.renderer.createElement('ul');
    this.renderer.setProperty(playerRecentResultsList, 'class', 'player-recent-results-list');

    this.renderer.appendChild(playerResultsContainer, playerResultsHeader);
    this.renderer.appendChild(playerResultsContainer, playerRecentResultsList);

    return playerResultsContainer;
  }

  createDecksUsedContainer() {

    const playerDecksContainer = this.renderer.createElement('div');
    this.renderer.setProperty(playerDecksContainer, 'class', 'player-decks-container');

    const playerTopDecksHeader = this.renderer.createElement('h3');
    this.renderer.setProperty(playerTopDecksHeader, 'class', 'player-top-decks-header');

    const playerTopDecksList = this.renderer.createElement('ul');
    this.renderer.setProperty(playerTopDecksList, 'class', 'player-top-decks-list');

    return playerDecksContainer;
  }

  generatePlayerViews(players: Player[]) {

    const playerViews = [];
    players.forEach(player => playerViews.push(this.createPlayerContainer(player)))

    players.forEach(player => console.log(player));

    return playerViews;
  }
}
