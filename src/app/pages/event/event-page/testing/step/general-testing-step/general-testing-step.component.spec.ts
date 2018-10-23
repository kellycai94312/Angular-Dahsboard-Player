import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralTestingStepComponent} from './general-testing-step.component';

describe('GeneralTestingStepComponent', () => {
  let component: GeneralTestingStepComponent;
  let fixture: ComponentFixture<GeneralTestingStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralTestingStepComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTestingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
