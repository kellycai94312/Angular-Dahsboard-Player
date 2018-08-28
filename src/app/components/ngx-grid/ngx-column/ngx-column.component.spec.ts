import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxColumnComponent} from './ngx-column.component';

describe('NgxColumnComponent', () => {
  let component: NgxColumnComponent;
  let fixture: ComponentFixture<NgxColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxColumnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
