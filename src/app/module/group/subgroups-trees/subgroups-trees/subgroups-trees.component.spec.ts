import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupsTreesComponent} from './subgroups-trees.component';

describe('SubgroupsTreesComponent', () => {
  let component: SubgroupsTreesComponent;
  let fixture: ComponentFixture<SubgroupsTreesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupsTreesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupsTreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
