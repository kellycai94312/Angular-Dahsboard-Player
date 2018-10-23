import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestingStepsManagerComponent} from './testing-steps-manager.component';

describe('TestingStepsManagerComponent', () => {
  let component: TestingStepsManagerComponent;
  let fixture: ComponentFixture<TestingStepsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestingStepsManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingStepsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
