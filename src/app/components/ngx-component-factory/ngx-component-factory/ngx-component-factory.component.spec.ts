import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxComponentFactoryComponent} from './ngx-component-factory.component';

describe('NgxComponentFactoryComponent', () => {
  let component: NgxComponentFactoryComponent<any>;
  let fixture: ComponentFixture<NgxComponentFactoryComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxComponentFactoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxComponentFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
