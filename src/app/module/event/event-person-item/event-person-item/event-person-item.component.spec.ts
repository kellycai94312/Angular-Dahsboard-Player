import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EventPersonItemComponent} from './event-person-item.component';

describe('EventPersonItemComponent', () => {
  let component: EventPersonItemComponent;
  let fixture: ComponentFixture<EventPersonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventPersonItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPersonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
