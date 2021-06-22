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
    if (!symbolsFound)
      return;

    console.log(symbolsFound);
    let replacedText = textToReplace;
    symbolsFound.forEach(symbol =>  {
      let symbolImageName = this.symbolInjecterService.determineSymbolImage(symbol);
      replacedText = replacedText.replaceAll(symbol, `<img src="${symbolImageName}"/>`);
    })

    console.log(replacedText);

    let oracleDiv = document.createElement('div');

    return oracleDiv;

  }
}
