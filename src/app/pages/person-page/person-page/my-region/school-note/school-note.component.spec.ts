import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolNoteComponent } from './school-note.component';

describe('SchoolNoteComponent', () => {
  let component: SchoolNoteComponent;
  let fixture: ComponentFixture<SchoolNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
