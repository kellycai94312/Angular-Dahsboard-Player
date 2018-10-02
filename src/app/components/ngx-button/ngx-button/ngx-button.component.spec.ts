import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxButtonComponent} from './ngx-button.component';

describe('NgxButtonComponent', () => {
  let component: NgxButtonComponent<any>;
  let fixture: ComponentFixture<NgxButtonComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
