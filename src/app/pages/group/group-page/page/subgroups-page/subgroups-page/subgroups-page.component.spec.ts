import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupsPageComponent} from './subgroups-page.component';

describe('SubgroupsPageComponent', () => {
  let component: SubgroupsPageComponent;
  let fixture: ComponentFixture<SubgroupsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
