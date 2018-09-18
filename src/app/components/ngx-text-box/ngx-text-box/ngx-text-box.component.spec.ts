import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxTextBoxComponent} from './ngx-text-box.component';

describe('NgxTextBoxComponent', () => {
  let component: NgxTextBoxComponent;
  let fixture: ComponentFixture<NgxTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxTextBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
