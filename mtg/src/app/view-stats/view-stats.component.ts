import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { StorageService } from '../storage.service';
import { ResultsViewCreatorService } from '../results-view-creator.service';
@Component({
  selector: 'app-view-stats',
  templateUrl: './view-stats.component.html',
  styleUrls: ['./view-stats.component.css']
})
export class ViewStatsComponent implements OnInit {

  resultViews = [];
  private renderer: Renderer2;

  constructor(
      private resultsViewCreatorService: ResultsViewCreatorService,
      private storageService: StorageService,
      rendererFactory: RendererFactory2) { 
    this.renderer = rendererFactory.createRenderer(null, null);
    this.resultViews = resultsViewCreatorService.generateResultViews(this.storageService.getResults(), 100);
  }

  ngOnInit(): void {
    this.resultViews.forEach(resultView => this.renderer.appendChild(document.getElementById('game-results-list'), resultView));
  }

}
