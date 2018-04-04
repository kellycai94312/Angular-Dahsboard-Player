import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStepBasePageComponent } from './game-step-base-page.component';

describe('GameStepBasePageComponent', () => {
  let component: GameStepBasePageComponent;
  let fixture: ComponentFixture<GameStepBasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStepBasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStepBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
