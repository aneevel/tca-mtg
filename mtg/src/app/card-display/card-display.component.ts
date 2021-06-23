import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
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
  private renderer: Renderer2;

  constructor(private apiLayer: ApiLayerService,
      private symbolReplacer: SymbolReplacerService,
      private rendererFactory: RendererFactory2) { 
    this.apiLayer.getRandomCard()
      .then(result => {
        this.currentCard = result;
        console.log(this.currentCard);

        this.renderer = rendererFactory.createRenderer(null, null);

        this.oracleText = this.symbolReplacer.replaceSymbols(this.currentCard.oracle_text);
        this.injectReplacedTexts();

      });
  }

  ngOnInit(): void {
  }

  injectReplacedTexts() {
    this.renderer.appendChild(document.getElementById('card-oracle-text'), this.oracleText);
  }

}
