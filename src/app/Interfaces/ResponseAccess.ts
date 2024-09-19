export interface ResponseAccess {
    id: string,
    email: number,
    roles: string[],
    accessToken: string,
    tokenType: string,
    status: number
}