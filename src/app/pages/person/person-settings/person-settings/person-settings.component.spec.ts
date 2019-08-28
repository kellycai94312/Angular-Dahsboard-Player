import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSettingsComponent} from './person-settings.component';

describe('PersonSettingsComponent', () => {
  let component: PersonSettingsComponent;
  let fixture: ComponentFixture<PersonSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
