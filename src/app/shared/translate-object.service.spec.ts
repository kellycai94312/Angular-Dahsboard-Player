import { TestBed, inject } from '@angular/core/testing';

import { TranslateObjectService } from './translate-object.service';

describe('TranslateObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateObjectService]
    });
  });

  it('should be created', inject([TranslateObjectService], (service: TranslateObjectService) => {
    expect(service).toBeTruthy();
  }));
});
