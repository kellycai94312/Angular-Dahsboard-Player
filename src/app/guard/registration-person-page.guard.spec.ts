import { TestBed, async, inject } from '@angular/core/testing';

import { RegistrationPersonPageGuard } from './registration-person-page.guard';

describe('RegistrationPersonPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationPersonPageGuard]
    });
  });

  it('should ...', inject([RegistrationPersonPageGuard], (guard: RegistrationPersonPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
