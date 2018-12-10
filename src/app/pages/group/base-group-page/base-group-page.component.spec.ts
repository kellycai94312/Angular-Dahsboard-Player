import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseGroupPageComponent} from './base-group-page.component';

describe('BaseGroupPageComponent', () => {
  let component: BaseGroupPageComponent;
  let fixture: ComponentFixture<BaseGroupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseGroupPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
