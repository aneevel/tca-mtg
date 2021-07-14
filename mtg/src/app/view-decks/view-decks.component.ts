import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

import { StorageService } from '../storage.service';
import { DecksService } from '../decks.service';
import { DeckViewCreatorService } from '../deck-view-creator.service';

@Component({
  selector: 'app-view-decks',
  templateUrl: './view-decks.component.html',
  styleUrls: ['./view-decks.component.css']
})
export class ViewDecksComponent implements OnInit {

  deckViews = [];
  private renderer: Renderer2;

  constructor(private decksService: DecksService,
    private deckViewCreatorService: DeckViewCreatorService,
    private storageService: StorageService,
    rendererFactory: RendererFactory2) 
    { 
      this.renderer = rendererFactory.createRenderer(null, null);
      this.deckViews = deckViewCreatorService.generateDeckViews(this.storageService.getDecks());
    }


  ngOnInit(): void {
    this.deckViews.forEach(deckView => this.renderer.appendChild(document.getElementById('decks-container'), deckView));
  }

}

@Component({
  selector: 'app-deck-search',
  templateUrl: './search-decks.component.html',
  styleUrls: ['./search-decks.component.css']
})
export class DeckSearchComponent {

}
