import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequisitesGroupSettingsComponent} from './requisites-group-settings.component';

describe('RequisitesGroupSettingsComponent', () => {
  let component: RequisitesGroupSettingsComponent;
  let fixture: ComponentFixture<RequisitesGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequisitesGroupSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitesGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
