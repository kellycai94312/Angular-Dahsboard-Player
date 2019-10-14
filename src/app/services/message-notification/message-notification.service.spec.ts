import { TestBed } from '@angular/core/testing';

import { MessageNotificationService } from './message-notification.service';

describe('MessageNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageNotificationService = TestBed.get(MessageNotificationService);
    expect(service).toBeTruthy();
  });
});
