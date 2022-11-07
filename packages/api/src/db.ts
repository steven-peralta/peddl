import { MongoClient } from 'mongodb';

const dbConnectionURI =
  process.env['MONGO_URI'] ?? 'mongodb://admin:mongo@localhost:27017';
const dbName = process.env['MONGO_DB'] ?? 'peddl';

export const mongoClient = new MongoClient(dbConnectionURI);

export const db = mongoClient.db(dbName);
