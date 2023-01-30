import {ObjectId} from "mongodb";

interface BiodataType {
    _id?: string | ObjectId
    userId: string | ObjectId
    address: string
    gender: string
    maritalStatus: boolean
    createdAt: Date
    dateOfBrith: Date
    height: number
    occupation: string
    nationality: string
    divisions: string,
    districts: string,
    upazilas: string
}

export default BiodataType