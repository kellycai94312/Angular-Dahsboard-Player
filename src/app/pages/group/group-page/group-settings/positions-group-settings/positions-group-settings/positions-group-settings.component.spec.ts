import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PositionsGroupSettingsComponent} from './positions-group-settings.component';

describe('PositionsGroupSettingsComponent', () => {
  let component: PositionsGroupSettingsComponent;
  let fixture: ComponentFixture<PositionsGroupSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PositionsGroupSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsGroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
