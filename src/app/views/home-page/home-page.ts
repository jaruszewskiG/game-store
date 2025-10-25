import { Component } from '@angular/core';
import { FeaturedGame } from './components/featured-game/featured-game';
import { GameList } from '@app/components/game-list/game-list';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  imports: [FeaturedGame, GameList],
})
export class HomePageComponent {}
