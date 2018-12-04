import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSignUpComponent} from './person-sign-up.component';

describe('PersonSignUpComponent', () => {
  let component: PersonSignUpComponent;
  let fixture: ComponentFixture<PersonSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
