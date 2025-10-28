import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GamesService } from './games.service';
import { GameBase, Game } from '@app/models/game.model';

describe('GamesService', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;

  const mockGameBases: GameBase[] = [
    { id: 1, title: 'Game 1', price: 29.99, imageUrl: 'img1.jpg' },
    { id: 2, title: 'Game 2', price: 39.99, imageUrl: 'img2.jpg', discountPercent: 10 },
    { id: 3, title: 'Game 3', price: 19.99, imageUrl: 'img3.jpg' },
  ];

  const mockOwnedIds: string[] = ['2', '3'];

  const mockFeaturedGame: GameBase = {
    id: 0,
    title: 'Featured Game',
    price: 49.99,
    imageUrl: 'featured.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GamesService],
    });

    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getFeaturedGame', () => {
    it('should fetch featured game successfully', (done) => {
      service.getFeaturedGame().subscribe((game) => {
        expect(game).toEqual(mockFeaturedGame);
        done();
      });

      setTimeout(() => {
        const req = httpMock.expectOne('assets/data/featured-game.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockFeaturedGame);
      }, 600);
    });

    it('should return null on error', (done) => {
      service.getFeaturedGame().subscribe((game) => {
        expect(game).toBeNull();
        done();
      });

      setTimeout(() => {
        const req = httpMock.expectOne('assets/data/featured-game.json');
        req.error(new ProgressEvent('error'));
      }, 600);
    });
  });

  describe('error simulation with owned games', () => {
    it('should handle owned games fetch error', async () => {
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.25).mockReturnValueOnce(0.01);

      const gamesPromise = new Promise<Game[]>((resolve) => {
        service.getGames().subscribe((games) => {
          resolve(games);
        });
      });

      httpMock.expectNone('assets/data/games.json');
      httpMock.expectNone('assets/data/owned.json');

      const games = await gamesPromise;
      expect(games).toEqual([]);

      jest.restoreAllMocks();
    });
  });
});
