import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupPersonListComponent} from './subgroup-person-list.component';

describe('SubgroupPersonListComponent', () => {
  let component: SubgroupPersonListComponent;
  let fixture: ComponentFixture<SubgroupPersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupPersonListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
