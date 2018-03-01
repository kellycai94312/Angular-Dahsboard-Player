import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNoteComponent } from './agent-note.component';

describe('AgentNoteComponent', () => {
  let component: AgentNoteComponent;
  let fixture: ComponentFixture<AgentNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
