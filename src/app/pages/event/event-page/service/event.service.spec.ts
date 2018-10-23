import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';

describe('EventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventService<BaseTraining> = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });
});
