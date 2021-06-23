import { Injectable } from '@angular/core';
import { SymbolAnalyzerService } from './symbol-analyzer.service';
import { SymbolInjecterService } from './symbol-injecter.service';

@Injectable({
  providedIn: 'root'
})
export class SymbolReplacerService {

  constructor(private symbolAnalyzerService: SymbolAnalyzerService,
      private symbolInjecterService: SymbolInjecterService) { }

  replaceSymbols(textToReplace: string): HTMLElement {

    // Find all instances of symbols in text
    let symbolsFound = this.symbolAnalyzerService.getSymbolsInString(textToReplace);

    // Return early to save errors if no symbols found
    if (!symbolsFound) {

      let textElement = document.createElement('p');
      textElement.innerHTML = textToReplace;
      return textElement;
    }

    console.log(symbolsFound);
    let replacedText = textToReplace;
    symbolsFound.forEach(symbol =>  {
      let symbolImageName = this.symbolInjecterService.determineSymbolImage(symbol);
      replacedText = replacedText.replaceAll(symbol, `<img class="symbol" src="assets/${symbolImageName}"/>`);
    })

    let textElement = document.createElement('p');
    console.log(replacedText);
    textElement.innerHTML = replacedText;

    return textElement;

  }
}
