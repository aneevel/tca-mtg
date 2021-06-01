import { Injectable } from '@angular/core';

const mtgAPI = require('mtgsdk');

@Injectable({
  providedIn: 'root'
})
export class ApiLayerService {

  constructor() { }

  getCardByID(id) {
    mtgAPI.card.find(id)
      .then(result => {
        console.log(result);
        return result;
      });
  }
}
