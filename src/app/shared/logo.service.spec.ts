import { TestBed, inject } from '@angular/core/testing';

import { LogoService } from './logo.service';

describe('LogoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoService]
    });
  });

  it('should be created', inject([LogoService], (service: LogoService) => {
    expect(service).toBeTruthy();
  }));
});
