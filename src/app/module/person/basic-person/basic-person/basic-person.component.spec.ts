import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicPersonComponent} from './basic-person.component';

describe('BasicPersonComponent', () => {
  let component: BasicPersonComponent;
  let fixture: ComponentFixture<BasicPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicPersonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
