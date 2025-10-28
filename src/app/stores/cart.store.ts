import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { Game } from '@app/models/game.model';
import { CartService } from '@app/services/cart.service';
import { GamesService } from '@app/services/games.service';

/**
 * Cart state shape
 * - gameIds: Array of game IDs currently in the cart
 * - isDropdownOpen: Controls cart dropdown visibility
 */
type CartState = {
  gameIds: number[];
  isDropdownOpen: boolean;
};

const initialState: CartState = {
  gameIds: [],
  isDropdownOpen: false,
};

/**
 * Global cart store using @ngrx/signals
 *
 * Manages shopping cart state with persistent storage via CartService.
 * Provides reactive state management for cart operations and UI state.
 *
 * Features:
 * - Persists cart data to localStorage
 * - Syncs with games service to compute cart items
 * - Manages dropdown UI state
 * - Provides computed properties for cart totals and validations
 */
export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => {
    const cartService = inject(CartService);
    const gamesService = inject(GamesService);
    const gamesSignal = toSignal(gamesService.getGames(), { initialValue: [] as Game[] });
    return { cartService, gamesSignal } as const;
  }),
  withHooks((store) => {
    return {
      onInit() {
        // Hydrate cart state from localStorage on initialization
        patchState(store, () => ({ gameIds: store.cartService.getIds() }));
      },
    };
  }),
  withMethods((store) => {
    return {
      addToCart(gameId: number) {
        patchState(store, (state) => {
          const newIds = [...state.gameIds, gameId];
          store.cartService.setIds(newIds);
          return { gameIds: newIds };
        });
      },
      removeFromCart(gameId: number) {
        patchState(store, (state) => {
          const newIds = state.gameIds.filter((id) => id !== gameId);
          store.cartService.setIds(newIds);
          return { gameIds: newIds };
        });
      },
      clearCart() {
        patchState(store, () => ({
          gameIds: [],
        }));
        store.cartService.setIds([]);
      },
      openDropdown() {
        patchState(store, () => ({
          isDropdownOpen: true,
        }));
      },
      closeDropdown() {
        patchState(store, () => ({
          isDropdownOpen: false,
        }));
      },
      toggleDropdown() {
        patchState(store, (state) => ({
          isDropdownOpen: !state.isDropdownOpen,
        }));
      },
    };
  }),
  withComputed((store) => ({
    /** Returns a function to check if a game ID is in the cart */
    isInCart: () => (id: number) => store.gameIds().includes(id),

    /** Total number of games in cart */
    totalGames: () => store.gameIds().length,

    /**
     * Total cart value in dollars
     * Sums up prices of all games currently in cart
     */
    totalPrice: () => {
      const gameIds = store.gameIds();
      const games = store.gamesSignal();
      return gameIds.reduce((sum, id) => {
        const game = games.find((g) => g.id === id);
        return sum + (game?.price ?? 0);
      }, 0);
    },
  })),
);
