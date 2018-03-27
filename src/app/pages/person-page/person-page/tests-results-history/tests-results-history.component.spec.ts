import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsResultsHistoryComponent } from './tests-results-history.component';

describe('TestsResultsHistoryComponent', () => {
  let component: TestsResultsHistoryComponent;
  let fixture: ComponentFixture<TestsResultsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestsResultsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsResultsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
