import { Component, inject } from '@angular/core';
import { GameListItem } from './game-list-item/game-list-item';
import { GamesService } from '@app/services/games.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [GameListItem, AsyncPipe],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameList {
  private readonly gamesService = inject(GamesService);

  games$ = this.gamesService.getGames();
}
