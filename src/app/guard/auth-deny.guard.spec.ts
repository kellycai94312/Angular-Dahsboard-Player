import { TestBed, async, inject } from '@angular/core/testing';

import { AuthDenyGuard } from './auth-deny.guard';

describe('AuthDenyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDenyGuard]
    });
  });

  it('should ...', inject([AuthDenyGuard], (guard: AuthDenyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
