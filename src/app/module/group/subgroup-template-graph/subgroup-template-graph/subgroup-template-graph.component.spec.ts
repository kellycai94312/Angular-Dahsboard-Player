import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupTemplateGraphComponent} from './subgroup-template-graph.component';

describe('SubgroupTemplateGraphComponent', () => {
  let component: SubgroupTemplateGraphComponent;
  let fixture: ComponentFixture<SubgroupTemplateGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupTemplateGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupTemplateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
