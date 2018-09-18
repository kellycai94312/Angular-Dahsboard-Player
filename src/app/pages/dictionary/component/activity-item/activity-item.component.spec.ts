import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityItemComponent} from './activity-item.component';

describe('ActivityItemComponent', () => {
  let component: ActivityItemComponent<any>;
  let fixture: ComponentFixture<ActivityItemComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
