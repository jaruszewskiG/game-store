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

// Simulation constants for development/demo purposes
const SIMULATED_DELAY_MS = 500;
const ERROR_CHANCE_GAMES = 0.2; // 20% probability for testing error handling
const ERROR_CHANCE_OWNED = 0.05; // 5% probability for testing error handling

/**
 * Service for fetching and managing game data
 *
 * Features:
 * - Fetches game catalog from JSON files
 * - Merges game data with user's owned games
 * - Includes simulated delays and error scenarios for development
 * - Uses RxJS shareReplay for efficient data caching
 *
 * @note Error simulation is intentional for testing resilient UI behavior
 */
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly http = inject(HttpClient);

  /**
   * Primary games observable with ownership data merged
   * Uses defer() to create a new subscription for each subscriber
   * Includes simulated delay and error scenarios
   */
  private readonly games$ = defer(() =>
    timer(SIMULATED_DELAY_MS).pipe(
      switchMap(() => {
        // Simulate random network error for testing error handling
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
        return of([]);
      }),
    ),
  );

  getGameById(id: number): Observable<Game | undefined> {
    return this.games$.pipe(map((games) => games.find((game) => game.id === id)));
  }

  getGames(): Observable<Game[]> {
    return this.games$;
  }

  /**
   * Fetches the featured game from a dedicated endpoint
   * Returns null on error to allow graceful degradation in UI
   */
  getFeaturedGame(): Observable<GameBase | null> {
    return defer(() =>
      timer(SIMULATED_DELAY_MS).pipe(
        switchMap(() =>
          this.http.get<GameBase>(FEATURED_GAME_URL).pipe(
            catchError((error) => {
              console.error('Error loading featured game:', error);
              return of(null);
            }),
            shareReplay(1),
          ),
        ),
      ),
    );
  }

  private getGameBases(): Observable<GameBase[]> {
    return this.http.get<GameBase[]>(GAMES_URL).pipe(shareReplay(1));
  }

  /**
   * Fetches list of game IDs the user owns
   * Includes random error simulation for testing
   */
  private getOwnedGameIds(): Observable<string[]> {
    if (Math.random() < ERROR_CHANCE_OWNED) {
      throw new Error('Simulated network error for owned games');
    }
    return this.http.get<string[]>(OWNED_URL).pipe(shareReplay(1));
  }
}
