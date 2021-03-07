import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Deck } from '../deck';
import { Player } from '../player';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})

export class GameSetupComponent implements OnInit {

    playersForm = this.formBuilder.group ({
        nameControl: ['', Validators.required],
        deckControl: ['', Validators.required],
    });

    players: Player[] = [];
    decks: Deck[] = [];

    constructor(
        private playerService: PlayersService,
        private formBuilder: FormBuilder
    ) { 
        this.players = playerService.getPlayers();
    }

    ngOnInit(): void {

        // Add some dummy data
        this.players = [...this.players, { name: "Alec" }, { name: "Alison"}, { name: "Ryan"}];
        this.decks = [...this.decks, 
            {   name: "Vizier", description: "A top meta deck in modern", colors: [ "White", "Green" ]},
            {   name: "Burn", description: "Get ready to feel the heat, baby", colors: [ "Red"]},
            {   name: "Land Destruction", description: "When you don't want your opponent to even play the game!", colors: [ "Red", "Blue"]}
        ];
        
    }

    onSubmit() {
        if (this.playerNameExists(this.playersForm.controls.nameControl.value)) {
            console.warn("Player Name Exists");
        } else {
            console.warn("Player Name does NOT Exist");
        }

        if (this.deckNameExists(this.playersForm.controls.deckControl.value)) {
            console.warn("Deck exists!");
        } else {
            console.warn("Deck does NOT Exist");
        }
    }

    playerNameExists(playerName: string): boolean {
        return (this.players.some(x => x.name === playerName));
    }

    deckNameExists(deckName: string): boolean {
        return (this.decks.some(x => x.name === deckName));
    }

    displayPlayerFunction(player: Player): string {
        return player && player.name ? player.name : '';
    }

    displayDeckFunction(deck: Deck): string {
        return deck && deck.name ? deck.name : '';
    }
}
