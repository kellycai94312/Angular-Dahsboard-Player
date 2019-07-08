import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseLibraryItemComponent} from './base-library-item.component';

describe('BaseLibraryItemComponent', () => {
  let component: BaseLibraryItemComponent<any>;
  let fixture: ComponentFixture<BaseLibraryItemComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseLibraryItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLibraryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
