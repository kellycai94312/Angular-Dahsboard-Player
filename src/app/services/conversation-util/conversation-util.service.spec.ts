import {TestBed} from '@angular/core/testing';

import {ConversationUtilService} from './conversation-util.service';

describe('ConversationUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversationUtilService = TestBed.get(ConversationUtilService);
    expect(service).toBeTruthy();
  });
});
