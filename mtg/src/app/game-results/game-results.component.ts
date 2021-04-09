import { Component, OnInit } from '@angular/core';
import { CurrentGameService } from '../current-game.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {



  constructor(public gameService: CurrentGameService) { }

  ngOnInit(): void {
  }

}
