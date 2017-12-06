import { TestBed, inject } from '@angular/core/testing';

import { ParticipantRestApiService } from './participant-rest-api.service';

describe('ParticipantRestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantRestApiService]
    });
  });

  it('should be created', inject([ParticipantRestApiService], (service: ParticipantRestApiService) => {
    expect(service).toBeTruthy();
  }));
});
