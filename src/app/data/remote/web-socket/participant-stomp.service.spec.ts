import { TestBed, inject } from '@angular/core/testing';

import { ParticipantStompService } from './participant-stomp.service';

describe('ParticipantStompService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantStompService]
    });
  });

  it('should be created', inject([ParticipantStompService], (service: ParticipantStompService) => {
    expect(service).toBeTruthy();
  }));
});
