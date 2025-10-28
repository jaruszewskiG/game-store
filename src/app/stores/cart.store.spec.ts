import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { Game } from '@app/models/game.model';
import { CartService } from '@app/services/cart.service';
import { GamesService } from '@app/services/games.service';
import { CartStore } from './cart.store';

describe('CartStore', () => {
  let store: InstanceType<typeof CartStore>;
  let mockCartService: jest.Mocked<CartService>;
  let mockGamesService: jest.Mocked<GamesService>;

  const mockGames: Game[] = [
    { id: 1, title: 'Game 1', price: 29.99, imageUrl: 'img1.jpg', isOwned: false },
    { id: 2, title: 'Game 2', price: 39.99, imageUrl: 'img2.jpg', isOwned: false },
    {
      id: 3,
      title: 'Game 3',
      price: 19.99,
      imageUrl: 'img3.jpg',
      discountPercent: 10,
      isOwned: true,
    },
  ];

  beforeEach(() => {
    mockCartService = {
      getIds: jest.fn().mockReturnValue([]),
      setIds: jest.fn(),
    } as any;

    mockGamesService = {
      getGames: jest.fn().mockReturnValue(of(mockGames)),
      getGameById: jest.fn(),
      getFeaturedGame: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        CartStore,
        { provide: CartService, useValue: mockCartService },
        { provide: GamesService, useValue: mockGamesService },
      ],
    });

    store = TestBed.inject(CartStore);
  });

  describe('initialization', () => {
    it('should initialize with empty cart', () => {
      expect(store.gameIds()).toEqual([]);
      expect(store.isDropdownOpen()).toBe(false);
      expect(store.totalGames()).toBe(0);
    });

    it('should load existing cart items from CartService on init', () => {
      mockCartService.getIds.mockReturnValue([1, 2]);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          CartStore,
          { provide: CartService, useValue: mockCartService },
          { provide: GamesService, useValue: mockGamesService },
        ],
      });

      store = TestBed.inject(CartStore);

      expect(store.gameIds()).toEqual([1, 2]);
      expect(store.totalGames()).toBe(2);
    });
  });

  describe('addToCart', () => {
    it('should add a game to the cart', () => {
      store.addToCart(1);

      expect(store.gameIds()).toEqual([1]);
      expect(mockCartService.setIds).toHaveBeenCalledWith([1]);
    });

    it('should add multiple games to the cart', () => {
      store.addToCart(1);
      store.addToCart(2);
      store.addToCart(3);

      expect(store.gameIds()).toEqual([1, 2, 3]);
      expect(store.totalGames()).toBe(3);
    });

    it('should allow duplicate game IDs', () => {
      store.addToCart(1);
      store.addToCart(1);

      expect(store.gameIds()).toEqual([1, 1]);
      expect(store.totalGames()).toBe(2);
    });
  });

  describe('removeFromCart', () => {
    beforeEach(() => {
      mockCartService.getIds.mockReturnValue([1, 2, 3]);
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          CartStore,
          { provide: CartService, useValue: mockCartService },
          { provide: GamesService, useValue: mockGamesService },
        ],
      });
      store = TestBed.inject(CartStore);
    });

    it('should remove a game from the cart', () => {
      store.removeFromCart(2);

      expect(store.gameIds()).toEqual([1, 3]);
      expect(mockCartService.setIds).toHaveBeenCalledWith([1, 3]);
    });

    it('should remove all instances of a game ID', () => {
      store.addToCart(2);
      store.removeFromCart(2);

      expect(store.gameIds()).not.toContain(2);
    });

    it('should not error when removing non-existent game', () => {
      store.removeFromCart(999);

      expect(store.gameIds()).toEqual([1, 2, 3]);
    });
  });

  describe('clearCart', () => {
    beforeEach(() => {
      store.addToCart(1);
      store.addToCart(2);
    });

    it('should remove all games from cart', () => {
      store.clearCart();

      expect(store.gameIds()).toEqual([]);
      expect(store.totalGames()).toBe(0);
      expect(mockCartService.setIds).toHaveBeenCalledWith([]);
    });
  });

  describe('dropdown methods', () => {
    it('should open dropdown', () => {
      store.openDropdown();

      expect(store.isDropdownOpen()).toBe(true);
    });

    it('should close dropdown', () => {
      store.openDropdown();
      store.closeDropdown();

      expect(store.isDropdownOpen()).toBe(false);
    });

    it('should toggle dropdown', () => {
      expect(store.isDropdownOpen()).toBe(false);

      store.toggleDropdown();
      expect(store.isDropdownOpen()).toBe(true);

      store.toggleDropdown();
      expect(store.isDropdownOpen()).toBe(false);
    });
  });

  describe('isInCart computed', () => {
    beforeEach(() => {
      store.addToCart(1);
      store.addToCart(3);
    });

    it('should return true for games in cart', () => {
      expect(store.isInCart()(1)).toBe(true);
      expect(store.isInCart()(3)).toBe(true);
    });

    it('should return false for games not in cart', () => {
      expect(store.isInCart()(2)).toBe(false);
      expect(store.isInCart()(999)).toBe(false);
    });
  });

  describe('totalPrice computed', () => {
    it('should calculate total price correctly', () => {
      store.addToCart(1);
      store.addToCart(2);

      expect(store.totalPrice()).toBe(69.98);
    });

    it('should return 0 for empty cart', () => {
      expect(store.totalPrice()).toBe(0);
    });

    it('should handle games not found in games list', () => {
      store.addToCart(999);

      expect(store.totalPrice()).toBe(0);
    });

    it('should sum duplicate game prices', () => {
      store.addToCart(1);
      store.addToCart(1);

      expect(store.totalPrice()).toBe(59.98);
    });
  });

  describe('totalGames computed', () => {
    it('should return correct count', () => {
      expect(store.totalGames()).toBe(0);

      store.addToCart(1);
      expect(store.totalGames()).toBe(1);

      store.addToCart(2);
      expect(store.totalGames()).toBe(2);
    });

    it('should count duplicate IDs separately', () => {
      store.addToCart(1);
      store.addToCart(1);

      expect(store.totalGames()).toBe(2);
    });
  });
});
