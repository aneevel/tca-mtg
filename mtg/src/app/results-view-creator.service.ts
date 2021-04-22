import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { GameResult } from './game-result';

@Injectable({
  providedIn: 'root'
})
export class ResultsViewCreatorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createResultView(result: GameResult): HTMLElement {
    const resultContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(resultContainer, "class", "result-view");

    // Setup result header
    const resultHeader = this.renderer.createElement('h2');
    this.renderer.setProperty(resultHeader, "innerHTML",
       `Final Result: ${result.winningLife} to 0`);

    // Player Data
    const playerData = this.renderer.createElement('h3');
    this.renderer.setProperty(playerData, 'innerHTML', 
      `${result.winner.name} defeated ${result.loser.name}`);

    // Deck data
    const deckData = this.renderer.createElement('h3');
    this.renderer.setProperty(deckData, 'innerHTML',
      `${result.winner.name} used the ${result.winnerDeck.name} deck to
        take down ${result.loser.name} and their ${result.loserDeck.name} deck`);

    // Game results
    const dateData = this.renderer.createElement('p');
    this.renderer.setProperty(dateData, 'innerHTML',
      `This battle took place on ${result.dateOccurred}`);

    this.renderer.appendChild(resultContainer, resultHeader);
    this.renderer.appendChild(resultContainer, playerData);
    this.renderer.appendChild(resultContainer, deckData);
    this.renderer.appendChild(resultContainer, dateData);

    return resultContainer;
  }

  generateResultViews(results: GameResult[], resultsToShow): HTMLElement[] {

    const resultViews = [];
    let truncatedResults = [...results.slice(0, resultsToShow)];
    truncatedResults.forEach(result => resultViews.push(this.createResultView(result)));

    return resultViews;
  }
}
