import {NextFunction, Request, Response} from "express";
import Biodata from "../models/Biodata";
import BiodataType, {Address} from "../types/interface/BiodataType";
import {ObjectId} from "mongodb";


export const getCurrentUserBiodata = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const biodata = await Biodata.findOne<BiodataType>({userId: new ObjectId(req.authUser._id)})
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
            biodataType,
            birthDay,
            bloodGroup,
            gender,
            maritalStatus,
            height,
            nationality,
            occupation,
            permanentAddress,
            presentAddress,
            phone,
            fatherName,
            isFatherAlive,
            educationMethod,
        } = req.body


        // if not exist biodata then create new one
        let biodata: {
            biodataType?: string
            birthDay?: string
            bloodGroup?: string
            gender?: string
            maritalStatus?: string
            height?: string
            occupation?: string
            nationality?: string
            permanentAddress?: Address,
            presentAddress?: Address,
            userId: ObjectId,
            createdAt?: Date
            phone?: string,
            fatherName?: string,
            isFatherAlive?: string,
            educationMethod?: string,
        } = {
            userId: new ObjectId(req.authUser._id),
        }

        // all value set before checking because multistep form fields will be sent
        if (biodataType) biodata.biodataType = biodataType
        if (birthDay) biodata.birthDay = birthDay
        if (bloodGroup) biodata.bloodGroup = bloodGroup
        if (phone) biodata.phone = phone
        if (fatherName) biodata.fatherName = fatherName
        if (isFatherAlive) biodata.isFatherAlive = isFatherAlive
        if (educationMethod) biodata.educationMethod = educationMethod
        if (gender) biodata.gender = gender
        if (maritalStatus) biodata.maritalStatus = maritalStatus
        if (height) biodata.height = height
        if (occupation) biodata.occupation = occupation
        if (nationality) biodata.nationality = nationality
        if (permanentAddress) biodata.permanentAddress = permanentAddress
        if (presentAddress) biodata.presentAddress = presentAddress

        // if new bio data then insert current date time
        const userBiodata = await Biodata.findOne({userId: new ObjectId(req.authUser._id)})
        if (!userBiodata) {
            biodata.createdAt = new Date()
        }

        // update or insert bio data
        let doc = await Biodata.findAndUpdate({userId: new ObjectId(req.authUser._id)}, {
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
            biodataNo,
            address,
            gender,
            maritalStatus,
            createdAt,
            height,
            occupation,
            nationality,
        } = req.body

        type FilterDataType = {
            maritalStatus?: string
            occupation?: string
            _id?: string | ObjectId
        }

        let filter: FilterDataType = {

        }

        if (maritalStatus) {
            filter.maritalStatus = maritalStatus
        }
        if (occupation) {
            filter.occupation = occupation
        }


        if(biodataNo){
            filter._id = new ObjectId(biodataNo)
        }

        const biodata = await Biodata.aggregate<BiodataType>([
            {$match: filter},
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: {path: "$user"} }
        ])

        // send response to client
        res.status(200).json(biodata)

    } catch (ex) {
        next(ex)
    }
}
