import { Role } from "./Role";

export interface User {
    id: number,
    email: string,
    name: string,
    firstName: string,
    lastName: string,
    password?: string,
    repeatPassword?: string,
    roles?: Role[],
}