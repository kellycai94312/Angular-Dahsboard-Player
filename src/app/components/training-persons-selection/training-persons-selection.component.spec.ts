import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPersonsSelectionComponent } from './training-persons-selection.component';

describe('TrainingPersonsSelectionComponent', () => {
  let component: TrainingPersonsSelectionComponent;
  let fixture: ComponentFixture<TrainingPersonsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPersonsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPersonsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
