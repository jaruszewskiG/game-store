import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { HomePageComponent } from './views/home-page/home-page';
import { MenuComponent } from './components/menu/menu';
import { CartStore } from './stores/cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MenuComponent, HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  readonly cartStore = inject(CartStore);
}
