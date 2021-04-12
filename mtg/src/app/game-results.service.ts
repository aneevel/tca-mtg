import { Injectable } from '@angular/core';

import { GameResult } from './game-result';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class GameResultsService {

  addResult(result) {
    this.storageService.addResult(result);
  }

  getResults() {
    if (this.storageService.get("results") != null) {
      return this.storageService.get("results");
    } else {
      return [];
    }
  }

  constructor(private storageService: StorageService) { }
}
