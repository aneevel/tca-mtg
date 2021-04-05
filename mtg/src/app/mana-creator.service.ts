import { Injectable } from '@angular/core';

import { Renderer2, RendererFactory2, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManaCreatorService {

  private renderer: Renderer2;
  private manaCount: number;

  constructor(
    rendererFactory: RendererFactory2)
  {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.manaCount = 0;
  }

  buildMana(manaType: string): HTMLElement {
    
    // Create mana button
    const manaButton = this.renderer.createElement('button');
    const currentManaCount = this.manaCount;
    this.renderer.setProperty(manaButton, "id", `mana${currentManaCount}`);
    this.renderer.addClass(manaButton, "mana-button"); 
    this.renderer.addClass(manaButton, `${manaType}-mana`);
    this.renderer.listen(manaButton, "click", (event) => {
      this.useMana(`mana${currentManaCount}`);
    });

    this.manaCount = this.manaCount + 1;
    return manaButton;

  }

  useMana(manaName): any {
    console.log(`Mana use for element ${manaName}`);
    const manaButton = document.getElementById(`${manaName}`);
    this.renderer.addClass(manaButton, 'used-mana');
  }
}
