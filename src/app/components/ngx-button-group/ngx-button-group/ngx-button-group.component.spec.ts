import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxButtonGroupComponent} from './ngx-button-group.component';

describe('NgxButtonGroupComponent', () => {
  let component: NgxButtonGroupComponent;
  let fixture: ComponentFixture<NgxButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxButtonGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
