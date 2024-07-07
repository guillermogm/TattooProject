export interface TokenDecoded {
    id: number,
    roleId: number
  }
  declare global {
      namespace Express {
          export interface Request {
              tokenData: TokenDecoded;
          }
      }
  }