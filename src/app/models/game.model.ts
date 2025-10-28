/**
 * Base game information from catalog
 */
export interface GameBase {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  discountPercent?: number;
}

/**
 * Game with ownership status merged
 * Extended from GameBase with user-specific ownership data
 */
export interface Game extends GameBase {
  isOwned: boolean;
}
