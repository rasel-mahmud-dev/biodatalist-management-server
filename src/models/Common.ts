import {databaseConnect} from "../services/mongodb";
import {
    Collection,
    Db,
    Document,
    Filter,
    FindOneAndUpdateOptions, FindOptions,
    ModifyResult,
    UpdateFilter,
    UpdateOptions
} from "mongodb";

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

    static find<T>(filter?: Filter<Document>, options?: FindOptions) {
        return new Promise<T>(async (resolve, reject) => {
            let {collectionName} = this
            try {
                let collection = await Common.getCollection(collectionName)
                let doc = await collection.find(filter ? filter: {}, options).toArray()
                resolve(doc as T)
            } catch (ex) {
                reject(ex as T)
            }
        })
    }

    static insert<T>(document: Document) {
        return new Promise<T>(async (resolve, reject) => {
            let {collectionName} = this
            try {
                let collection = await Common.getCollection(collectionName)
                let doc = await collection.insertOne(document)
                resolve(doc as T)
            } catch (ex) {
                reject(ex as T)
            }
        })
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

    static findAndUpdate(filter: Filter<Document>, update: UpdateFilter<Document>, options: FindOneAndUpdateOptions) {
        return new Promise<ModifyResult>(async (resolve, reject) => {
            let {collectionName} = this
            try {
                let collection = await Common.getCollection(collectionName)
                let doc = await collection.findOneAndUpdate(filter, update, options)
                resolve(doc )
            } catch (ex) {
                reject(ex)
            }
        })
    }

    static aggregate<T>(pipeline: Document[]) {
        return new Promise<T>(async (resolve, reject) => {
            let {collectionName} = this
            try {
                let collection = await Common.getCollection(collectionName)
                let doc = await collection.aggregate(pipeline).toArray()
                resolve(doc as T)
            } catch (ex) {
                reject(ex as T)
            }
        })
    }
}

export default Common