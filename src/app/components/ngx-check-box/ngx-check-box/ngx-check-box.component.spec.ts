import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxCheckBoxComponent} from './ngx-check-box.component';

describe('NgxCheckBoxComponent', () => {
  let component: NgxCheckBoxComponent;
  let fixture: ComponentFixture<NgxCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxCheckBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
