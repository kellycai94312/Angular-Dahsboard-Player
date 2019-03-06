import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TemplatesSubgroupsPageComponent} from './templates-subgroups-page.component';

describe('TemplatesSubgroupsPageComponent', () => {
  let component: TemplatesSubgroupsPageComponent;
  let fixture: ComponentFixture<TemplatesSubgroupsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplatesSubgroupsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesSubgroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
