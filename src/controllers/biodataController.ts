import {NextFunction, Request, Response} from "express";
import Biodata from "../models/Biodata";
import BiodataType from "../types/interface/BiodataType";



export const getAllBiodata = async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const {email, password, username, avatar } = req.body

        const biodata = await Biodata.find<BiodataType>()

        // send response to client
        res.status(200).json(biodata)


    } catch (ex){
        next(ex)
    }

}

export const createBiodata = async (req: Request, res: Response, next: NextFunction) =>{

    try{



    } catch (ex){
        next(ex)
    }

}
