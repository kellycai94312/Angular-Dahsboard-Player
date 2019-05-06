import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxInputComponent} from './ngx-input.component';

describe('NgxInputComponent', () => {
  let component: NgxInputComponent;
  let fixture: ComponentFixture<NgxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
