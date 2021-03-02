import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

    players = [];

    addPlayer(player) {
        this.players.push(player);
    }

    getPlayers() {
        return this.players;
    }

    getPlayer(player) {
        return this.players.find(player);
    }

    constructor() { }
}
