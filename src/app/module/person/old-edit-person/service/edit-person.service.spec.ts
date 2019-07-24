import {TestBed} from '@angular/core/testing';

import {EditPersonService} from './edit-person.service';

describe('EditPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditPersonService = TestBed.get(EditPersonService);
    expect(service).toBeTruthy();
  });
});
