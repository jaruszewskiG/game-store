import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.scss',
})
export class CartButton {
  @Input() price!: number;
  @Input() state: 'NOT IN CART' | 'IN CART' | 'OWNED' = 'NOT IN CART';
}
