import { Injectable } from '@angular/core';

import { Renderer2, RendererFactory2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManaCreatorService {

  private renderer: Renderer2;
  private manaCount: Number;

  constructor(
    rendererFactory: RendererFactory2)
  {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.manaCount = 0;
  }

  buildMana(manaType: string): HTMLElement {
    
    // Create mana button
    const manaButton = this.renderer.createElement('button');
    this.renderer.setProperty(manaButton, "id", `mana${this.manaCount}`);
    this.renderer.addClass(manaButton, "mana-button"); 
    this.renderer.addClass(manaButton, `${manaType}-mana`);
    this.renderer.listen(manaButton, "click", this.useMana(`mana${this.manaCount}`));

    return manaButton;

  }

  useMana(manaName): any {
    
  }
}
