import { TestBed, inject } from '@angular/core/testing';

import { MeasureHistoryService } from './measure-history.service';

describe('MeasureHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasureHistoryService]
    });
  });

  it('should be created', inject([MeasureHistoryService], (service: MeasureHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
