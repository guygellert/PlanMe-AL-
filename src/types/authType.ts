import { UserType } from "./user"

export interface authObj {
    authState?: number,
    user?: UserType,
    login: () => Promise<void>,
    logout: () => Promise<void>
    accessToken?: String
}