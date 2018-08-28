import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxGridComponent} from './ngx-grid.component';

describe('NgxGridComponent', () => {
  let component: NgxGridComponent;
  let fixture: ComponentFixture<NgxGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
