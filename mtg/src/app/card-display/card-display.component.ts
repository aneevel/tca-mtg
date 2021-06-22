import { Component, OnInit } from '@angular/core';
import { ApiLayerService } from '../api-layer.service';
import { SymbolReplacerService } from '../symbol-replacer.service';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {

  currentCard;
  oracleText: HTMLElement;

  constructor(private apiLayer: ApiLayerService,
      private symbolReplacer: SymbolReplacerService) { 
    this.apiLayer.getRandomCard()
      .then(result => {
        this.currentCard = result;
        console.log(this.currentCard);

        this.oracleText = this.symbolReplacer.replaceSymbols(this.currentCard.oracle_text);
        this.injectReplacedTexts();

      });
  }

  ngOnInit(): void {
  }

  injectReplacedTexts() {

  }

}
