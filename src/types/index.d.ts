

export enum Role{
    CUSTOMER = "CUSTOMER",
    ADMIN  = "ADMIN"
}

interface JWT_PAYLOAD{
    userId: string,
    email: string
    role: Role
}