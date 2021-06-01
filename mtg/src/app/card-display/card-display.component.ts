import { Component, OnInit } from '@angular/core';
import { ApiLayerService } from '../api-layer.service';
import * as Scry from "scryfall-sdk";

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {

  currentCard;

  constructor(private apiLayer: ApiLayerService) { 
    this.apiLayer.getRandomCard()
      .then(result => {
        this.currentCard = result;
      });
  }

  ngOnInit(): void {
  }

}
