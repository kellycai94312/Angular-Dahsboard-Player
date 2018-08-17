import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalExaminationsComponent } from './medical-examinations.component';

describe('MedicalExaminationsComponent', () => {
  let component: MedicalExaminationsComponent;
  let fixture: ComponentFixture<MedicalExaminationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalExaminationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalExaminationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
