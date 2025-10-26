import { Injectable } from '@angular/core';
import { Game } from '@app/models/game.model';

import { forkJoin, map, Observable, of } from 'rxjs';

const GAME_THUMBNAILS_PREFIX = '/assets/game-thumbnails';

const GAMES: Game[] = [
  {
    id: 1,
    title: `ODDWORLD: STRANGER'S WRATH`,
    price: 9.99,
    discountPercent: 50,
    imageUrl: `${GAME_THUMBNAILS_PREFIX}/oddworld.png`,
  },
  {
    id: 2,
    title: `CHAOS ON DEPONIA`,
    price: 6.99,
    imageUrl: `${GAME_THUMBNAILS_PREFIX}/deponia.png`,
  },
  {
    id: 3,
    title: `THE SETTLERS 2: GOLD EDITION`,
    price: 5.99,
    imageUrl: `${GAME_THUMBNAILS_PREFIX}/settlers2.png`,
  },
  {
    id: 4,
    title: `NEVERWINTER NIGHTS`,
    price: 9.99,
    discountPercent: 50,
    imageUrl: `${GAME_THUMBNAILS_PREFIX}/nwn.png`,
  },
  {
    id: 5,
    title: `ASSASSIN'S CREED: DIRECTOR'S CUT`,
    price: 9.99,
    imageUrl: `${GAME_THUMBNAILS_PREFIX}/assassinscreed.png`,
  },
];

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  getGameById(id: number): Observable<Game | undefined> {
    return this.getGames().pipe(map((games) => games.find((game) => game.id === id)));
  }

  getGames(): Observable<Game[]> {
    return forkJoin([of(GAMES), this.getOwnedGameIds()]).pipe(
      map(([games, ownedGameIds]) => {
        return games.map((game) => ({
          ...game,
          isOwned: ownedGameIds.includes(game.id.toString()),
        }));
      }),
    );
  }

  private getOwnedGameIds(): Observable<string[]> {
    return of(['2']);
  }
}
