import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deck } from '../deck';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
