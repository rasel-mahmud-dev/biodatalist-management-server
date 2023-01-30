import {NextFunction, Request, Response} from "express";
import Biodata from "../models/Biodata";
import BiodataType from "../types/interface/BiodataType";
import {ObjectId} from "mongodb";



export const getAllBiodata = async (req: Request, res: Response, next: NextFunction) =>{

    try{

        const biodata = await Biodata.find<BiodataType>()

        // send response to client
        res.status(200).json(biodata)


    } catch (ex){
        next(ex)
    }

}

export const createBiodata = async (req: Request, res: Response, next: NextFunction) =>{

    try{
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
            upazilas,
        } = req.body


        let newBiodata = new Biodata({
            address,
            gender,
            maritalStatus,
            userId: new ObjectId(req.user._id),
            createdAt,
            dateOfBrith,
            height,
            occupation,
            nationality,
            divisions,
            districts,
            upazilas,
        })

       let response = await newBiodata.save()
        res.status(201).send(response)

    } catch (ex){
        next(ex)
    }

}
