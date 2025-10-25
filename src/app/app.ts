import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageComponent } from './views/home-page/home-page';
import { MenuComponent } from './components/menu/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MenuComponent, HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {}
