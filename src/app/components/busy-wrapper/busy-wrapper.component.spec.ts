import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyWrapperComponent } from './busy-wrapper.component';

describe('BusyWrapperComponent', () => {
  let component: BusyWrapperComponent;
  let fixture: ComponentFixture<BusyWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
