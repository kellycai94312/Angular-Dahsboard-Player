import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventLoadsComponent} from './event-loads.component';

describe('EventLoadsComponent', () => {
  let component: EventLoadsComponent;
  let fixture: ComponentFixture<EventLoadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventLoadsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
