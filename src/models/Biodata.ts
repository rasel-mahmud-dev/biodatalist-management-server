import BiodataType, {Address} from "../types/interface/BiodataType";
import {ObjectId} from "mongodb";
import Common from "./Common";


class Biodata extends Common implements BiodataType{
    _id?: string | ObjectId
    userId: string | ObjectId;
    biodataType: string
    birthDay: string
    bloodGroup: string
    createdAt: Date
    gender: string
    maritalStatus: string
    height: string
    nationality: string
    occupation: string
    presentAddress: Address
    permanentAddress: Address

    static collectionName = "biodata"

    constructor(data: BiodataType) {
        super(Biodata.collectionName);
        this.biodataType = data.biodataType
        this.birthDay = data.birthDay
        this.presentAddress = data.presentAddress
        this.permanentAddress = data.permanentAddress
        this.gender = data.gender
        this.height = data.height
        this.maritalStatus = data.maritalStatus
        this.nationality = data.nationality
        this.occupation = data.occupation
        this.bloodGroup = data.bloodGroup
        this.userId = data.userId
        this.createdAt = new Date()
    }
}

export default Biodata