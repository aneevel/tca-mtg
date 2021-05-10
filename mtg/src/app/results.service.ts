import { Injectable } from '@angular/core';

import { PlayersService } from './players.service';
import { DecksService } from './decks.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  getResultsForPlayer(playerName: string) {

    const results = this.storageService.getResults();

    if (results === null) 
      return null;

    const playerResults = results.filter(result => 
        result.winner.name === playerName || result.loser.name === playerName);

    return playerResults;
  }

  constructor(private storageService: StorageService,
      private playerService: PlayersService,
      private deckService: DecksService) { }
}
