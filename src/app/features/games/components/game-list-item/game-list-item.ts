import { Component, inject, Input } from '@angular/core';
import { DiscountTagComponent } from '@shared/components/tags/discount-tag/discount-tag';
import { CartButtonComponent } from '@shared/components/buttons/cart-button/cart-button';
import { Game } from '@models/game.model';
import { CartStore } from '@stores/cart.store';

@Component({
  selector: 'app-game-list-item',
  imports: [DiscountTagComponent, CartButtonComponent],
  templateUrl: './game-list-item.html',
  styleUrl: './game-list-item.scss',
})
export class GameListItemComponent {
  private readonly cartStore = inject(CartStore);

  @Input() game!: Game;

  getStatus() {
    if (this.game.isOwned) {
      return 'OWNED';
    }
    if (this.cartStore.isInCart()(this.game.id)) {
      return 'IN CART';
    }
    return 'AVAILABLE';
  }

  addToCart() {
    if (this.game.isOwned || this.cartStore.isInCart()(this.game.id)) {
      return;
    }

    this.cartStore.addToCart(this.game.id);
  }
}
