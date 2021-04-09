import { Injectable } from '@angular/core';

import { Player } from './player';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

    players: Player[] = [];

    addPlayer(playerName) {

        this.players.push({ 'name': playerName });
    }

    getPlayers() {
        return this.players;
    }

    getPlayer(playerName) {
        return this.players.find(player => player.name === playerName);
    }

    constructor(private storageService: StorageService) { }
}
