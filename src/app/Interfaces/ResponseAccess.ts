export interface ResponseAccess {
    id: string,
    username: string,
    email: number,
    roles: string[],
    accessToken: string,
    tokenType: string,
    status: number
}