import { Injectable } from '@angular/core';

import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

    players: Player[] = [];

    addPlayer(player) {
        this.players.push(player);
    }

    getPlayers() {
        return this.players;
    }

    getPlayer(playerName) {
        return this.players.find(player => player.name === playerName);
    }

    constructor() { }
}
