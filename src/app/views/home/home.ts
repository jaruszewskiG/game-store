import { Component } from '@angular/core';
import { FeaturedGame } from './components/featured-game/featured-game';
import { GameList } from '@features/games/components/game-list/game-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [FeaturedGame, GameList],
})
export class HomeComponent {}
