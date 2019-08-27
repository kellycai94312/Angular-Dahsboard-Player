import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicPersonSettingsComponent} from './basic-person-settings.component';

describe('BasicPersonSettingsComponent', () => {
  let component: BasicPersonSettingsComponent;
  let fixture: ComponentFixture<BasicPersonSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicPersonSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPersonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
