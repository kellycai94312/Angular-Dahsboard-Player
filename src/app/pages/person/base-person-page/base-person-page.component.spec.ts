import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasePersonPageComponent} from './base-person-page.component';

describe('BasePersonPageComponent', () => {
  let component: BasePersonPageComponent;
  let fixture: ComponentFixture<BasePersonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasePersonPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
