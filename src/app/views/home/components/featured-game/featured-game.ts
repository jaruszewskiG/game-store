import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-game',
  imports: [],
  templateUrl: './featured-game.html',
  styleUrl: './featured-game.scss',
})
export class FeaturedGameComponent {
  onSecretButtonClick(): void {
    alert('I have totally implemented the secret button ;)');
  }
}
