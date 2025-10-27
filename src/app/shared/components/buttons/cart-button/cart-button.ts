import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent {
  @Input() price!: number;
  @Input() status: 'AVAILABLE' | 'IN CART' | 'OWNED' = 'AVAILABLE';

  clicked = output<void>();
}
