import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MyPersonsPageComponent} from './my-persons-page.component';

describe('MyPersonsPageComponent', () => {
  let component: MyPersonsPageComponent;
  let fixture: ComponentFixture<MyPersonsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyPersonsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPersonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
