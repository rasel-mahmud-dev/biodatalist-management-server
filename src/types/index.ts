

export enum Role{
    CUSTOMER = "CUSTOMER",
    ADMIN  = "ADMIN"
}

export interface JWT_PAYLOAD{
    _id: string,
    email: string
    role: Role
}

