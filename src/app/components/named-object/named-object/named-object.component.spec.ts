import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NamedObjectComponent} from './named-object.component';
import {NamedObject} from '../../../data/remote/base/named-object';

describe('NamedObjectComponent', () => {
  let component: NamedObjectComponent<NamedObject>;
  let fixture: ComponentFixture<NamedObjectComponent<NamedObject>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamedObjectComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
