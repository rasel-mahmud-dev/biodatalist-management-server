import {ObjectId} from "mongodb"

function isObjectId(id: string): boolean{
    return !!(id && id.length === 24 && ObjectId.isValid(id));
}

export default isObjectId