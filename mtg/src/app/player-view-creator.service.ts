import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerViewCreatorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) { 

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createPlayerContainer() {
    
    /**  Create all html elements */

    // Top level player container
    const playerContainer = this.renderer.createElement('div');
    this.renderer.setProperty(playerContainer, 'class', 'player-container');
    
    const playerNameContainer = this.renderer.createElement('div');
    const playerWinLossContainer = this.renderer.createElement('div');
    const playerResultsContainer = this.renderer.createElement('div');
    const playerDecksContainer = this.renderer.createElement('div');

    // Name
    const playerNameHeader = this.renderer.createElement('h2');

    // W-L Record
    const playerGlobalWinLossHeader = this.renderer.createElement('h3');
    const playerVsRecordsList = this.renderer.createElement('ul');
    // TODO: Add each record to list

    // Recent results
    const playerResultsHeader = this.renderer.createElement('h3');
    const playerRecentResultsList = this.renderer.createElement('ul');
    // TODO: Add each result to list

    // Top Decks used
    const playerTopDecksHeader = this.renderer.createElement('h3');
    const playerTopDecksList = this.renderer.createElement('ul');
    // TODO: Add each deck to list

    /** Tie all HTML elements together properly */

    // Tie all descendents of containers

    // Name
    this.renderer.appendChild(playerNameContainer, playerNameHeader);

    // W-L Record
    this.renderer.appendChild(playerWinLossContainer, playerGlobalWinLossHeader);
    this.renderer.appendChild(playerWinLossContainer, playerVsRecordsList);

    // Recent results
    this.renderer.appendChild(playerResultsContainer, playerResultsHeader);
    this.renderer.appendChild(playerResultsContainer, playerRecentResultsList);

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
}
