import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseMeasureItemComponent } from './exercise-measure-item.component';

describe('ExerciseMeasureItemComponent', () => {
  let component: ExerciseMeasureItemComponent;
  let fixture: ComponentFixture<ExerciseMeasureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseMeasureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseMeasureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
