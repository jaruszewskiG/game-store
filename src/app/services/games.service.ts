import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Game, GameBase } from '@app/models/game.model';
import { forkJoin, map, Observable, shareReplay } from 'rxjs';

const GAMES_URL = 'assets/data/games.json';
const OWNED_URL = 'assets/data/owned.json';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private readonly http = inject(HttpClient);

  private readonly games$ = forkJoin([this.getGameBases(), this.getOwnedGameIds()]).pipe(
    map(([games, ownedGameIds]) => {
      return games.map((game) => ({
        ...game,
        isOwned: ownedGameIds.includes(game.id.toString()),
      }));
    }),
    shareReplay(1),
  );

  // Convert to signal for better performance
  readonly games = toSignal(this.games$, { initialValue: [] });

  getGameById(id: number): Game | undefined {
    return this.games().find((game) => game.id === id);
  }

  // Keep for backward compatibility during migration
  getGames(): Observable<Game[]> {
    return this.games$;
  }

  private getGameBases(): Observable<GameBase[]> {
    return this.http.get<GameBase[]>(GAMES_URL).pipe(shareReplay(1));
  }

  private getOwnedGameIds(): Observable<string[]> {
    return this.http.get<string[]>(OWNED_URL).pipe(shareReplay(1));
  }
}
