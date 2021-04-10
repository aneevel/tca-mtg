import { Injectable } from '@angular/core';

import { Player } from './player';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

    addPlayer(playerName) {

        this.storageService.add("players", JSON.stringify({ 'name': playerName }));
    }

    getPlayers() {
        if (this.storageService.get("players") != null) {
            return this.storageService.get("players");
        } else {
            return [];
        }
    }

    getPlayer(playerName) {
        return this.getPlayers().filter(x => x["name"] === playerName);
    }

    playerExists(playerName): boolean {
        return false;
    }

    constructor(private storageService: StorageService) { }
}
