import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonEnableSignUpComponent} from './person-enable-sign-up.component';

describe('PersonEnableSignUpComponent', () => {
  let component: PersonEnableSignUpComponent;
  let fixture: ComponentFixture<PersonEnableSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonEnableSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEnableSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
