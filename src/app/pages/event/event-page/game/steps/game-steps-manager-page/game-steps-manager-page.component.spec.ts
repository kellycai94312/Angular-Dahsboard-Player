import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStepsManagerPageComponent } from './game-steps-manager-page.component';

describe('GameStepsManagerPageComponent', () => {
  let component: GameStepsManagerPageComponent;
  let fixture: ComponentFixture<GameStepsManagerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStepsManagerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStepsManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
