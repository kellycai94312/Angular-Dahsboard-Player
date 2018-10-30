import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditMedicalExaminationComponent} from './edit-medical-examination.component';

describe('EditMedicalExaminationComponent', () => {
  let component: EditMedicalExaminationComponent;
  let fixture: ComponentFixture<EditMedicalExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditMedicalExaminationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
