import { Injectable } from '@angular/core';

import { Player } from './player';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

    addPlayer(playerName) {

        this.storageService.addPlayer({ 'name': playerName });
    }

    getPlayers() {
        if (this.storageService.get("players") != null) {
            return this.storageService.get("players");
        } else {
            return [];
        }
    }

    getPlayer(playerName) {
        return this.storageService.getPlayer(playerName);
    }

    playerExists(playerName): boolean {
        return false;
    }

    constructor(private storageService: StorageService) { }
}
