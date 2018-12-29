import {TestBed} from '@angular/core/testing';

import {ConversationModalService} from './conversation-modal.service';

describe('ConversationModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConversationModalService = TestBed.get(ConversationModalService);
    expect(service).toBeTruthy();
  });
});
