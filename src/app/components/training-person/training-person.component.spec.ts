import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPersonComponent } from './training-person.component';

describe('TrainingPersonComponent', () => {
  let component: TrainingPersonComponent;
  let fixture: ComponentFixture<TrainingPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
