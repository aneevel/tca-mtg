import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolInjecterService {

  constructor() { }

  determineSymbolImage(symbol: string): string {

    symbol = symbol.trim();
    symbol = symbol.replaceAll("/", "");
    symbol = symbol.replaceAll("{", "");
    symbol = symbol.replaceAll("}", "");
    symbol = symbol.concat(".png");
    return symbol;
  }
}
