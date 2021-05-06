import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Player } from "./player";
import { ResultsService } from './results.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerViewCreatorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2,
      private storageService: StorageService,
      private resultsService: ResultsService) { 

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createPlayerContainer(player: Player): HTMLElement {
    
    /**  Create all html elements */

    // Top level player container
    const playerContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerContainer, 'class', 'player-container');
    
    const playerNameContainer = this.renderer.createElement('div');

    const playerWinLossContainer = this.createWinLossContainer(player.name);
    const playerResultsContainer = this.createRecentResultsContainer();
    const playerDecksContainer = this.createDecksUsedContainer();

    // Name
    const playerNameHeader = this.renderer.createElement('h2');
    this.renderer.setProperty(playerNameHeader, 'innerHTML', player.name);

    /** Tie all HTML elements together properly */

    // Name
    this.renderer.appendChild(playerNameContainer, playerNameHeader);

    // Top-level 
    this.renderer.appendChild(playerContainer, playerNameContainer);
    this.renderer.appendChild(playerContainer, playerWinLossContainer);
    this.renderer.appendChild(playerContainer, playerResultsContainer);
    this.renderer.appendChild(playerContainer, playerDecksContainer);

    return playerContainer;
  }

  createWinLossContainer(playerName: string) {

    const playerWinLossContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerWinLossContainer, 'class', 'player-win-loss-container');

    // Setup global win-loss section
    const playerGlobalWinLossHeader = this.renderer.createElement('h3');
    this.renderer.setAttribute(playerGlobalWinLossHeader, 'class', 'player-global-wl-header');
    this.renderer.setProperty(playerGlobalWinLossHeader, 'innerHTML', 'Win - Loss Record');
    this.renderer.appendChild(playerGlobalWinLossHeader, this.generateGlobalWinLossRecord(playerName));

    // Setup individual VS record section
    const playerVsRecordsList = this.renderer.createElement('ul');
    this.renderer.setAttribute(playerVsRecordsList, 'class', 'player-vs-records-list');

    this.renderer.appendChild(playerWinLossContainer, playerGlobalWinLossHeader);
    this.renderer.appendChild(playerWinLossContainer, playerVsRecordsList);

    // TODO: Setup and attach each individual vs record

    return playerWinLossContainer;
  }

  createRecentResultsContainer() {

    const playerResultsContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerResultsContainer, 'class', 'player-results-container');

    const playerResultsHeader = this.renderer.createElement('h3');
    this.renderer.setAttribute(playerResultsHeader, 'class', 'player-results-header');
    this.renderer.setProperty(playerResultsHeader, 'innerHTML', 'Recent Results');

    const playerRecentResultsList = this.renderer.createElement('ul');
    this.renderer.setAttribute(playerRecentResultsList, 'class', 'player-recent-results-list');

    this.renderer.appendChild(playerResultsContainer, playerResultsHeader);
    this.renderer.appendChild(playerResultsContainer, playerRecentResultsList);

    return playerResultsContainer;
  }

  createDecksUsedContainer() {

    const playerDecksContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerDecksContainer, 'class', 'player-decks-container');

    const playerTopDecksHeader = this.renderer.createElement('h3');
    this.renderer.setAttribute(playerTopDecksHeader, 'class', 'player-top-decks-header');
    this.renderer.setProperty(playerTopDecksHeader, 'innerHTML', 'Top Decks Used');

    const playerTopDecksList = this.renderer.createElement('ul');
    this.renderer.setAttribute(playerTopDecksList, 'class', 'player-top-decks-list');

    this.renderer.appendChild(playerDecksContainer, playerTopDecksHeader);
    this.renderer.appendChild(playerDecksContainer, playerTopDecksList);

    return playerDecksContainer;
  }

  generatePlayerViews(players: Player[]) {

    const playerViews = [];
    players.forEach(player => playerViews.push(this.createPlayerContainer(player)))

    return playerViews;
  }

  generateResults(playerName: string, numberOfResults) {
    let results = this.resultsService.getResultsForPlayer(playerName);
    let filteredResults = [...results.slice(0, numberOfResults)];

    return filteredResults;
  }

  generateGlobalWinLossRecord(playerName: string): HTMLElement {

    let winLossDisplay;
    const playerResults = [...this.storageService.getResults().filter(result => result.winner.name === playerName || result.loser.name === playerName)];

    // Determine wins and games played
    const wins = playerResults.filter(result => result.winner.name === playerName).length;
    const totalGames = playerResults.length;

    // Setup HTMLElement to display
    winLossDisplay = this.renderer.createElement("h4");
    this.renderer.setProperty(winLossDisplay, "class", "win-loss-record");
    this.renderer.setProperty(winLossDisplay, "innerHTML", `${wins / totalGames} (${wins} - ${totalGames - wins})`);

    return winLossDisplay;
  }

  //determineTopDecksUsed(playerName: string): Deck {
  // const playerResults = this.storageService.getResults();


  //}
}
