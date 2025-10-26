import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
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
export class App implements OnInit {
  private readonly cartStore = inject(CartStore);

  ngOnInit() {
    setInterval(() => console.log(this.cartStore.gameIds()), 1000);
  }
}
