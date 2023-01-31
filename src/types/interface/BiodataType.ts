import {ObjectId} from "mongodb";

interface BiodataType {
    _id?: string | ObjectId
    userId: string | ObjectId
    address: string
    gender: string
    maritalStatus: boolean
    dateOfBrith: Date
    height: number
    occupation: string
    nationality: string
    divisions: string,
    districts: string,
    upazilas: string
    biodataType: string,
    birthDay: string,
    bloodGroup: string,
    createdAt?: Date
}

export default BiodataType