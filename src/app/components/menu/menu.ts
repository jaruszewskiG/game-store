import { Component, EventEmitter, Output } from '@angular/core';
import { Cart } from './cart/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [Cart],
})
export class MenuComponent {
  @Output() cartDropdownStateChange = new EventEmitter<boolean>();

  onCartDropdownStateChange(isOpen: boolean) {
    this.cartDropdownStateChange.emit(isOpen);
  }
}
