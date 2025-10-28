import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartStore } from '@stores/cart.store';
import { CartListItemComponent } from '@features/cart/components/cart-list-item/cart-list-item';

/**
 * Cart items list container
 * Renders all items in the shopping cart
 */
@Component({
  selector: 'app-cart-list',
  imports: [CartListItemComponent],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  readonly cartStore = inject(CartStore);
}
