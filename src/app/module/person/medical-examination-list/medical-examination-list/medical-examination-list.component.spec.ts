import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MedicalExaminationListComponent} from './medical-examination-list.component';

describe('MedicalExaminationListComponent', () => {
  let component: MedicalExaminationListComponent;
  let fixture: ComponentFixture<MedicalExaminationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalExaminationListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalExaminationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
