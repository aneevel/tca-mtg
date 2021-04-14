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

    return resultContainer;
  }

  createResultsContainer(): HTMLElement {

    /** Top level container */
    const resultsContainer = this.renderer.createElement('div');

    return resultsContainer;
  }

  generateResultViews(results: GameResult[], resultsToShow) {

    const resultViews = [];
    let truncatedResults = [...results.slice(0, resultsToShow)];
    truncatedResults.forEach(result => resultViews.push(this.createResultView(result)));
  }
}
