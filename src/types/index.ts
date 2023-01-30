

export enum Role{
    CUSTOMER = "CUSTOMER",
    ADMIN  = "ADMIN"
}

export interface JWT_PAYLOAD{
    userId: string,
    email: string
    role: Role
}