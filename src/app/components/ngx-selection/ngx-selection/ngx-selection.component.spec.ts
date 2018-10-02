import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxSelectionComponent} from './ngx-selection.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';

describe('NgxSelectionComponent', () => {
  let component: NgxSelectionComponent<any, PageQuery, any>;
  let fixture: ComponentFixture<NgxSelectionComponent<any, PageQuery, any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
