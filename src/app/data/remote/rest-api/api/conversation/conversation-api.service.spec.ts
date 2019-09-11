import {TestBed} from '@angular/core/testing';

import {ConversationApiService} from './conversation-api.service';

describe('ConversationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversationApiService = TestBed.get(ConversationApiService);
    expect(service).toBeTruthy();
  });
});
