import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxEditableItemComponent} from './ngx-editable-item.component';

describe('NgxEditableItemComponent', () => {
  let component: NgxEditableItemComponent<any, any>;
  let fixture: ComponentFixture<NgxEditableItemComponent<any, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxEditableItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxEditableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
