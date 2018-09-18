import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxImageComponent} from './ngx-image.component';

describe('NgxImageComponent', () => {
  let component: NgxImageComponent;
  let fixture: ComponentFixture<NgxImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
