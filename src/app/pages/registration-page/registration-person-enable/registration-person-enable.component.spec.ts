import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationPersonEnableComponent} from './registration-person-enable.component';

describe('RegistrationPersonEnableComponent', () => {
  let component: RegistrationPersonEnableComponent;
  let fixture: ComponentFixture<RegistrationPersonEnableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPersonEnableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationPersonEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
