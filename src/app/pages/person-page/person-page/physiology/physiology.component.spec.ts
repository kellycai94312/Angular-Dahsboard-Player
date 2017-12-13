import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysiologyComponent } from './physiology.component';

describe('PhysiologyComponent', () => {
  let component: PhysiologyComponent;
  let fixture: ComponentFixture<PhysiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
