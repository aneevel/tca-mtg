import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { exception } from 'console';
import * as Scry from "scryfall-sdk";

@Injectable({
  providedIn: 'root'
})
export class ApiLayerService {

  constructor() { }

  getCardById(id) {
    Scry.Cards.byId(id)
      .then(result => {
        if (result.object === "card") {
          return result;
        } else {
          throw new Error(`Unable to find card with id ${id}`);
        }
      })
      .catch((error) =>
        console.error(error)
      );
  }

  getCardByName(name) {
    Scry.Cards.byName(name)
      .then(result => {
        if (result.object === "card") {
          return result;
        } else {
          throw new Error(`Unable to find card with name ${name}`);
        }
      })
      .catch((error) => 
        console.error(error)
      );
  }

  getRandomCard() {
    return Scry.Cards.random();
  }
}
