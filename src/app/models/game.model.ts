export interface GameBase {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  discountPercent?: number;
}

export interface Game extends GameBase {
  isOwned?: boolean;
}
