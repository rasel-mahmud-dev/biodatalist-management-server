import BiodataType from "../types/interface/BiodataType";
import {ObjectId} from "mongodb";
import Common from "./Common";


class Biodata extends Common implements BiodataType{
    address: string;
    createdAt: Date;
    dateOfBrith: Date;
    districts: string;
    divisions: string;
    gender: string;
    height: number;
    maritalStatus: boolean;
    nationality: string;
    occupation: string;
    upazilas: string;
    userId: string | ObjectId;

    static collectionName = "biodata"

    constructor(data: BiodataType) {
        super(Biodata.collectionName);
        this.address = data.address
        this.createdAt = data.createdAt
        this.dateOfBrith = data.dateOfBrith
        this.districts = data.districts
        this.divisions = data.divisions
        this.gender = data.gender
        this.height = data.height
        this.maritalStatus = data.maritalStatus
        this.nationality = data.nationality
        this.occupation = data.occupation
        this.upazilas = data.upazilas
        this.userId = data.userId
        this.createdAt = new Date()
    }
}

export default Biodata