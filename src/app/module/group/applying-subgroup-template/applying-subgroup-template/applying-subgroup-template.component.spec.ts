import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApplyingSubgroupTemplateComponent} from './applying-subgroup-template.component';

describe('ApplyingSubgroupTemplateComponent', () => {
  let component: ApplyingSubgroupTemplateComponent;
  let fixture: ComponentFixture<ApplyingSubgroupTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyingSubgroupTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyingSubgroupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
