import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { CartButtonStatus } from '@models/cart.model';

/**
 * Add-to-cart button with status indicators
 *
 * Displays different states: available (shows price), in cart, or owned.
 * Includes accessibility labels and event output for parent handling.
 */
@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.html',
  styleUrl: './cart-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartButtonComponent {
  @Input({ required: true }) price!: number;
  @Input() status: CartButtonStatus = CartButtonStatus.Available;
  @Input() gameTitle: string = '';

  clicked = output<void>();

  /** Expose enum to template for status comparisons */
  readonly CartButtonStatus = CartButtonStatus;

  getAriaLabel(): string {
    if (this.status === CartButtonStatus.Available) {
      return `Add ${this.gameTitle} to cart for $${this.price}`;
    } else if (this.status === CartButtonStatus.InCart) {
      return `${this.gameTitle} is in cart, $${this.price}`;
    }
    return `${this.gameTitle} is already owned, $${this.price}`;
  }

  getStatusText(): string {
    return this.status === CartButtonStatus.Available ? `$${this.price}` : this.status;
  }
}
