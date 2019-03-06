import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditSubgroupTemplateComponent} from './edit-subgroup-template.component';

describe('EditSubgroupTemplateComponent', () => {
  let component: EditSubgroupTemplateComponent;
  let fixture: ComponentFixture<EditSubgroupTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubgroupTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubgroupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
