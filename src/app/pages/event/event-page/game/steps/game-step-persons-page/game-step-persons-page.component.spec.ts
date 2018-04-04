import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStepPersonsPageComponent } from './game-step-persons-page.component';

describe('GameStepPersonsPageComponent', () => {
  let component: GameStepPersonsPageComponent;
  let fixture: ComponentFixture<GameStepPersonsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStepPersonsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStepPersonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
