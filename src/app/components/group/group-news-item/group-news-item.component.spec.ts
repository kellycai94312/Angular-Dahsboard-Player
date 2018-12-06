import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupNewsItemComponent} from './group-news-item.component';

describe('GroupNewsItemComponent', () => {
  let component: GroupNewsItemComponent;
  let fixture: ComponentFixture<GroupNewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupNewsItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNewsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
