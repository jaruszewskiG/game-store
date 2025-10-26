import { Component, inject } from '@angular/core';

import { CartStore } from '@app/stores/cart.store';
import { CartListItem } from './cart-list-item/cart-list-item';

@Component({
  selector: 'app-cart-list',
  imports: [CartListItem],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.scss',
})
export class CartList {
  readonly cartStore = inject(CartStore);
}
