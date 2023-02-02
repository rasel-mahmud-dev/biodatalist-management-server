import {ObjectId} from "mongodb";
import UserType from "./UserType";

export interface Address {
    division: string,
    district: string,
    upazila: string,
    country: string
}

interface BiodataType {
    _id?: string | ObjectId
    userId: string | ObjectId
    biodataType: string,
    birthDay: string | Date,
    bloodGroup: string,
    createdAt?: Date
    gender: string,
    maritalStatus: string,
    height: string,
    nationality: string,
    occupation: string,
    phone?: string
    fatherName?: string
    isFatherAlive?: string
    educationMethod?: string
    presentAddress: Address,
    permanentAddress: Address
    isCompleted?: boolean

    // populated field
    user?: UserType
}

export default BiodataType