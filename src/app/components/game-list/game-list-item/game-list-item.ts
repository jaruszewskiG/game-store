import { Component, Input } from '@angular/core';

import { DiscountTag } from './discount-tag/discount-tag';
import { CartButton } from './cart-button/cart-button';
import { Game } from '@app/models/game.model';

@Component({
  selector: 'app-game-list-item',
  imports: [DiscountTag, CartButton],
  templateUrl: './game-list-item.html',
  styleUrl: './game-list-item.scss',
})
export class GameListItem {
  @Input() game!: Game;
}
