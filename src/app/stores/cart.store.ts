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

type CartState = {
  gameIds: number[];
  isDropdownOpen: boolean;
};

const initialState: CartState = {
  gameIds: [],
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
  withMethods((store) => ({
    addToCart(gameId: number) {
      patchState(store, (state) => ({ gameIds: [...state.gameIds, gameId] }));
    },
    removeFromCart(gameId: number) {
      patchState(store, (state) => ({
        gameIds: state.gameIds.filter((id) => id !== gameId),
      }));
    },
    clearCart() {
      patchState(store, () => ({
        gameIds: [],
      }));
    },
    toggleDropdown() {
      patchState(store, (state) => ({
        isDropdownOpen: !state.isDropdownOpen,
      }));
    },
  })),
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
