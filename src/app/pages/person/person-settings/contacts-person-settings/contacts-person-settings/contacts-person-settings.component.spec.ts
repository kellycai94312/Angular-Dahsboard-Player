import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactsPersonSettingsComponent} from './contacts-person-settings.component';

describe('ContactsPersonSettingsComponent', () => {
  let component: ContactsPersonSettingsComponent;
  let fixture: ComponentFixture<ContactsPersonSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsPersonSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsPersonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
