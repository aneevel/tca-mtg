import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Deck } from '../deck';
import { DecksService } from '../decks.service';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { CurrentGameService } from '../current-game.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})

export class GameSetupComponent implements OnInit {

    currentGameService: CurrentGameService;

    deckOneAddRed = false;
    deckOneAddBlue = false;
    deckOneAddBlack = false;
    deckOneAddGreen = false;
    deckOneAddWhite = false;

    deckTwoAddRed = false;
    deckTwoAddBlue = false;
    deckTwoAddBlack = false;
    deckTwoAddGreen = false;
    deckTwoAddWhite = false;

    playersForm = this.formBuilder.group ({
        playerOneNameControl: ['', Validators.required],
        playerOneDeckControl: ['', Validators.required],
        playerOneDeckColors: ['White'],
        playerOneDeckDescription: ['An ordinary, boring deck.'],
        playerTwoNameControl: ['', Validators.required],
        playerTwoDeckControl: ['', Validators.required]
    });

    players: Player[] = [];
    decks: Deck[] = [];

    constructor(
        private playerService: PlayersService,
        private deckService: DecksService,
        private storageService: StorageService,
        private gameService: CurrentGameService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { 
        this.players = playerService.getPlayers();
        this.decks = deckService.getDecks();
        this.currentGameService = gameService;
    }

    ngOnInit(): void {}

    onSubmit() {
        
        // Add a new player if one wasn't found
        if (!this.playerNameExists(this.playersForm.controls.playerOneNameControl.value)) {
            this.playerService.addPlayer(this.playersForm.controls.playerOneNameControl.value);
        }

        if (!this.playerNameExists(this.playersForm.controls.playerTwoNameControl.value)) {
            this.playerService.addPlayer(this.playersForm.controls.playerTwoNameControl.value);
        }

        // Set player names as active players
        this.currentGameService.addPlayer((this.playersForm.controls.playerOneNameControl.value));
        this.currentGameService.addPlayer((this.playersForm.controls.playerTwoNameControl.value));

        // Add a new deck if one wasn't found
        if (!this.deckNameExists(this.playersForm.controls.playerOneDeckControl.value)) {
            this.deckService.addDeck(this.playersForm.controls.playerOneDeckControl.value);
        }
        if (!this.deckNameExists(this.playersForm.controls.playerTwoDeckControl.value)) {
            this.deckService.addDeck(this.playersForm.controls.playerTwoDeckControl.value);
        }

        // Set decks as active decks
        this.currentGameService.addDeck((this.playersForm.controls.playerOneDeckControl.value));
        this.currentGameService.addDeck((this.playersForm.controls.playerTwoDeckControl.value));

        // Move to game-play screen
        this.router.navigate(['/game-play']);
    }

    playerNameExists(playerName: string): boolean {
        return this.playerService.playerExists(playerName);
    }

    deckNameExists(deckName: string): boolean {
        return this.deckService.deckExists(deckName);
    }

    displayPlayerFunction(player: Player): string {
        return player && player.name ? player.name : '';
    }

    displayDeckFunction(deck: Deck): string {
        return deck && deck.name ? deck.name : '';
    }
}
