import { TestBed, inject } from '@angular/core/testing';

import { MyRegionService } from './my-region.service';

describe('MyRegionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyRegionService]
    });
  });

  it('should be created', inject([MyRegionService], (service: MyRegionService) => {
    expect(service).toBeTruthy();
  }));
});
