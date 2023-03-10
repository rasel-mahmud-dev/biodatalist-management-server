import {NextFunction, Request, Response} from "express";
import Biodata from "../models/Biodata";
import BiodataType, {Address} from "../interfaces/BiodataType";
import {ObjectId} from "mongodb";
import isObjectId from "../utils/isObjectId";
import User from "../models/User";
import errorNext from "../middlewares/errorNext";


export const getCurrentUserBiodata = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const biodata = await Biodata.findOne<BiodataType>({userId: new ObjectId(req.authUser._id)})
        // send response to client
        res.status(200).json(biodata)

    } catch (ex) {
        next(ex)
    }

}


export const getBiodataDetail = async (req: Request, res: Response, next: NextFunction) => {

    const {biodataId} = req.params

    if (!isObjectId(biodataId)) {
        return errorNext(next, "Please provide valid biodata id", 409)
    }

    try {
        const biodata = await Biodata.aggregate<BiodataType[]>([
                {
                    $match: {_id: new ObjectId(biodataId)}
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {$unwind: {path: "$user"}},
            ]
        )

        if (biodata && biodata.length > 0) {
            if (biodata[0].user) {
                biodata[0].user.password = ""
            }
            // send response to client
            res.status(200).json(biodata[0])
        } else {
            return errorNext(next, "Data not found", 404)
        }

    } catch (ex) {
        next(ex)
    }
}


// get all biodata for admin user
export const getAllBiodata = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const biodata = await Biodata.aggregate<BiodataType>([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {$unwind: {path: "$user"}},
            {
                $project: {
                    biodataType: 1,
                    occupation: 1,
                    division: 1,
                    birthDay: 1,
                    user: {
                        username: 1,
                        avatar: 1
                    }
                }
            }
        ])
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
            isCompleted = false,
            isFatherAlive,
            educationMethod,
        } = req.body


        // if not exist biodata then create new one
        let biodata: {
            biodataType?: string
            birthDay?: string | Date
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
            isCompleted?: boolean,
        } = {
            userId: new ObjectId(req.authUser._id),
            isCompleted,
        }

        // all value set before checking because multistep form fields will be sent
        if (biodataType) biodata.biodataType = biodataType
        if (birthDay) biodata.birthDay = new Date(birthDay)
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
            sort = {field: "createdAt", order: -1},
            biodataNo,
            biodataType,
            presentAddress,
            permanentAddress,
            maritalStatus,
            pageNumber = 1,
            perPage = 10,
            ageRange = undefined
        } = req.body

        type FilterDataType = {
            _id?: string | ObjectId
            maritalStatus?: string
            occupation?: string
            presentAddress?: Address,
            biodataType?: string,
            permanentAddress?: Address,
            birthDay?: {
                $lte: Date,
                $gte: Date
            },
            "permanentAddress.country"?: string
            "permanentAddress.division"?: string
            "permanentAddress.district"?: string
            "permanentAddress.upazila"?: string

            "presentAddress.country"?: string
            "presentAddress.division"?: string
            "presentAddress.district"?: string
            "presentAddress.upazila"?: string
        }

        let filter: FilterDataType = {}

        if (maritalStatus) {
            filter.maritalStatus = maritalStatus
        }

        if (biodataType) {
            filter.biodataType = biodataType
        }

        //  age range
        if(ageRange && Array.isArray(ageRange) && ageRange.length  === 2){
            let now = new Date()
            let startDate = new Date((now.getFullYear() - ageRange[0]).toString())
            let endDate = new Date((now.getFullYear() - ageRange[1]).toString())

            filter.birthDay  = {$lte: startDate, $gte: endDate}
        }

        if (presentAddress) {
            if (presentAddress.country) {
                filter["permanentAddress.country"] = presentAddress.country
            }
            if (presentAddress.division && presentAddress.division !== "All division") {
                filter["permanentAddress.division"] = presentAddress.division
            }
            if (presentAddress.district && presentAddress.district !== "All district") {
                filter["permanentAddress.district"] = presentAddress.district
            }
            if (presentAddress.upazila && presentAddress.upazila !== "All upazila")  {
                filter["permanentAddress.upazila"] = presentAddress.upazila
            }
        }


        if (permanentAddress) {
            if (permanentAddress.country) {
                filter["permanentAddress.country"] = permanentAddress.country
            }
            if (permanentAddress.division && permanentAddress.division !== "All division"){
                filter["permanentAddress.division"] = permanentAddress.division
            }
            if (permanentAddress.district && permanentAddress.district !== "All district"){
                filter["permanentAddress.district"] = permanentAddress.district
            }
            if (permanentAddress.upazila && permanentAddress.upazila !== "All upazila")  {
                filter["permanentAddress.upazila"] = permanentAddress.upazila
            }
        }

        // search biodata via no
        if (biodataNo) {
            if (isObjectId(biodataNo)) {
                filter._id = new ObjectId(biodataNo)
            } else {
                // not valid object id, so return empty data
                return res.status(200).json([])
            }
        }

        let matchPipe = {
            $match: filter
        }

        let sortStage = {}
        if (sort && sort.field) {
            sortStage = {$sort: {[sort.field]: sort.order}}
        }


        let totalItem: { count: number }[] = []
        if (pageNumber == 1) {
            totalItem = await Biodata.aggregate([
                matchPipe,
                {$count: "count"}
            ])
        }


        const biodata = await Biodata.aggregate<BiodataType>([
            matchPipe,
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {$unwind: {path: "$user"}},
            sortStage,
            {
                $project: {
                    biodataType: 1,
                    occupation: 1,
                    division: 1,
                    birthDay: 1,
                    user: {
                        username: 1,
                        avatar: 1
                    }
                }
            },
            {$skip: (Number(pageNumber) - 1) * Number(perPage)},
            {$limit: Number(perPage)},
            sortStage
        ])

        // send response to client
        res.status(200).json({
            biodata,
            count: totalItem && totalItem[0] && totalItem[0].count
        })

    } catch (ex) {
        next(ex)
    }
}


// application stats
export const getBiodataStats = async (req: Request, res: Response, next: NextFunction) => {
    try {

        let result: {
            maleBiodata?: number,
            femaleBiodata?: number,
            maleAndfemaleBiodata?: number,
            totalUser?: number,
        } = {
            maleBiodata: 0,
            femaleBiodata: 0,
            maleAndfemaleBiodata: 0,
            totalUser: 0,
        }

        // count female biodata
        let data = await Biodata.aggregate<{ count: number }[]>([
                {$match: {biodataType: "female-biodata"}},
                {
                    $group: {
                        _id: 0,
                        count: {$sum: 1}
                    }
                }
            ]
        )

        if (data && data.length > 0 && data[0].count) {
            result.femaleBiodata = data[0].count
        }

        // count male biodata
        data = await Biodata.aggregate<{ count: number }[]>([
                {$match: {biodataType: "male-biodata"}},
                {
                    $group: {
                        _id: 0,
                        count: {$sum: 1}
                    }
                }
            ]
        )

        if (data && data.length > 0 && data[0].count) {
            result.maleBiodata = data[0].count
        }

        // count all users
        data = await User.aggregate<{ count: number }[]>([
                {
                    $group: {
                        _id: 0,
                        count: {$sum: 1}
                    }
                }
            ]
        )

        if (data && data.length > 0 && data[0].count) {
            result.totalUser = data[0].count
        }

        if (result.femaleBiodata && result.maleBiodata) {
            result.maleAndfemaleBiodata = result.femaleBiodata + result.maleBiodata
        }

        res.status(200).json(result)


    } catch (ex) {
        next(ex)
    }
}
