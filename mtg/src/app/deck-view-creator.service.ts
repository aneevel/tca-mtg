import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { Deck } from "./deck";

@Injectable({
  providedIn: 'root'
})
export class DeckViewCreatorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) { 

    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createDeckContainer(deck: Deck): HTMLElement {

    // Grid tile
    const tileContainer = this.renderer.createElement('mat-grid-tile');
    this.renderer.setAttribute(tileContainer, 'class', 'deck-tile');

    // Top level container
    const deckContainer = this.renderer.createElement('mat-card');
    this.renderer.setAttribute(deckContainer, 'class', 'deck-container');
    this.renderer.appendChild(tileContainer, deckContainer);

    // Name header
    const deckNameHeader = this.renderer.createElement('mat-card-header');
    const deckNameHeaderTitle = this.renderer.createElement('mat-card-title');
    this.renderer.setProperty(deckNameHeaderTitle, 'innerHTML', deck.name);
    this.renderer.appendChild(deckNameHeader, deckNameHeaderTitle);

    // Mana container
    const manaContainer = this.createManaContainer(deck.colors);

    // Description container
    const descriptionContainer = this.createDescriptionContainer(deck.description);

    // Button container
    const buttonContainer = this.renderer.createElement('mat-card-actions');
    this.renderer.setAttribute(buttonContainer, 'class', 'button-container');

    // Remove button
    const removeDeckButton = this.renderer.createElement('button');
    this.renderer.setProperty(removeDeckButton, 'innerHTML', "Remove");
    this.renderer.addClass(removeDeckButton, "mat-raised-button");
    

    // Tie all HTML elements together
    this.renderer.appendChild(tileContainer, deckContainer);
    this.renderer.appendChild(deckContainer, deckNameHeader);
    this.renderer.appendChild(deckContainer, manaContainer);
    this.renderer.appendChild(deckContainer, descriptionContainer);
    this.renderer.appendChild(buttonContainer, removeDeckButton);
    this.renderer.appendChild(deckContainer, buttonContainer);

    return tileContainer;
  }

  createManaContainer(colors: string[]): HTMLElement {
    const manaContainer = this.renderer.createElement('mat-card-subtitle');
    this.renderer.addClass(manaContainer, "mana-container");

    // Create a mana symbol for each color passed in
    let manaSymbols: HTMLElement[] = colors.map(color => this.createManaSymbol(color));

    // Append symbols
    manaSymbols.forEach(symbol => 
        this.renderer.appendChild(manaContainer, symbol));

    return manaContainer;
  }

  createDescriptionContainer(description: string): HTMLElement {
    const descriptionContainer = this.renderer.createElement('mat-card-content');
    
    const descriptionText = this.renderer.createElement('p');
    this.renderer.setProperty(descriptionText, 'innerHTML', description);
    this.renderer.addClass(descriptionText, 'deck-description-text');

    this.renderer.appendChild(descriptionContainer, descriptionText);

    return descriptionContainer;
  }

  createManaSymbol(color: string): HTMLElement {
    const manaSymbol = this.renderer.createElement('img');
    this.renderer.setProperty(manaSymbol, "src", `assets/${color}-symbol.png`);
    this.renderer.setProperty(manaSymbol, 'width', 20);
    this.renderer.setProperty(manaSymbol, "height", 20);

    return manaSymbol;
  }

  generateDeckViews(decks: Deck[]) {
    const deckViews = [];
    decks.forEach(deck => deckViews.push(this.createDeckContainer(deck)));

    return deckViews;
  }
}
