import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Deck } from '../deck';
import { Player } from '../player';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})

export class GameSetupComponent implements OnInit {

    playerOneNameControl = new FormControl();
    playerOneDeckControl = new FormControl();

    players: Player[] = [];
    decks: Deck[] = [];

    constructor(
        private playerService: PlayersService
    ) { 
        this.players = playerService.getPlayers();
    }

    ngOnInit(): void {

        // Add some dummy data
        this.players = [...this.players, { name: "Alec" }];
        this.decks = [...this.decks, { name: "Vizier", description: "A top meta deck in modern", colors: [ "White", "Green" ]}];
    }

    displayPlayerFunction(player: Player): string {
        return player && player.name ? player.name : '';
    }

    displayDeckFunction(deck: Deck): string {
        return deck && deck.name ? deck.name : '';
    }
}
