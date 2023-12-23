export {};

declare global {
  export interface IGDB_GameCard {
    id: number;
    cover: {
      id: number;
      image_id: string;
    };
    name: string;
  }
}
