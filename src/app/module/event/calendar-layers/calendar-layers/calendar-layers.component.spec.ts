import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CalendarLayersComponent} from './calendar-layers.component';

describe('CalendarLayersComponent', () => {
  let component: CalendarLayersComponent;
  let fixture: ComponentFixture<CalendarLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarLayersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
