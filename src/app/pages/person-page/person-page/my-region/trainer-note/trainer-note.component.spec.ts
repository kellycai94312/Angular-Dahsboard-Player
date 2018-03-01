import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerNoteComponent } from './trainer-note.component';

describe('TrainerNoteComponent', () => {
  let component: TrainerNoteComponent;
  let fixture: ComponentFixture<TrainerNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
