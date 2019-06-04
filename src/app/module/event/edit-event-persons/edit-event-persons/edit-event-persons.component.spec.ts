import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditEventPersonsComponent} from './edit-event-persons.component';

describe('EditEventPersonsComponent', () => {
  let component: EditEventPersonsComponent<any>;
  let fixture: ComponentFixture<EditEventPersonsComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditEventPersonsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
