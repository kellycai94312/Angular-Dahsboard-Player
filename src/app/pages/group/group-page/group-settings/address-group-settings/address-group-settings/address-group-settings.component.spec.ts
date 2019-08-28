import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddressGroupSettingsComponent} from './address-group-settings.component';

describe('AddressGroupSettingsComponent', () => {
  let component: AddressGroupSettingsComponent;
  let fixture: ComponentFixture<AddressGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressGroupSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
