import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Game } from '@app/models/game.model';
import { GamesService } from '@services/games.service';
import { GameListComponent } from './game-list';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gamesService: GamesService;
  let httpMock: HttpTestingController;

  const mockGames: Game[] = [
    { id: 1, title: 'Game 1', price: 29.99, imageUrl: 'img1.jpg', isOwned: false },
    {
      id: 2,
      title: 'Game 2',
      price: 39.99,
      imageUrl: 'img2.jpg',
      isOwned: true,
      discountPercent: 10,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    gamesService = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show skeleton loading state initially', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const skeleton = compiled.querySelectorAll('.game-list-item--skeleton');

    expect(skeleton.length).toBeGreaterThan(0);
  });

  it('should have proper ARIA attributes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section');

    expect(section?.getAttribute('role')).toBe('list');
    expect(section?.getAttribute('aria-label')).toBe('Available games');
  });
});
