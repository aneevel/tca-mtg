import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Deck } from "./deck";
import { ResultsService } from "./results.service";

@Injectable({
  providedIn: 'root'
})
export class DeckViewCreatorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2,
      private resultsService: ResultsService) { 

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createDeckContainer(deck: Deck): HTMLElement {

    const deckContainer = this.renderer.createElement('div');
    return deckContainer;
  }

  generateDeckViews(decks: Deck[]) {
    const deckViews = [];
    deckViews.forEach(deck => deckViews.push(this.createDeckContainer(deck)));

    return deckViews;
  }
}
