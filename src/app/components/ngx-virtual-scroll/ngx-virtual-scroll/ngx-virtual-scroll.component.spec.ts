import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxVirtualScrollComponent} from './ngx-virtual-scroll.component';

describe('NgxVirtualScrollComponent', () => {
  let component: NgxVirtualScrollComponent;
  let fixture: ComponentFixture<NgxVirtualScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxVirtualScrollComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
