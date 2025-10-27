import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { GamesService } from '@services/games.service';
import { CartStore } from '@stores/cart.store';

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

  // Convert to computed signal for better performance
  readonly game = computed(() => {
    const foundGame = this.gamesService.games().find((g) => g.id === this.gameId);
    if (!foundGame) {
      throw new Error(`Game with id ${this.gameId} not found`);
    }
    return foundGame;
  });
}
