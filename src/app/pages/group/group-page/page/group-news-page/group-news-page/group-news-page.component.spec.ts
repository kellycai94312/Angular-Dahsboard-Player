import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupNewsPageComponent} from './group-news-page.component';

describe('GroupNewsPageComponent', () => {
  let component: GroupNewsPageComponent;
  let fixture: ComponentFixture<GroupNewsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupNewsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
