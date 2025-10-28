import { Injectable } from '@angular/core';

const CART_STORAGE_KEY = 'cart.gameIds';

/**
 * Service for cart data persistence
 *
 * Handles localStorage synchronization for cart game IDs.
 * Provides SSR-safe storage operations with fallback handling.
 *
 * @note All operations are safe in SSR environments (returns empty arrays when localStorage unavailable)
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private cartIds: number[] = this.getInitialCartIds();

  getIds(): number[] {
    return this.cartIds;
  }

  setIds(ids: number[]): void {
    this.cartIds = ids;
    this.persistCartIds(ids);
  }

  /**
   * Loads cart IDs from localStorage on initialization
   * Validates and sanitizes stored data
   */
  private getInitialCartIds(): number[] {
    try {
      if (typeof window === 'undefined' || !('localStorage' in window)) return [];
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Ensure all values are valid numbers
        return parsed.map((v) => Number(v)).filter((v) => Number.isFinite(v));
      }
      return [];
    } catch {
      return [];
    }
  }

  /**
   * Persists cart IDs to localStorage
   * Silently handles storage errors (quota exceeded, disabled storage, etc.)
   */
  private persistCartIds(ids: number[]) {
    try {
      if (typeof window === 'undefined' || !('localStorage' in window)) return;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Silently fail on storage errors (quota exceeded, privacy mode, etc.)
    }
  }
}
