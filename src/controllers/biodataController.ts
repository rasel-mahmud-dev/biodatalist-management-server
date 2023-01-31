import {NextFunction, Request, Response} from "express";
import Biodata from "../models/Biodata";
import BiodataType from "../types/interface/BiodataType";
import {ObjectId} from "mongodb";


export const getCurrentUserBiodata = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const biodata = await Biodata.findOne<BiodataType>({userId: new ObjectId(req.user._id)})
        // send response to client
        res.status(200).json(biodata)

    } catch (ex) {
        next(ex)
    }

}


export const getAllBiodata = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const biodata = await Biodata.find<BiodataType>()

        // send response to client
        res.status(200).json(biodata)


    } catch (ex) {
        next(ex)
    }

}

export const udpateBiodata = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {
            address,
            gender,
            dateOfBrith,
            occupation,
            divisions,
            districts,
            upazilas,
            biodataType,
            birthDay,
            bloodGroup,
            height,
            maritalStatus,
            nationality,
        } = req.body


        // if not exist biodata then create new one
        let biodata: BiodataType = {
            biodataType,
            birthDay,
            bloodGroup,
            address,
            gender,
            maritalStatus,
            userId: new ObjectId(req.user._id),
            dateOfBrith,
            height,
            occupation,
            nationality,
            divisions,
            districts,
            upazilas,
        }

        // if new bio data then insert current date time
        const userBiodata = await Biodata.findOne({userId: new ObjectId(req.user._id)})
        if (!userBiodata) {
            biodata.createdAt = new Date()
        }

        // update or insert bio data
        let doc = await Biodata.findAndUpdate({userId: new ObjectId(req.user._id)}, {
            $set: biodata,
        }, {upsert: true})

        if (doc.ok) {
            res.status(201).json({message: "bio data updated"})
        }


    } catch (ex) {
        next(ex)
    }

}


export const filterBiodata = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {
            address,
            gender,
            maritalStatus,
            createdAt,
            dateOfBrith,
            height,
            occupation,
            nationality,
            divisions,
            districts,
            upazilas
        } = req.body

        type FilterDataType = {
            maritalStatus?: string
        }

        let filter: FilterDataType = {
            maritalStatus: ""
        }

        if (maritalStatus) {
            filter.maritalStatus = maritalStatus
        }


        const biodata = await Biodata.aggregate<BiodataType>([
            {$match: filter}
        ])

        // send response to client
        res.status(200).json(biodata)

    } catch (ex) {
        next(ex)
    }
}
