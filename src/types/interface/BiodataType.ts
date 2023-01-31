import {ObjectId} from "mongodb";

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
    birthDay: string,
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
}

export default BiodataType