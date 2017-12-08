import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPersonPageComponent } from './registration-person-page.component';

describe('RegistrationPersonPageComponent', () => {
  let component: RegistrationPersonPageComponent;
  let fixture: ComponentFixture<RegistrationPersonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPersonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
