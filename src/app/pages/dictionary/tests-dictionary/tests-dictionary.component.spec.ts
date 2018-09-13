import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestsDictionaryComponent} from './tests-dictionary.component';

describe('TestsDictionaryComponent', () => {
  let component: TestsDictionaryComponent;
  let fixture: ComponentFixture<TestsDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestsDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
