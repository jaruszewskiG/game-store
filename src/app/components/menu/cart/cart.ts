import { Component, inject } from '@angular/core';

import { CtaButton } from '@app/components/cta-button/cta-button';
import { CartStore } from '@app/stores/cart.store';
import { CartList } from './cart-list/cart-list';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  imports: [CtaButton, CartList],
})
export class Cart {
  readonly cartStore = inject(CartStore);
}
