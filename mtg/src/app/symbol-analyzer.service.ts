import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolAnalyzerService {

  constructor() { }

  getSymbolsInString(text: string) : string[] {

    // Regex for capturing any symbol
    const regex = /{\S(\/\S)?}/g;

    return text.match(regex);
  }
}
