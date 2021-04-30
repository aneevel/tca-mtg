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

    playerOneForm = this.formBuilder.group ({
        playerNameControl: ['', Validators.required],
        deckNameControl: ['', Validators.required],
        redControl: null,
        blueControl: null,
        greenControl: null,
        blackControl: null,
        whiteControl: null,
    });

    playerTwoForm = this.formBuilder.group({
        playerNameControl: ['', Validators.required],
        deckNameControl: ['', Validators.required],
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
