import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '@models/game.model';
import { GamesService } from '@services/games.service';
import { CartStore } from '@stores/cart.store';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.html',
  styleUrl: './cart-list-item.scss',
  imports: [CommonModule, AsyncPipe],
})
export class CartListItemComponent implements OnInit {
  private readonly gamesService = inject(GamesService);
  readonly cartStore = inject(CartStore);

  @Input() gameId!: number;

  game$: Observable<Game | undefined> = new Observable();

  ngOnInit(): void {
    this.game$ = this.gamesService.getGameById(this.gameId);
  }
}
