import { Component } from '@angular/core';
import { Cart } from '@features/cart/cart';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [Cart],
})
export class MenuComponent {}
