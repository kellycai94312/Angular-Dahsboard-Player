import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegionComponent } from './my-region.component';

describe('MyRegionComponent', () => {
  let component: MyRegionComponent;
  let fixture: ComponentFixture<MyRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
