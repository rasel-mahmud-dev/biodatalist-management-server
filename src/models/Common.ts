import {databaseConnect} from "../services/mongodb";
import {Collection, Db, Document, Filter} from "mongodb";

class Common {

    static collectionName = ""
    collectionName = ""
    static database: Db

    constructor(collectionName: string) {
        Common.collectionName = collectionName
    }

    static getCollection(collectionName: string) {
        return new Promise<Collection>(async (resolve, reject) => {
            try {
                // for caching database connection
                if (Common.database) {
                    let collection = Common.database.collection(collectionName)
                    resolve(collection)
                } else {
                    let db = await databaseConnect()
                    Common.database = db
                    let collection = db.collection(collectionName)
                    resolve(collection)
                }
            } catch (ex) {
                reject(ex)
            }
        })
    }

    save<T>() {
        return new Promise<T>(async (resolve, reject) => {
            let {collectionName, ...other} = this
            // get access mongodb collection and insert data
            try {
                let collection = await Common.getCollection(Common.collectionName)
                let doc = await collection.insertOne(other)
                if(doc.insertedId){
                    resolve({
                        ...other,
                        _id: doc.insertedId
                    } as T)
                } else{
                    reject("Data creation fail")
                }

            } catch (ex) {
                reject(ex)
            }
        })
    }

    static find() {

    }

    static findOne<T>(filter: Filter<Document>) {
        return new Promise<T>(async (resolve, reject) => {
            let {collectionName} = this
            try {
                let collection = await Common.getCollection(collectionName)
                let doc = await collection.findOne(filter)
                resolve(doc as T)
            } catch (ex) {
                reject(ex as T)
            }
        })
    }
}

export default Common