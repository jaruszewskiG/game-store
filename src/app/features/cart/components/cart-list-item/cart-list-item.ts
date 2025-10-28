import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GamesService } from '@services/games.service';
import { CartStore } from '@stores/cart.store';

/**
 * Cart item row component
 *
 * Displays game details within the cart dropdown.
 * Converts game ID to full game object using computed signals.
 *
 * @throws Error if gameId does not match any loaded game
 */
@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.html',
  styleUrl: './cart-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListItemComponent {
  private readonly gamesService = inject(GamesService);
  readonly cartStore = inject(CartStore);

  @Input({ required: true }) gameId!: number;

  // Convert games observable to signal for reactive access and provide an initial empty array
  private readonly games = toSignal(this.gamesService.getGames(), { initialValue: [] as any[] });

  /**
   * Computed game object from gameId
   * Returns undefined during initial load or if the game is not yet available
   */
  readonly game = computed(() => {
    const gamesArray = this.games();
    if (!gamesArray || gamesArray.length === 0) {
      return undefined;
    }
    return gamesArray.find((g) => g.id === this.gameId);
  });
}
