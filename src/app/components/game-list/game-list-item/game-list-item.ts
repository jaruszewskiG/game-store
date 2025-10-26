import { Component, inject, Input } from '@angular/core';

import { DiscountTag } from './discount-tag/discount-tag';
import { CartButton } from './cart-button/cart-button';
import { Game } from '@app/models/game.model';
import { CartStore } from '@app/stores/cart.store';

@Component({
  selector: 'app-game-list-item',
  imports: [DiscountTag, CartButton],
  templateUrl: './game-list-item.html',
  styleUrl: './game-list-item.scss',
})
export class GameListItem {
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
