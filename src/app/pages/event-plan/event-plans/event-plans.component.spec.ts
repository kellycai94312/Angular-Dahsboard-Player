import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventPlansComponent} from './event-plans.component';

describe('EventPlansComponent', () => {
  let component: EventPlansComponent;
  let fixture: ComponentFixture<EventPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlansComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
