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

    // Top level container
    const deckContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(deckContainer, 'class', 'deck-container');

    // Name header
    const deckNameHeader = this.renderer.createElement('h2');
    this.renderer.setProperty(deckNameHeader, 'innerHTML', deck.name);

    // Mana container
    const manaContainer = this.createManaContainer(deck.colors);
    
    // Description container
    const descriptionContainer = this.createDescriptionContainer(deck.description);

    // Tie all HTML elements together
    this.renderer.appendChild(deckContainer, deckNameHeader);
    this.renderer.appendChild(deckContainer, manaContainer);
    this.renderer.appendChild(deckContainer, descriptionContainer);

    return deckContainer;
  }

  createManaContainer(colors: string[]): HTMLElement {
    const manaContainer = this.renderer.createElement('div');

    // Create a mana symbol for each color passed in
    let manaSymbols: HTMLElement[] = colors.map(color => this.createManaSymbol(color));

    // Append symbols
    manaSymbols.forEach(symbol => this.renderer.appendChild(manaContainer, symbol));

    return manaContainer;
  }

  createDescriptionContainer(description: string): HTMLElement {
    const descriptionContainer = this.renderer.createElement('div');
    
    const descriptionText = this.renderer.createElement('p');
    this.renderer.setProperty(descriptionText, 'innerHTML', description);

    this.renderer.appendChild(descriptionContainer, descriptionText);

    return descriptionContainer;
  }

  createManaSymbol(color: string): HTMLElement {
    const manaSymbol = this.renderer.createElement('img');

    return manaSymbol;
  }

  generateDeckViews(decks: Deck[]) {
    const deckViews = [];
    decks.forEach(deck => deckViews.push(this.createDeckContainer(deck)));

    return deckViews;
  }
}
