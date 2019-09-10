import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PollMessageContentItemComponent} from './poll-message-content-item.component';

describe('PollMessageContentItemComponent', () => {
  let component: PollMessageContentItemComponent;
  let fixture: ComponentFixture<PollMessageContentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PollMessageContentItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollMessageContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
