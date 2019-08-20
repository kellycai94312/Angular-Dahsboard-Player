import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonHeadComponent} from './person-head.component';

describe('PersonHeadComponent', () => {
  let component: PersonHeadComponent;
  let fixture: ComponentFixture<PersonHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonHeadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
