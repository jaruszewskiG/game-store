import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Game } from '@app/models/game.model';
import { GamesService } from '@app/services/games.service';
import { CartService, getInitialCartIds } from '../services/cart.service';

type CartState = {
  gameIds: number[];
  isDropdownOpen: boolean;
};

const initialState: CartState = {
  gameIds: getInitialCartIds(),
  isDropdownOpen: false,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => {
    const gamesService = inject(GamesService);
    const gamesSignal = toSignal(gamesService.getGames(), { initialValue: [] as Game[] });
    return { gamesService, gamesSignal } as const;
  }),
  withMethods((store) => {
    const cartService = inject(CartService) as CartService;
    return {
      addToCart(gameId: number) {
        patchState(store, (state) => ({ gameIds: [...state.gameIds, gameId] }));
        cartService.setIds(store.gameIds());
      },
      removeFromCart(gameId: number) {
        patchState(store, (state) => ({
          gameIds: state.gameIds.filter((id) => id !== gameId),
        }));
        cartService.setIds(store.gameIds());
      },
      clearCart() {
        patchState(store, () => ({
          gameIds: [],
        }));
        cartService.setIds([]);
      },
      toggleDropdown() {
        patchState(store, (state) => ({
          isDropdownOpen: !state.isDropdownOpen,
        }));
      },
    };
  }),
  withComputed((store) => ({
    isInCart: () => (id: number) => store.gameIds().includes(id),
    totalGames: () => store.gameIds().length,
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
