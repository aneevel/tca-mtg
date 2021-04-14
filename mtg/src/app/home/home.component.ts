import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { StorageService } from '../storage.service';
import { ResultsViewCreatorService } from '../results-view-creator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resultViews = [];
  private renderer: Renderer2;

  constructor(
    private resultsViewCreatorService: ResultsViewCreatorService,
    private storageService: StorageService,
    rendererFactory: RendererFactory2
  ) { 
    this.renderer = rendererFactory.createRenderer(null, null);
    this.resultViews = resultsViewCreatorService.generateResultViews(this.storageService.getResults(), 5);
  }

  ngOnInit(): void {
    this.resultViews.forEach(resultView => this.renderer.appendChild(document.getElementById('recent-games-container'), resultView)); 
  }

}
