import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Deck } from '../deck';
import { DecksService } from '../decks.service';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { CurrentGameService } from '../current-game.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})

export class GameSetupComponent implements OnInit {

    playersForm = this.formBuilder.group ({
        playerOneNameControl: ['', Validators.required],
        playerOneDeckControl: ['', Validators.required],
        playerTwoNameControl: ['', Validators.required],
        playerTwoDeckControl: ['', Validators.required]
    });

    players: Player[] = [];
    decks: Deck[] = [];

    constructor(
        private playerService: PlayersService,
        private deckService: DecksService,
        private gameService: CurrentGameService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { 
        this.players = playerService.getPlayers();
        this.decks = deckService.getDecks();
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
        
        // Add a new player if one wasn't found
        if (!this.playerNameExists(this.playersForm.controls.playerOneNameControl.value)) {
            this.playerService.addPlayer({ name: this.playersForm.controls.playerOneNameControl.value });
        }

        if (!this.playerNameExists(this.playersForm.controls.playerTwoNameControl.value)) {
            this.playerService.addPlayer({ name: this.playersForm.controls.playerTwoNameControl.value });
        }

        // Set player names as active players
        this.gameService.addPlayer(this.playerService.getPlayer(this.playersForm.controls.playerOneNameControl.value));
        this.gameService.addPlayer(this.playerService.getPlayer(this.playersForm.controls.playerTwoNameControl.value));

        // Add a new deck if one wasn't found
        if (!this.deckNameExists(this.playersForm.controls.playerOneDeckControl.value)) {
            this.deckService.addDeck({ name: this.playersForm.controls.playerOneDeckControl.value, description: "", colors: []});
        }
        if (!this.deckNameExists(this.playersForm.controls.playerTwoDeckControl.value)) {
            this.deckService.addDeck({ name: this.playersForm.controls.playerTwoDeckControl.value, description: "", colors: []});
        }

        // Set decks as active decks
        this.gameService.addDeck(this.deckService.getDeck(this.playersForm.controls.playerOneDeckControl.value));
        this.gameService.addDeck(this.deckService.getDeck(this.playersForm.controls.playerTwoDeckControl.value));

        // Move to game-play screen
        this.router.navigate(['/game-play']);
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
