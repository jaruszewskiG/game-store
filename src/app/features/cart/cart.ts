import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CtaButtonComponent } from '@shared/components/buttons/cta-button/cta-button';
import { CartStore } from '@stores/cart.store';
import { CartListComponent } from './components/cart-list/cart-list';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  imports: [CtaButtonComponent, CartListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  readonly cartStore = inject(CartStore);

  // Close dropdown on Escape key press
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.cartStore.isDropdownOpen()) {
      this.cartStore.closeDropdown();
      // Return focus to cart button
      const cartButton = document.querySelector('.cart__button') as HTMLButtonElement;
      cartButton?.focus();
    }
  }
}
