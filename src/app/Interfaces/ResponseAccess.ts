export interface ResponseAccess {
    id: string,
    name: string,
    firstName?: string,
    lastName?: string,
    email: number,
    state?: string,
    roles: string[],
    accessToken: string,
    tokenType: string,
    status: number
}