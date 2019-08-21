import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuPersonDetailComponent} from './menu-person-detail.component';

describe('MenuPersonDetailComponent', () => {
  let component: MenuPersonDetailComponent<any>;
  let fixture: ComponentFixture<MenuPersonDetailComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPersonDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPersonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
