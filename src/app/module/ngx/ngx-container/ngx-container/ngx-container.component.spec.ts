import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxContainerComponent} from './ngx-container.component';

describe('NgxContainerComponent', () => {
  let component: NgxContainerComponent;
  let fixture: ComponentFixture<NgxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
