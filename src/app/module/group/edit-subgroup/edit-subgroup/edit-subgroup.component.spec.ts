import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditSubgroupComponent} from './edit-subgroup.component';

describe('EditSubgroupComponent', () => {
  let component: EditSubgroupComponent;
  let fixture: ComponentFixture<EditSubgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubgroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
