import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditSubgroupGroupComponent} from './edit-subgroup-group.component';

describe('EditSubgroupGroupComponent', () => {
  let component: EditSubgroupGroupComponent;
  let fixture: ComponentFixture<EditSubgroupGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubgroupGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubgroupGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
