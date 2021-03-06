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

  createEmptyPlaceholder(): HTMLElement {

    const placeholderContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(placeholderContainer, 'class', 'empty-container');

    // Some flavor text should inform user there are no current players
    const placeholderContent = this.renderer.createElement('h2');
    this.renderer.setProperty(placeholderContent, 'innerHTML', 'No players currently exist. Play some games to fill out this page!');

    this.renderer.appendChild(placeholderContainer, placeholderContent);

    return placeholderContainer;
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
    const playerResultsContainer = this.createRecentResultsContainer(player.name);
    const playerDecksContainer = this.createDecksUsedContainer(player.name);

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

  createRecentResultsContainer(playerName: string) {

    // Create top-level componenent
    const playerResultsContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerResultsContainer, 'class', 'player-results-container');

    const playerResultsHeader = this.renderer.createElement('h3');
    this.renderer.setAttribute(playerResultsHeader, 'class', 'player-results-header');
    this.renderer.setProperty(playerResultsHeader, 'innerHTML', 'Recent Results');


    this.renderer.appendChild(playerResultsContainer, playerResultsHeader);
    this.renderer.appendChild(playerResultsContainer, this.generateRecentResults(playerName));

    return playerResultsContainer;
  }

  createDecksUsedContainer(playerName: string) {

    const playerDecksContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(playerDecksContainer, 'class', 'player-decks-container');

    const playerTopDecksHeader = this.renderer.createElement('h3');
    this.renderer.setAttribute(playerTopDecksHeader, 'class', 'player-top-decks-header');
    this.renderer.setProperty(playerTopDecksHeader, 'innerHTML', 'Top 5 Decks Used');

    const playerTopDecksList = this.generateTopDecksUsed(playerName);
    this.renderer.setAttribute(playerTopDecksList, 'class', 'player-top-decks-list');

    this.renderer.appendChild(playerDecksContainer, playerTopDecksHeader);
    this.renderer.appendChild(playerDecksContainer, playerTopDecksList);

    return playerDecksContainer;
  }

  generatePlayerViews(players: Player[]) {

    const playerViews = [];

    // Avoid error when generating deck views with empty players array
    if (players)
      players.forEach(player => playerViews.push(this.createPlayerContainer(player)))
    else 
      playerViews.push(this.createEmptyPlaceholder());

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
    if (totalGames === 0) {
      this.renderer.setProperty(winLossDisplay, "innerHTML", "No games played yet");
    } else {
      this.renderer.setProperty(winLossDisplay, "innerHTML", `${(wins / totalGames).toFixed(3)} (${wins} - ${totalGames - wins})`);
    }

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

  generateRecentResults(playerName: string) : HTMLElement {

    // Construct top-level container
    let recentResultsContainer = this.renderer.createElement("div");
    let recentResultsDisplay = this.renderer.createElement("ul");
    this.renderer.appendChild(recentResultsContainer, recentResultsDisplay);

    // Get results for player
    const results = [...this.resultsService.getResultsForPlayer(playerName)];
    const truncatedResults = [...results.slice(results.length - 5, results.length).reverse()];

    // Construct an element for each result
    truncatedResults.forEach(result => this.renderer.appendChild(recentResultsDisplay, this.generateRecentResultView(result)));

    return recentResultsContainer;
  }

  generateRecentResultView(result) : HTMLElement {

    // Create list item
    let recentResultItem = this.renderer.createElement("li");
    let recentResultText = this.renderer.createElement("p");
    this.renderer.appendChild(recentResultItem, recentResultText);

    // Attach formatted text
    this.renderer.setProperty(recentResultText, "innerHTML", `On ${result.dateOccurred}, ${result.winner.name} defeated ${result.loser.name} ${result.winningLife} to 0`)

    return recentResultItem;
  }

  generateTopDecksUsed(playerName: string): HTMLElement {

      // Construct top-level container
      let topDecksContainer = this.renderer.createElement("div");
      let topDecksDisplay = this.renderer.createElement("ul");
      this.renderer.appendChild(topDecksContainer, topDecksDisplay);

      // Get all results for player
      const results = [...this.resultsService.getResultsForPlayer(playerName)];

      // Generate info object detailing top decks used
      const topDecks = this.generateTopDeckInfo(results, playerName);

      // Construct an element for each result
      topDecks.forEach(deckInfo => this.renderer.appendChild(topDecksDisplay, this.generateTopDeckView(deckInfo)));

      return topDecksContainer;
  }

  generateTopDeckView(deckInfo) : HTMLElement {

    // Create list item
    let deckItem = this.renderer.createElement("li");
    let deckText = this.renderer.createElement("p");
    this.renderer.appendChild(deckItem, deckText);

    // Attach formatted text
    this.renderer.setProperty(deckText, "innerHTML", `${deckInfo.name} used ${deckInfo.usage} time(s) (${deckInfo.wins} - ${deckInfo.losses} record)`);

    return deckItem;
  }

  generateTopDeckInfo(results, playerName: string) {

    // Create top-level array of deck info
    let deckInfos = [];
  
    // Find the highest occurring result by comparing 
    let highestOccurringResults = results.sort((resultA, resultB) =>
      results.filter(result => result.winnerDeck.name === resultA.winnerDeck.name || result.loserDeck.name === resultA.loserDeck.name).length
      - results.filter(result => result.winnerDeck.name === resultB.winnerDeck.name || result.loserDeck.name === resultB.loserDeck.name).length);
    
    let terminator = 5;
    if (highestOccurringResults.length < 5) {
      terminator = highestOccurringResults.length;
    }

    // Build deck info for top 5 results
    for (let i = 0; i < terminator; i++) {

      let currentResult = highestOccurringResults[i];

      // Grab deck name
      let deckName = currentResult.winner.name === playerName ? currentResult.winnerDeck.name : currentResult.loserDeck.name;

      // Determine wins
      let wins = results.filter(result => result.winnerDeck === currentResult.winnerDeck && result.winner.name === playerName).length;

      // Determine losses
      let losses = results.filter(result => result.loserDeck === currentResult.loserDeck && result.loser.name === playerName).length;

      // Determine usage
      let usage = wins + losses;

      deckInfos.push({ "name": deckName, "usage": usage, "wins": wins, "losses": losses});
    }
          
    return deckInfos;
  }
}
