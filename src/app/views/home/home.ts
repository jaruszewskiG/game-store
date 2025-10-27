import { Component } from '@angular/core';
import { FeaturedGameComponent } from './components/featured-game/featured-game';
import { GameListComponent } from '@features/games/components/game-list/game-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [FeaturedGameComponent, GameListComponent],
})
export class HomeComponent {}
