import {TestBed} from '@angular/core/testing';

import {NewsWindowService} from './news-window.service';

describe('NewsWindowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsWindowService = TestBed.get(NewsWindowService);
    expect(service).toBeTruthy();
  });
});
