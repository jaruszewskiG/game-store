import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DiscountTagComponent } from '@shared/components/tags/discount-tag/discount-tag';
import { CartButtonComponent } from '@shared/components/buttons/cart-button/cart-button';
import { Game } from '@models/game.model';
import { CartStore } from '@stores/cart.store';
import { CartButtonStatus } from '@models/cart.model';

@Component({
  selector: 'app-game-list-item',
  imports: [DiscountTagComponent, CartButtonComponent],
  templateUrl: './game-list-item.html',
  styleUrl: './game-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListItemComponent {
  private readonly cartStore = inject(CartStore);

  @Input({ required: true }) game!: Game;

  getStatus(): CartButtonStatus {
    if (this.game.isOwned) {
      return CartButtonStatus.Owned;
    }
    if (this.cartStore.isInCart()(this.game.id)) {
      return CartButtonStatus.InCart;
    }
    return CartButtonStatus.Available;
  }

  addToCart() {
    if (this.game.isOwned || this.cartStore.isInCart()(this.game.id)) {
      return;
    }

    this.cartStore.addToCart(this.game.id);
  }

  getAriaLabel(): string {
    const status = this.getStatus();
    const discount = this.game.discountPercent ? `, ${this.game.discountPercent}% discount` : '';

    if (status === CartButtonStatus.Owned) {
      return `${this.game.title}, $${this.game.price}${discount}, already owned`;
    } else if (status === CartButtonStatus.InCart) {
      return `${this.game.title}, $${this.game.price}${discount}, in cart`;
    }
    return `${this.game.title}, $${this.game.price}${discount}`;
  }
}
