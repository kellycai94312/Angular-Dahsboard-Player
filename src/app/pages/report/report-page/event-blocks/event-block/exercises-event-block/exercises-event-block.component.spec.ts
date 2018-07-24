import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesEventBlockComponent } from './exercises-event-block.component';

describe('ExercisesEventBlockComponent', () => {
  let component: ExercisesEventBlockComponent;
  let fixture: ComponentFixture<ExercisesEventBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExercisesEventBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesEventBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
