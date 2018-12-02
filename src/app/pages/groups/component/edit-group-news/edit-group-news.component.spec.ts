import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditGroupNewsComponent} from './edit-group-news.component';

describe('EditGroupNewsComponent', () => {
  let component: EditGroupNewsComponent;
  let fixture: ComponentFixture<EditGroupNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupNewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
