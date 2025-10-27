import { Component, inject } from '@angular/core';
import { CartStore } from '@stores/cart.store';
import { CartListItemComponent } from '@features/cart/components/cart-list-item/cart-list-item';

@Component({
  selector: 'app-cart-list',
  imports: [CartListItemComponent],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartListComponent {
  readonly cartStore = inject(CartStore);
}
