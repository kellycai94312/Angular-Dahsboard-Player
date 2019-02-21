import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSettingsPageComponent} from './person-settings-page.component';

describe('PersonSettingsPageComponent', () => {
  let component: PersonSettingsPageComponent;
  let fixture: ComponentFixture<PersonSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonSettingsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
