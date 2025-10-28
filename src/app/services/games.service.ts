import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game, GameBase } from '@app/models/game.model';
import {
  catchError,
  defer,
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  timer,
} from 'rxjs';

const GAMES_URL = 'assets/data/games.json';
const OWNED_URL = 'assets/data/owned.json';
const FEATURED_GAME_URL = 'assets/data/featured-game.json';
const SIMULATED_DELAY_MS = 500; // Simulate backend response time
const ERROR_CHANCE_GAMES = 0.2; // 20% chance of error when fetching games
const ERROR_CHANCE_OWNED = 0.05; // 5% chance of error when fetching owned games

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly http = inject(HttpClient);

  private readonly games$ = defer(() =>
    timer(SIMULATED_DELAY_MS).pipe(
      switchMap(() => {
        // Simulate random error based on probability
        if (Math.random() < ERROR_CHANCE_GAMES) {
          throw new Error('Simulated network error for games');
        }
        return forkJoin([this.getGameBases(), this.getOwnedGameIds()]).pipe(
          map(([games, ownedGameIds]) => {
            return games.map((game) => ({
              ...game,
              isOwned: ownedGameIds.includes(game.id.toString()),
            }));
          }),
        );
      }),
      catchError((error) => {
        console.error('Error loading games:', error);
        return of([]); // Return empty array on error
      }),
    ),
  );

  getGameById(id: number): Observable<Game | undefined> {
    return this.games$.pipe(map((games) => games.find((game) => game.id === id)));
  }

  // Keep for backward compatibility during migration
  getGames(): Observable<Game[]> {
    return this.games$;
  }

  getFeaturedGame(): Observable<GameBase | null> {
    return defer(() =>
      timer(SIMULATED_DELAY_MS).pipe(
        switchMap(() =>
          this.http.get<GameBase>(FEATURED_GAME_URL).pipe(
            shareReplay(1),
            catchError((error) => {
              console.error('Error loading featured game:', error);
              return of(null); // Return null on error
            }),
          ),
        ),
      ),
    );
  }

  private getGameBases(): Observable<GameBase[]> {
    return this.http.get<GameBase[]>(GAMES_URL).pipe(shareReplay(1));
  }

  private getOwnedGameIds(): Observable<string[]> {
    // Simulate random error based on probability
    if (Math.random() < ERROR_CHANCE_OWNED) {
      throw new Error('Simulated network error for owned games');
    }
    return this.http.get<string[]>(OWNED_URL).pipe(shareReplay(1));
  }
}
