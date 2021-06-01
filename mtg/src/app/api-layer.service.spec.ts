import { TestBed } from '@angular/core/testing';

import { ApiLayerService } from './api-layer.service';

describe('ApiLayerService', () => {
  let service: ApiLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
