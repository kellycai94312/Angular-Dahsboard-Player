import { TestBed, inject } from '@angular/core/testing';

import { EventReportService } from './event-report.service';

describe('EventReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventReportService]
    });
  });

  it('should be created', inject([EventReportService], (service: EventReportService) => {
    expect(service).toBeTruthy();
  }));
});
