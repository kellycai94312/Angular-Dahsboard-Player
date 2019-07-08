import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListHeadingComponent} from './list-heading.component';

describe('ListHeadingComponent', () => {
  let component: ListHeadingComponent;
  let fixture: ComponentFixture<ListHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListHeadingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
