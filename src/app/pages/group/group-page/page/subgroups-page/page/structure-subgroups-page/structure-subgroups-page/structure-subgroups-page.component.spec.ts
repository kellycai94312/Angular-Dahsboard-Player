import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StructureSubgroupsPageComponent} from './structure-subgroups-page.component';

describe('StructureSubgroupsPageComponent', () => {
  let component: StructureSubgroupsPageComponent;
  let fixture: ComponentFixture<StructureSubgroupsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StructureSubgroupsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureSubgroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
