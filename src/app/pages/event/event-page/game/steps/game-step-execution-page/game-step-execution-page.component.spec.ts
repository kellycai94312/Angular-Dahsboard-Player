import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStepExecutionPageComponent } from './game-step-execution-page.component';

describe('GameStepExecutionPageComponent', () => {
  let component: GameStepExecutionPageComponent;
  let fixture: ComponentFixture<GameStepExecutionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStepExecutionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStepExecutionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
