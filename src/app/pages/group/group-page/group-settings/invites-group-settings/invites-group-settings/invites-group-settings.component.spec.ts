import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InvitesGroupSettingsComponent} from './invites-group-settings.component';

describe('InvitesGroupSettingsComponent', () => {
  let component: InvitesGroupSettingsComponent;
  let fixture: ComponentFixture<InvitesGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvitesGroupSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
