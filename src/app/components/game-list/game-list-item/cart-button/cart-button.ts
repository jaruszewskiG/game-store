import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.scss',
})
export class CartButton {
  @Input() price!: number;
  @Input() state: 'AVAILABLE' | 'IN CART' | 'OWNED' = 'AVAILABLE';
}
