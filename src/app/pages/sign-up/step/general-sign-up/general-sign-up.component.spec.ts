import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeneralSignUpComponent} from './general-sign-up.component';

describe('GeneralSignUpComponent', () => {
  let component: GeneralSignUpComponent;
  let fixture: ComponentFixture<GeneralSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
