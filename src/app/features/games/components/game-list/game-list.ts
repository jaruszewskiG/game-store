import { Component, inject } from '@angular/core';
import { GameListItemComponent } from '@features/games/components/game-list-item/game-list-item';
import { GamesService } from '@services/games.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-game-list',
  imports: [GameListItemComponent, AsyncPipe],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
})
export class GameListComponent {
  private readonly gamesService = inject(GamesService);

  games$ = this.gamesService.getGames();
}
