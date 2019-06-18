import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxContentComponent} from './ngx-content.component';

describe('NgxContentComponent', () => {
  let component: NgxContentComponent;
  let fixture: ComponentFixture<NgxContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
