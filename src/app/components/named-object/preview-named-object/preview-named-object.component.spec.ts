import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewNamedObjectComponent} from './preview-named-object.component';
import {NamedObject} from '../../../data/remote/base/named-object';

describe('PreviewNamedObjectComponent', () => {
  let component: PreviewNamedObjectComponent<NamedObject>;
  let fixture: ComponentFixture<PreviewNamedObjectComponent<NamedObject>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewNamedObjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewNamedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
