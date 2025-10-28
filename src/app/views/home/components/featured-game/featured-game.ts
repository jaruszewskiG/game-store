import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GamesService } from '@services/games.service';

@Component({
  selector: 'app-featured-game',
  templateUrl: './featured-game.html',
  styleUrl: './featured-game.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedGameComponent {
  private readonly gamesService = inject(GamesService);

  // Get featured game from separate endpoint
  readonly featuredGame = toSignal(this.gamesService.getFeaturedGame());

  onSecretButtonClick(): void {
    alert('I have totally implemented the secret button ;)');
  }
}
