export {};

declare global {
  namespace Express {
    export interface Request {
      auth?: {
        isAuth: boolean;
        username?: string;
        userId?: number;
      };
    }
  }
}
