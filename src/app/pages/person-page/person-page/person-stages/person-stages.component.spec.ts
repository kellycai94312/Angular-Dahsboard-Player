import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonStagesComponent } from './person-stages.component';

describe('PersonStagesComponent', () => {
  let component: PersonStagesComponent;
  let fixture: ComponentFixture<PersonStagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonStagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
