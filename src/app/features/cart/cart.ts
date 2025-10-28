import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CtaButtonComponent } from '@shared/components/buttons/cta-button/cta-button';
import { CartStore } from '@stores/cart.store';
import { CartListComponent } from './components/cart-list/cart-list';

/**
 * Shopping cart dropdown component
 *
 * Features:
 * - Toggleable dropdown display
 * - Keyboard navigation (Escape to close)
 * - Total items and price display
 * - Accessible with ARIA labels
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  imports: [CtaButtonComponent, CartListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartStore = inject(CartStore);

  /** Closes dropdown on Escape key and returns focus to trigger button */
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.cartStore.isDropdownOpen()) {
      this.cartStore.closeDropdown();
      const cartButton = document.querySelector('.cart__button') as HTMLButtonElement;
      cartButton?.focus();
    }
  }

  /** Generates descriptive cart summary for screen readers */
  getAriaLabel(): string {
    const count = this.cartStore.totalGames();
    const price = this.cartStore.totalPrice();
    return `Shopping cart with ${count} ${count === 1 ? 'item' : 'items'}, total $${price.toFixed(2)}`;
  }
}
