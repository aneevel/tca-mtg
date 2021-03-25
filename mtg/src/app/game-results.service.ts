import { Injectable } from '@angular/core';

import { GameResult } from './game-result';

@Injectable({
  providedIn: 'root'
})
export class GameResultsService {

  results: GameResult[] = [];

  addResult(result) {
    this.results.push(result);
  }

  getResults() {
    return this.results;
  }

  constructor() { }
}
