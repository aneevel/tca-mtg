import { TestBed } from '@angular/core/testing';

import { PlayerViewCreatorService } from './player-view-creator.service';

describe('PlayerViewCreatorService', () => {
  let service: PlayerViewCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerViewCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
