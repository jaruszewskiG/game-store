import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { CartButtonStatus } from '@models/cart.model';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent {
  @Input() price!: number;
  @Input() status: CartButtonStatus = CartButtonStatus.Available;

  clicked = output<void>();

  // Expose enum to template
  readonly CartButtonStatus = CartButtonStatus;
}
