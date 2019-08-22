import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicGroupSettingsComponent} from './basic-group-settings.component';

describe('BasicGroupSettingsComponent', () => {
  let component: BasicGroupSettingsComponent;
  let fixture: ComponentFixture<BasicGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicGroupSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
