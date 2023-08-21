import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.mongoUrl;

export default async (dbName) => {
    const dbClient = new MongoClient(mongoUrl);
    await dbClient.connect();
    const prodDB = dbClient.db(dbName);

    return { dbClient, prodDB };
}