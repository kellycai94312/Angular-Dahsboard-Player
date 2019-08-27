import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CareerPersonSettingsComponent} from './career-person-settings.component';

describe('CareerPersonSettingsComponent', () => {
  let component: CareerPersonSettingsComponent;
  let fixture: ComponentFixture<CareerPersonSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CareerPersonSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerPersonSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
