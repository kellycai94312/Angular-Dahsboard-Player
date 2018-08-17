import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGroupConnectionComponent } from './table-group-connection.component';

describe('TableGroupConnectionComponent', () => {
  let component: TableGroupConnectionComponent;
  let fixture: ComponentFixture<TableGroupConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGroupConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGroupConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
