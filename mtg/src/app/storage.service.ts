import { Injectable } from '@angular/core';

import { Player } from './player';
import { Deck } from './deck';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  localStorage: Storage;

  constructor() { 
    this.localStorage = window.localStorage;
  }

  set(key: string, value: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, value);

      return true;
    }

    return false;
  }

  add(key: string, value: string): boolean {
    if (this.get(key) != null) {
      console.log("Adding value where key already existed!");
    } else {
      console.log("Adding value for previously non-existent key!");
    }
    if (this.isLocalStorageSupported) {
        this.set(key, value);    
    }
    return false;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return JSON.parse(this.localStorage.getItem(key));
    }

    return null;
  }

  getUniquePlayers(): Player[] {
    return [];
  }

  getUniqueDecks(): Deck[] {
    return [];
  }

  remove(key: string) {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);

      return true;
    }

    return false;
  }

  clear() {
    localStorage.clear();
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
