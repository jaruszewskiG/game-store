import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameListItemComponent } from '@features/games/components/game-list-item/game-list-item';
import { GamesService } from '@services/games.service';

@Component({
  selector: 'app-game-list',
  imports: [GameListItemComponent],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {
  private readonly gamesService = inject(GamesService);

  readonly games = this.gamesService.games;
}
