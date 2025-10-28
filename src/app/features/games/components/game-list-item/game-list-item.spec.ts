import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GameListItemComponent } from './game-list-item';
import { Game } from '@models/game.model';

describe('GameListItemComponent', () => {
  let component: GameListItemComponent;
  let fixture: ComponentFixture<GameListItemComponent>;

  const mockGame: Game = {
    id: 1,
    title: 'Test Game',
    price: 29.99,
    discountPercent: 0,
    imageUrl: 'test.jpg',
    isOwned: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListItemComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListItemComponent);
    component = fixture.componentInstance;
    component.game = mockGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
