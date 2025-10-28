import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeaturedGameComponent } from './components/featured-game/featured-game';
import { GameListComponent } from '@features/games/components/game-list/game-list';
import { GamesService } from '@services/games.service';

/**
 * Home page component
 * Main landing page displaying featured game banner and game catalog
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [FeaturedGameComponent, GameListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly gamesService = inject(GamesService);

  readonly featuredGame = toSignal(this.gamesService.getFeaturedGame());
}
