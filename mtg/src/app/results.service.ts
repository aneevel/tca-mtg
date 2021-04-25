import { Injectable } from '@angular/core';

import { Player } from './player';
import { PlayersService } from './players.service';
import { Deck } from './deck';
import { DecksService } from './decks.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  getResultsForPlayer(playerName: string) {

    const player = this.storageService.getPlayer(playerName);
    const results = this.storageService.getResults();

    const playerResults = results.filter(result => 
        result.winner === player || result.loser === player);

    return playerResults;
  }

  constructor(private storageService: StorageService,
      private playerService: PlayersService,
      private deckService: DecksService) { }
}
