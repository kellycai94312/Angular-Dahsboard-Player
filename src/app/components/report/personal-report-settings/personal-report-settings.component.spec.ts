import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonalReportSettingsComponent} from './personal-report-settings.component';

describe('PersonalReportSettingsComponent', () => {
  let component: PersonalReportSettingsComponent;
  let fixture: ComponentFixture<PersonalReportSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalReportSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalReportSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
