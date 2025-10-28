import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-featured-game',
  imports: [],
  templateUrl: './featured-game.html',
  styleUrl: './featured-game.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedGameComponent {
  onSecretButtonClick(): void {
    alert('I have totally implemented the secret button ;)');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.alt = 'Featured game image failed to load';
  }
}
