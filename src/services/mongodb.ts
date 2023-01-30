import * as mongoDB from "mongodb";
import {Db, MongoClient} from "mongodb";
require("dotenv").config()


const mongoClient = new MongoClient(process.env.DB_CONN_STRING as string);


const clientPromise = mongoClient.connect();
let database: Db;
let DB_NAME = "biodata_management_db"

export async function databaseConnect() {
    return new Promise<mongoDB.Db>((async (resolve, reject) => {
        try {
            if (!database) {
                database = (await clientPromise).db(DB_NAME);
            }
            resolve(database)
        } catch (ex) {
            reject(ex)
        }
    }))
}
