import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AllGroupsPageComponent} from './all-groups-page.component';

describe('AllGroupsPageComponent', () => {
  let component: AllGroupsPageComponent;
  let fixture: ComponentFixture<AllGroupsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllGroupsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
