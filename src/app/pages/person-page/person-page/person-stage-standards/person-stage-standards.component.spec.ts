import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonStageStandardsComponent} from './person-stage-standards.component';

describe('PersonStageStandardsComponent', () => {
  let component: PersonStageStandardsComponent;
  let fixture: ComponentFixture<PersonStageStandardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonStageStandardsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonStageStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
