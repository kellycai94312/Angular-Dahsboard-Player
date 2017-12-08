import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationVerificationPageComponent } from './registration-verification-page.component';

describe('RegistrationVerificationPageComponent', () => {
  let component: RegistrationVerificationPageComponent;
  let fixture: ComponentFixture<RegistrationVerificationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationVerificationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
