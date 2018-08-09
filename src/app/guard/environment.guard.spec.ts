import {inject, TestBed} from '@angular/core/testing';

import {EnvironmentGuard} from './environment.guard';

describe('EnvironmentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentGuard]
    });
  });

  it('should ...', inject([EnvironmentGuard], (guard: EnvironmentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
