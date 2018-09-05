import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SportTypeStatisticsPageComponent} from './sport-type-statistics-page.component';

describe('SportTypeStatisticsPageComponent', () => {
  let component: SportTypeStatisticsPageComponent;
  let fixture: ComponentFixture<SportTypeStatisticsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SportTypeStatisticsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTypeStatisticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
