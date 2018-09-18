import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExercisesDictionaryComponent} from './exercises-dictionary.component';

describe('ExercisesDictionaryComponent', () => {
  let component: ExercisesDictionaryComponent;
  let fixture: ComponentFixture<ExercisesDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExercisesDictionaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
