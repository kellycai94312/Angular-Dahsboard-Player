import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VacanciesGroupSettingsComponent} from './vacancies-group-settings.component';

describe('VacanciesGroupSettingsComponent', () => {
  let component: VacanciesGroupSettingsComponent;
  let fixture: ComponentFixture<VacanciesGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VacanciesGroupSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
