import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameListItemComponent } from '@features/games/components/game-list-item/game-list-item';
import { GamesService } from '@services/games.service';

/**
 * Game catalog list component
 *
 * Displays all available games in a grid layout.
 * Shows skeleton loaders during initial fetch.
 */
@Component({
  selector: 'app-game-list',
  imports: [GameListItemComponent],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {
  private readonly gamesService = inject(GamesService);

  readonly games = toSignal(this.gamesService.getGames());
}
