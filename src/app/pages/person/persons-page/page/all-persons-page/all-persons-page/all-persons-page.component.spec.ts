import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AllPersonsPageComponent} from './all-persons-page.component';

describe('AllPersonsPageComponent', () => {
  let component: AllPersonsPageComponent;
  let fixture: ComponentFixture<AllPersonsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllPersonsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPersonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
