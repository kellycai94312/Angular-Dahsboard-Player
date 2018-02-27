import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHistoryComponent } from './chart-history.component';

describe('ChartHistoryComponent', () => {
  let component: ChartHistoryComponent;
  let fixture: ComponentFixture<ChartHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartHistoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
