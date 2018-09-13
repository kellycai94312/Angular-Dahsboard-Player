import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewNamedObjectComponent} from './preview-named-object.component';

describe('PreviewNamedObjectComponent', () => {
  let component: PreviewNamedObjectComponent;
  let fixture: ComponentFixture<PreviewNamedObjectComponent>;

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
