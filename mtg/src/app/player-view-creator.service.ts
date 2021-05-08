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

    // Return empty div if there are no results for the player
    if (this.resultsService.getResultsForPlayer(player.name) === null) 
      return this.renderer.createElement('div');

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

    this.renderer.appendChild(playerWinLossContainer, playerGlobalWinLossHeader);
    this.renderer.appendChild(playerWinLossContainer, this.generateVsRecords(playerName));

    // TODO: Setup and attach each individual vs record

    return playerWinLossContainer;
  }

  createRecentResultsContainer() {

    // Create top-level componenent
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
    this.renderer.setProperty(playerTopDecksHeader, 'innerHTML', 'Top 5 Decks Used');

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
    this.renderer.setProperty(winLossDisplay, "innerHTML", `${(wins / totalGames).toFixed(3)} (${wins} - ${totalGames - wins})`);

    return winLossDisplay;
  }

  generateVsRecords(playerName: string): HTMLElement {

    let vsRecordDisplayContainer = this.renderer.createElement("div");
    let vsRecordDisplayList = this.renderer.createElement("ul");
    this.renderer.appendChild(vsRecordDisplayContainer, vsRecordDisplayList);
    
    // Get all unique players
    const uniqueWinners = [...new Set(this.storageService.getResults().map(result => result.winner.name))];
    const uniqueLosers = [...new Set(this.storageService.getResults().map(result => result.loser.name))];
    const uniquePlayers = new Set([...uniqueWinners, ...uniqueLosers]);

    // Remove the player we're looking at
    uniquePlayers.delete(playerName);

    // Construct an element for each individual vs record
    uniquePlayers.forEach(player => 
      this.renderer.appendChild(vsRecordDisplayList, this.generateVsRecord(playerName, player as string)));

    return vsRecordDisplayContainer;
  }

  generateVsRecord(playerName: string, opponentName: string): HTMLElement {

    // Create list container
    let vsRecordDisplay = this.renderer.createElement("li");

    // Determine record vs player
    const playerResults = [...this.storageService.getResults().filter(result => (result.winner.name === playerName || result.loser.name === playerName)
      && (result.winner.name === opponentName || result.loser.name === opponentName))];
    const playerWins = playerResults.filter(result => result.winner.name === playerName).length;
    const playerLosses = playerResults.length - playerWins;

    // Construct the final HTML element
    let vsRecord = this.renderer.createElement("p");
    
    // If no results were found, indicate no record
    if (playerResults.length === 0) {
      this.renderer.setProperty(vsRecord, "innerHTML", `vs. ${opponentName}: No games played`);
    } else {
      this.renderer.setProperty(vsRecord, "innerHTML", `vs. ${opponentName}: ${(playerWins / playerResults.length).toFixed(3)} (${playerWins} - ${playerLosses})`);
    }
    
    this.renderer.appendChild(vsRecordDisplay, vsRecord);

    return vsRecordDisplay;
  }

  generateRecentResults(playerName: string) {

  }

  //generateTopDecksUsed(playerName: string): Deck {
  // const playerResults = this.storageService.getResults();


  //}
}
