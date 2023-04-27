import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

async function connectMongodb() {
    try {
        await mongoClient.connect();
        console.log('mongodb connected');
    } catch (err) {
        console.log(err.message);
    }
}

export const db = mongoClient.db();

export default connectMongodb;
