import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupPageComponent } from './new-group-page.component';

describe('NewGroupPageComponent', () => {
  let component: NewGroupPageComponent;
  let fixture: ComponentFixture<NewGroupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGroupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
