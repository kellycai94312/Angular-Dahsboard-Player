import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonNewsComponent} from './person-news.component';

describe('PersonNewsComponent', () => {
  let component: PersonNewsComponent;
  let fixture: ComponentFixture<PersonNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonNewsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
