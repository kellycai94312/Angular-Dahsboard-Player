import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonReportsComponent} from './person-reports.component';

describe('PersonReportsComponent', () => {
  let component: PersonReportsComponent;
  let fixture: ComponentFixture<PersonReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonReportsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
