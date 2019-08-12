import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SubgroupGroupReceiptComponent} from './subgroup-group-receipt.component';

describe('SubgroupGroupReceiptComponent', () => {
  let component: SubgroupGroupReceiptComponent;
  let fixture: ComponentFixture<SubgroupGroupReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupGroupReceiptComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupGroupReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
