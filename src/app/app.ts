import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { HomeComponent } from '@views/home/home';
import { MenuComponent } from '@features/layout/menu/menu';
import { CartStore } from '@stores/cart.store';

/**
 * Root application component
 * Main app shell with navigation menu and home page content
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MenuComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  readonly cartStore = inject(CartStore);
}
