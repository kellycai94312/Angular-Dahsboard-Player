import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxBusyIndicatorComponent} from './ngx-busy-indicator.component';

describe('NgxBusyIndicatorComponent', () => {
  let component: NgxBusyIndicatorComponent;
  let fixture: ComponentFixture<NgxBusyIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxBusyIndicatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBusyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
