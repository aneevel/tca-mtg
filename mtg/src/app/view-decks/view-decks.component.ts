import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { Deck } from '../deck';
import { DeckCardComponent } from '../deck-card/deck-card.component';
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
  apiResponse: any;
  isSearching: boolean;

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

  searchForm: FormGroup;
  filters: Map<string, string>;

  ngOnInit() {
    this.searchForm = new FormGroup({
      timesUsed: new FormControl(''),
      timesWon: new FormControl(''),
      timesLost: new FormControl(''),
      colors: new FormArray([
        new FormControl('Red'),
        new FormControl('Blue'),
        new FormControl('Green'),
        new FormControl('Black'),
        new FormControl('White')
      ]),
      winningPercentage: new FormControl('')
    })

    this.filters = new Map();
  }

  onSearch(form: FormGroup) {
      this.replaceDecks(this.filterSearchResults(form));
  }

  get colors() {
    return this.searchForm.get('colors') as FormArray;
  }

  replaceDecks(decks: Deck[]) {

  }

  filterSearchResults(form: FormGroup): Deck[] {

    let filteredDecks: Deck[] = [];

    console.log("Filters in use: ", this.filters);

    return filteredDecks;
  }
}
