import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupReportComponent} from './subgroup-report.component';

describe('SubgroupReportComponent', () => {
  let component: SubgroupReportComponent;
  let fixture: ComponentFixture<SubgroupReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
