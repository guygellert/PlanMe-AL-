
export interface UserData {
    id: number,
}

declare global {
    namespace Express {
      interface User extends UserData {}
    }
  }