import { Injectable } from '@angular/core';

const CART_STORAGE_KEY = 'cart.gameIds';

export function getInitialCartIds(): number[] {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) return [];
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((v) => Number(v)).filter((v) => Number.isFinite(v));
    }
    return [];
  } catch {
    return [];
  }
}

function persistCartIds(ids: number[]) {
  try {
    if (typeof window === 'undefined' || !('localStorage' in window)) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore persistence errors
  }
}

@Injectable({ providedIn: 'root' })
export class CartService {
  getIds(): number[] {
    return getInitialCartIds();
  }

  setIds(ids: number[]): void {
    persistCartIds(ids);
  }
}
