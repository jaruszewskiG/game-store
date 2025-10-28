import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, GameBase } from '@app/models/game.model';
import { defer, forkJoin, map, Observable, shareReplay, switchMap, timer } from 'rxjs';

const GAMES_URL = 'assets/data/games.json';
const OWNED_URL = 'assets/data/owned.json';
const FEATURED_GAME_URL = 'assets/data/featured-game.json';
const SIMULATED_DELAY_MS = 500; // Simulate backend response time

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly http = inject(HttpClient);

  private readonly games$ = defer(() =>
    timer(SIMULATED_DELAY_MS).pipe(
      switchMap(() =>
        forkJoin([this.getGameBases(), this.getOwnedGameIds()]).pipe(
          map(([games, ownedGameIds]) => {
            return games.map((game) => ({
              ...game,
              isOwned: ownedGameIds.includes(game.id.toString()),
            }));
          }),
        ),
      ),
    ),
  );

  getGameById(id: number): Observable<Game | undefined> {
    return this.games$.pipe(map((games) => games.find((game) => game.id === id)));
  }

  // Keep for backward compatibility during migration
  getGames(): Observable<Game[]> {
    return this.games$;
  }

  getFeaturedGame(): Observable<{ id: number; title: string; imageUrl: string }> {
    return defer(() =>
      timer(SIMULATED_DELAY_MS).pipe(
        switchMap(() =>
          this.http
            .get<{ id: number; title: string; imageUrl: string }>(FEATURED_GAME_URL)
            .pipe(shareReplay(1)),
        ),
      ),
    );
  }

  private getGameBases(): Observable<GameBase[]> {
    return this.http.get<GameBase[]>(GAMES_URL).pipe(shareReplay(1));
  }

  private getOwnedGameIds(): Observable<string[]> {
    return this.http.get<string[]>(OWNED_URL).pipe(shareReplay(1));
  }
}
