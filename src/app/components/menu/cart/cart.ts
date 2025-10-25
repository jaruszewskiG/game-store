import { Component } from '@angular/core';
import { CtaButton } from '@app/components/cta-button/cta-button';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  imports: [CtaButton],
})
export class Cart {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onClearCart() {
    console.log('Clear cart clicked');
  }
}
