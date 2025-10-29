import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GameListItem } from './game-list-item';

describe('GameListItem', () => {
  let component: GameListItem;
  let fixture: ComponentFixture<GameListItem>;

  const mockGame = {
    id: 1,
    title: 'Test Game',
    price: 9.99,
    imageUrl: 'test.jpg',
    isOwned: false,
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListItem],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListItem);
    component = fixture.componentInstance;
    component.game = mockGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
