import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

    playerOneForm: FormGroup;
    playerTwoForm: FormGroup;

    players: Player[] = [];
    decks: Deck[] = [];

    validPlayerOne: boolean = false;
    addDeckOne: boolean = false;
    addDeckOneRed: boolean = false;
    addDeckOneBlue: boolean = false;
    addDeckOneGreen: boolean = false;
    addDeckOneBlack: boolean = false;
    addDeckOneWhite: boolean = false;

    validPlayerTwo: boolean = false;
    addDeckTwo: boolean = false;
    addDeckTwoRed: boolean = false;
    addDeckTwoBlue: boolean = false;
    addDeckTwoGreen: boolean = false;
    addDeckTwoBlack: boolean = false;
    addDeckTwoWhite: boolean = false;

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

    ngOnInit(): void {

        this.playerOneForm = this.formBuilder.group ({
            playerNameControl: ['', Validators.required],
            deckNameControl: ['', Validators.required],
            redControl: null,
            blueControl: null,
            greenControl: null,
            blackControl: null,
            whiteControl: null,
            deckDescriptionControl: [''],
        });
    
        this.playerTwoForm = this.formBuilder.group({
            playerNameControl: ['', Validators.required],
            deckNameControl: ['', Validators.required],
            redControl: null,
            blueControl: null,
            greenControl: null,
            blackControl: null,
            whiteControl: null,
            deckDescriptionControl: [''],
        });
    }

    onSubmit() {

        // Persist player one info
        if (this.playerService.getPlayer(this.playerOneForm.controls.playerNameControl.value) === null) 
            this.playerService.addPlayer(this.playerOneForm.controls.playerNameControl.value);
        this.currentGameService.addPlayer(this.playerOneForm.controls.playerNameControl.value);

        if (this.addDeckOne) {
            this.deckService.addDeck(this.playerOneForm.controls.deckNameControl.value, 
                [...this.getColors(0)], 
                this.playerOneForm.controls.deckDescriptionControl.value);
        }
        this.currentGameService.addDeck(this.deckService.getDeck(this.playerOneForm.controls.deckNameControl.value));

        // Persist player two info
        if (this.playerService.getPlayer(this.playerTwoForm.controls.playerNameControl.value) === null)
            this.playerService.addPlayer(this.playerTwoForm.controls.playerNameControl.value);
        this.currentGameService.addPlayer(this.playerTwoForm.controls.playerNameControl.value);

        if (this.addDeckTwo) {
            this.deckService.addDeck(this.playerTwoForm.controls.deckNameControl.value,
                [...this.getColors(1)],
                this.playerTwoForm.controls.deckDescriptionControl.value);
        }
        this.currentGameService.addDeck(this.deckService.getDeck(this.playerTwoForm.controls.deckNameControl.value));

        // Move to game-play screen
        this.router.navigate(['/game-play']);
    }

    getColors(player): string[] {
        
        let colors = [];
        if (player === 0) {
            if (this.addDeckOneBlack) {
                colors.push("black");
            }
            if (this.addDeckOneBlue) {
                colors.push("blue");
            }
            if (this.addDeckOneGreen) {
                colors.push("green");
            }
            if (this.addDeckOneRed) {
                colors.push("red");
            }
            if (this.addDeckOneWhite) {
                colors.push("white");
            }
        } else if (player === 1) {
            if (this.addDeckTwoBlack) {
                colors.push("black");
            }
            if (this.addDeckTwoBlue) {
                colors.push("blue");
            }
            if (this.addDeckTwoGreen) {
                colors.push("green");
            }
            if (this.addDeckTwoRed) {
                colors.push("red");
            }
            if (this.addDeckTwoWhite) {
                colors.push("white");
            }
        }
        
        return colors;
    }

    checkDeck(deckName: string, playerIndex) {
        if (playerIndex === 0) {
            if (!this.deckNameExists(deckName)) {
                this.addDeckOne = true;
            } else {
                this.addDeckOne = false;
            }
        } else {
            if (!this.deckNameExists(deckName)) {
                this.addDeckTwo = true;
            } else {
                this.addDeckTwo = false;
            }
        }
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
